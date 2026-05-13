import { useEffect, useMemo, useState } from "react";
import { useCustomerAuth } from "../auth/CustomerAuthContext";
import { customerApi, type CustomerDownloadItem } from "../services/customerApi";
import { Download } from "lucide-react";

export default function CustomerDownload() {
  const { profile } = useCustomerAuth();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [items, setItems] = useState<CustomerDownloadItem[]>([]);
  const [envByProduct, setEnvByProduct] = useState<Record<string, string>>({});

  async function loadDownloads() {
    setLoading(true);
    try {
      const d = await customerApi.downloads();
      setItems(Array.isArray(d.items) ? d.items : []);
      setErr("");
    } catch (e: any) {
      setErr(e?.message || "Failed to load downloads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await loadDownloads();
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Failed to load downloads");
      }
    })();
    const id = window.setInterval(() => {
      if (!document.hidden) void loadDownloads();
    }, 15000);
    const onFocus = () => void loadDownloads();
    window.addEventListener("focus", onFocus);
    return () => {
      cancelled = true;
      window.clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const customerType = String(profile?.customer?.customer_type || "").toLowerCase();
  const isFinalOnly = customerType === "final";
  const grouped = useMemo(() => {
    const out: Record<string, CustomerDownloadItem[]> = {};
    for (const it of items) {
      const key = `${it.product_id}`;
      if (!out[key]) out[key] = [];
      out[key].push(it);
    }
    return Object.entries(out).map(([productId, entries]) => {
      const base = entries[0];
      const envs = Array.from(new Set(entries.map((x) => x.entitlement.env)));
      return { productId, base, entries, envs };
    });
  }, [items]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-28">
      <h1 className="text-3xl font-bold mb-2">Downloads</h1>
      <div className="rounded-xl border border-white/10 bg-black/25 p-4 mb-6">
        <div className="font-semibold text-lg">{profile?.customer?.name || "Customer"}</div>
        <div className="text-sm text-fluke-muted mt-1">
          Customer ID: {profile?.customer?.customer_id || "-"} | Type: {profile?.customer?.customer_type || "-"} | Status: {profile?.customer?.status || "-"}
        </div>
        <div className="text-sm text-fluke-muted mt-1">
          Login: {profile?.user?.email || "-"} | Role: {profile?.user?.role || "-"}
        </div>
      </div>
      {loading ? <div className="text-fluke-muted">Loading releases...</div> : null}
      {err ? <div className="text-red-400">{err}</div> : null}
      {!loading && !err && (
        <div className="grid gap-3">
          {!items.length ? (
            <div className="rounded-xl border border-white/10 bg-black/25 p-4 text-fluke-muted">
              No entitled releases available.
            </div>
          ) : (
            grouped.map((g) => {
              const selectedEntry = g.entries[0];
              const scopeOptions = Array.from(
                new Set(
                  g.entries.flatMap((e) =>
                    Array.isArray(e.scopes) && e.scopes.length ? e.scopes : ["internal"]
                  )
                )
              );
              const hasInternalOrTestScope = scopeOptions.some(
                (scope) => scope === "internal" || scope === "test"
              );
              const selectedScope = envByProduct[g.productId] || scopeOptions[0] || "internal";
              const releases = selectedEntry?.releasesByScope?.[selectedScope] || [];
              return (
                <div key={g.productId} className="rounded-xl border border-white/10 bg-black/25 p-4">
                  <div className="font-semibold text-lg">{g.base.name}</div>
                  <div className="text-sm text-fluke-muted mt-1">
                    Project: {g.base.project_id} | Product: {g.base.product_id}
                  </div>
                  {hasInternalOrTestScope && !isFinalOnly ? (
                    <>
                      <div className="mt-3">
                        <label className="text-xs text-fluke-muted mr-2">Access Scope</label>
                        <select
                          value={selectedScope}
                          onChange={(e) => setEnvByProduct((prev) => ({ ...prev, [g.productId]: e.target.value }))}
                          className="rounded-lg border border-white/20 bg-black/30 px-2 py-1 text-sm"
                        >
                          {scopeOptions.map((scope) => (
                            <option key={scope} value={scope}>{scope}</option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
                        {releases.map((r, idx) => (
                          <div key={`${g.productId}-${selectedScope}-${r.version}-${idx}`} className="rounded-lg border border-white/10 bg-black/35 p-3 flex items-center justify-between gap-3">
                            <div>
                              <div className="text-sm"><b>{r.version}</b> ({r.release_status})</div>
                              <div className="text-xs text-fluke-muted">Platform: {r.platform || "all"}</div>
                            </div>
                            <button type="button" className="rounded-lg border border-white/20 p-2 hover:bg-white/10" title="Download">
                              <Download size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="mt-3 flex items-center gap-3">
                      <button type="button" className="rounded-lg border border-white/20 p-2 hover:bg-white/10" title="Download">
                        <Download size={16} />
                      </button>
                      <div className="text-sm text-fluke-muted">
                        {releases[0] ? `${releases[0].release_status} / ${releases[0].version} / ${releases[0].platform || "all"}` : "No release metadata"}
                      </div>
                    </div>
                  )}
                  <div className="text-sm text-fluke-muted mt-2">
                    Entitlement: {selectedEntry?.entitlement?.tier} / {selectedEntry?.entitlement?.status}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </section>
  );
}

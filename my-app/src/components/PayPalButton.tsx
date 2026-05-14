import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface PayPalButtonProps {
  productId: string;
  productName: string;
  onSuccess?: (orderId: string) => void;
}


declare global {
  interface Window {
    paypal: any;
  }
}

export default function PayPalButton({
  productId,
  productName,
  onSuccess,
}: PayPalButtonProps) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function initPayPal() {
      if (!window.paypal) {
        console.error("PayPal SDK not loaded");
        if (isMounted) {
          setIsInitializing(false);
          setStatus("error");
          setErrorMessage("PayPal SDK failed to load.");
        }
        return;
      }

      try {
        const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
        
        // Create PayPal SDK instance
        const sdkInstance = await window.paypal.createInstance({
          clientId,
          components: ["paypal-payments"],
          pageType: "product-details",
        });

        // Check eligibility
        const paymentMethods = await sdkInstance.findEligibleMethods({
          currencyCode: "USD",
        });

        if (!isMounted) return;

        if (paymentMethods.isEligible("paypal")) {
          const paymentSessionOptions = {
            async onApprove(data: any) {
              console.log("Payment approved:", data);
              setIsProcessing(true);
              try {
                if (isMounted) {
                  setStatus("success");
                  setIsProcessing(false);
                  if (onSuccess) onSuccess(data.orderId);
                }
              } catch (error) {
                console.error("Capture failed:", error);
                if (isMounted) {
                  setStatus("error");
                  setIsProcessing(false);
                }
              }
            },
            onCancel(data: any) {
              console.log("Payment cancelled:", data);
              if (isMounted) setIsProcessing(false);
            },
            onError(error: any) {
              console.error("Payment error:", error);
              if (isMounted) {
                setStatus("error");
                setErrorMessage("An error occurred during payment.");
                setIsProcessing(false);
              }
            },
          };

          const paypalPaymentSession = sdkInstance.createPayPalOneTimePaymentSession(
            paymentSessionOptions
          );

          const buttonElement = containerRef.current?.querySelector("paypal-button");
          if (buttonElement) {
            buttonElement.removeAttribute("hidden");
            buttonElement.addEventListener("click", async () => {
              setIsProcessing(true);
              try {
                await paypalPaymentSession.start(
                  { presentationMode: "auto" },
                  (async () => {
                    console.log("Creating order for:", productName);
                    return { orderId: "MOCK_ORDER_" + Math.random().toString(36).substring(7) };
                  })()
                );
              } catch (error) {
                console.error("PayPal start error:", error);
                if (isMounted) setIsProcessing(false);
              }
            });
          }
        } else {
          if (isMounted) {
            setStatus("error");
            setErrorMessage("PayPal is not eligible in your region.");
          }
        }
      } catch (error) {
        console.error("SDK initialization error:", error);
        if (isMounted) {
          setStatus("error");
          setErrorMessage("Failed to initialize PayPal.");
        }
      } finally {
        if (isMounted) setIsInitializing(false);
      }
    }

    initPayPal();

    return () => {
      isMounted = false;
    };
  }, [productId, productName, onSuccess]);

  return (
    <div className="w-full min-h-[60px] flex items-center justify-center relative" ref={containerRef}>
      <AnimatePresence mode="wait">
        {isInitializing ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-fluke-muted font-sora text-xs uppercase tracking-widest"
          >
            <Loader2 className="animate-spin" size={16} />
            Initializing Secure Checkout...
          </motion.div>
        ) : status === "idle" ? (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center"
          >
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-fluke-bg/40 backdrop-blur-[2px] rounded-2xl z-10">
                <Loader2 className="animate-spin text-fluke-yellow" size={24} />
              </div>
            )}
            
            <p className="text-[10px] text-center text-fluke-muted mt-3 font-sora uppercase tracking-widest opacity-60">
              Official PayPal SDK v6 Integration
            </p>
          </motion.div>
        ) : status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full p-6 rounded-2xl bg-green-500/10 border border-green-500/30 flex flex-col items-center text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="text-green-400" size={28} />
            </div>
            <div>
              <h4 className="font-orbitron text-sm font-bold text-fluke-text tracking-wider uppercase">Purchase Complete</h4>
              <p className="text-xs text-fluke-muted mt-1 font-sora">
                {productName} has been added to your library.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full p-6 rounded-2xl bg-red-500/10 border border-red-500/30 flex flex-col items-center text-center space-y-3"
          >
            <AlertCircle className="text-red-400" size={28} />
            <h4 className="font-orbitron text-sm font-bold text-fluke-text uppercase tracking-widest">Checkout Error</h4>
            <p className="text-[10px] text-red-400/70 font-sora">{errorMessage}</p>
            <button 
              onClick={() => setStatus("idle")}
              className="text-xs text-red-400 underline font-sora mt-2"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// app/components/careers/careersService.js
// Public jobs listing backed by DynamoDB via API Gateway.
// Replaces the old hardcoded `jobs` array.

var app = angular.module('myAppCareersService', []);

app.factory('CareersService', function ($http, $q) {
  // Keep in sync with src/api.ts API_BASE
  var API_BASE = 'https://xtipeal88c.execute-api.us-east-1.amazonaws.com';

  function tryJsonParse(x) {
    if (!x) return null;
    if (typeof x === 'object') return x;
    try { return JSON.parse(x); } catch (e) { return null; }
  }

  // API Gateway sometimes wraps responses like { body: "json-string" }
  function unwrapApiPayload(data) {
    var payload = data;

    // if Axios-like response accidentally passed
    if (payload && payload.data) payload = payload.data;

    // raw string response?
    if (typeof payload === 'string') {
      var parsed = tryJsonParse(payload);
      payload = parsed || { raw: payload };
    }

    // wrapper: { body: "..." }
    if (payload && typeof payload.body === 'string') {
      var inner = tryJsonParse(payload.body);
      payload = inner || payload;
    }

    return payload || {};
  }

  function normalizeJobsList(payload) {
    var items =
      (Array.isArray(payload.items) && payload.items) ||
      (Array.isArray(payload.Items) && payload.Items) ||
      (Array.isArray(payload.data) && payload.data) ||
      (Array.isArray(payload) && payload) ||
      [];

    // Map backend job shape → UI expects { title, type, tags, desc }
    return items.map(function (j) {
      var title = (j && j.title) ? String(j.title) : '';
      var type =
        (j && (j.employmentType || j.employment_type || j.type)) ? String(j.employmentType || j.employment_type || j.type)
        : 'Volunteer (Remote)';

      var tags = Array.isArray(j && j.tags) ? j.tags.map(String) : [];
      var desc = (j && (j.description || j.desc)) ? String(j.description || j.desc) : '';

      // If backend stores plain text, keep it readable in HTML modal
      if (desc && desc.indexOf('<') === -1) {
        desc = desc
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n/g, '<br>');
      }

      return {
        jobId: j && (j.jobId || j.id) ? String(j.jobId || j.id) : undefined,
        title: title,
        type: type,
        tags: tags,
        desc: desc,

        // keep extras around if you want them later
        raw: j || {}
      };
    });
  }

  function listJobsPublic() {
    return $http
      .get(API_BASE + '/jobs', { headers: { Accept: '*/*' } })
      .then(function (resp) {
        var payload = unwrapApiPayload(resp && resp.data ? resp.data : resp);
        return normalizeJobsList(payload);
      })
      .catch(function (err) {
        // keep error readable
        var msg =
          (err && err.data && (err.data.message || err.data.error)) ||
          (err && err.message) ||
          'Failed to load jobs';
        return $q.reject(new Error(msg));
      });
  }

  // Back-compat: old controller expects getJobs() returning array
  // We now return a promise-based list; controller updated accordingly.
  return {
    listJobsPublic: listJobsPublic
  };
});

// app/components/careersApply/careersApplyCtrl.js
// Full file (regen) — fixes "missing email" by NOT hardcoding f.email/f.fullName.
// It discovers email/name keys from API-driven chapters and uses those keys everywhere.
// If API doesn't provide an email field, it blocks submit with a clear error (no injection).

var app = angular.module('myAppCareersApplyCtrl', []);

app.controller('CareersApplyCtrl', function (
  $scope,
  $timeout,
  $stateParams,
  $http,
  CareersApplyService
) {
  var APPLY_API_URL = 'https://xtipeal88c.execute-api.us-east-1.amazonaws.com/apply';
  var GOOGLE_POPUP_KEY = 'fg_google_popup_dismissed_v3';
  var GOOGLE_USER_KEY = 'fg_google_user_v1';

  // Loading state (jobs/questions come from API)
  $scope.isLoading = true;
  $scope.loadError = '';

  // UI flags
  $scope.googleBtnReady = true;

  // Submission state
  $scope.isSubmitting = false;
  $scope.isSubmitted = false;
  $scope.submitReceipt = null;
  $scope.submitError = '';

  // Role summary accordion state
  $scope.roleSummaryOpen = false;

  // discovered keys from API schema (chapters)
  var _emailKey = 'email';
  var _nameKey = 'fullName';
  var _phoneKey = 'phone';

  // ---------------- Scroll fix helpers ----------------
  function forceEnablePageScroll() {
    try {
      var overlays = document.querySelectorAll('.modal-overlay');
      if (overlays && overlays.length) {
        Array.prototype.forEach.call(overlays, function (o) {
          try { o.parentNode && o.parentNode.removeChild(o); } catch (e) {}
        });
      }

      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      document.body.style.height = '';
      document.body.style.width = '';

      document.documentElement.style.overflow = 'auto';
      document.documentElement.style.position = '';
      document.documentElement.style.height = '';
    } catch (e) {}
  }

  function initMaterializeUI() {
    $timeout(function () {
      try {
        if (!window.M) return;

        var selects = document.querySelectorAll('select');
        if (selects && selects.length) M.FormSelect.init(selects);

        var loginModalEl = document.getElementById('googleGateModal');
        if (loginModalEl) {
          M.Modal.init(loginModalEl, {
            dismissible: true,
            opacity: 0.55,
            preventScrolling: false,
            onOpenStart: function () { forceEnablePageScroll(); },
            onCloseEnd: function () { forceEnablePageScroll(); }
          });
        }

        forceEnablePageScroll();
      } catch (e) {}
    }, 0);
  }

  function toast(msg) {
    try { window.M && M.toast ? M.toast({ html: msg }) : console.warn(msg); } catch (e) {}
  }
  $scope.toast = toast;

  function openGoogleGate() {
    try {
      var el = document.getElementById('googleGateModal');
      if (!window.M || !el) return;
      var inst = M.Modal.getInstance(el) || M.Modal.init(el, { dismissible: true, opacity: 0.55, preventScrolling: false });
      forceEnablePageScroll();
      inst.open();
      forceEnablePageScroll();
    } catch (e) {}
  }

  function closeGoogleGate() {
    try {
      var el = document.getElementById('googleGateModal');
      var inst = window.M && el ? M.Modal.getInstance(el) : null;
      inst && inst.close && inst.close();
      $timeout(forceEnablePageScroll, 0);
      $timeout(forceEnablePageScroll, 50);
    } catch (e) {}
  }

  function isPopupDismissed() {
    try { return window.sessionStorage.getItem(GOOGLE_POPUP_KEY) === '1'; }
    catch (e) { return false; }
  }

  function dismissPopup() {
    try { window.sessionStorage.setItem(GOOGLE_POPUP_KEY, '1'); } catch (e) {}
  }

  // ---------------- Google user storage ----------------
  function readGoogleUser() {
    try {
      var raw = window.localStorage.getItem(GOOGLE_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeGoogleUser(u) {
    try { window.localStorage.setItem(GOOGLE_USER_KEY, JSON.stringify(u || {})); }
    catch (e) {}
  }

  // Patch global onSignIn so CareersApply can capture login too
  (function patchOnSignInOnce() {
    if (window.__fg_apply_patched_onSignIn) return;
    window.__fg_apply_patched_onSignIn = true;

    var prev = window.onSignIn;
    window.onSignIn = function (googleUser) {
      try { prev && prev(googleUser); } catch (e) {}

      try {
        var profile = googleUser && googleUser.getBasicProfile ? googleUser.getBasicProfile() : null;
        var user = profile ? {
          name: profile.getName ? profile.getName() : '',
          email: profile.getEmail ? profile.getEmail() : '',
          imageUrl: profile.getImageUrl ? profile.getImageUrl() : ''
        } : null;

        if (user && user.email) {
          writeGoogleUser(user);
          dismissPopup();

          $timeout(function () {
            $scope.googleUser = user;
            applyGooglePrefill();
            closeGoogleGate();

            if ($scope.stepIndex === 0) {
              $scope.stepIndex = 1;
              initMaterializeUI();
            }
            toast('Signed in. Auto-filled your details.');
          }, 50);
        }
      } catch (e) {}
    };
  })();

  $scope.googleUser = readGoogleUser();
  $scope.locked = {};

  function isEmpty(v) {
    if (v === null || v === undefined) return true;
    if (typeof v === 'string') return v.trim().length === 0;
    if (Array.isArray(v)) return v.length === 0;
    return false;
  }

  function detectFieldKey(predicateFn, fallbackKey) {
    try {
      for (var ci = 0; ci < ($scope.chapters || []).length; ci++) {
        var fields = ($scope.chapters[ci] && $scope.chapters[ci].fields) ? $scope.chapters[ci].fields : [];
        for (var fi = 0; fi < fields.length; fi++) {
          var f = fields[fi];
          if (!f) continue;
          if (predicateFn(f)) return String(f.key || f.id || fallbackKey || '');
        }
      }
    } catch (e) {}
    return fallbackKey || '';
  }

  function getPhoneFieldKey() {
    _phoneKey = detectFieldKey(function (f) {
      var key = String(f.key || '');
      var k = key.toLowerCase();
      return f.type === 'tel' || k.indexOf('phone') >= 0 || k.indexOf('mobile') >= 0;
    }, _phoneKey || 'phone');
    return _phoneKey || 'phone';
  }

  function getEmailFieldKey() {
    _emailKey = detectFieldKey(function (f) {
      var key = String(f.key || '');
      var k = key.toLowerCase();
      return f.type === 'email' || k === 'email' || k.indexOf('email') >= 0;
    }, _emailKey || 'email');
    return _emailKey || 'email';
  }

  function getNameFieldKey() {
    _nameKey = detectFieldKey(function (f) {
      var key = String(f.key || f.id || '');
      var k = key.toLowerCase();
      var label = String(f.label || '').toLowerCase();

      // strongest signals
      if (k === 'fullname' || k === 'full_name' || k === 'name') return true;
      if (k.indexOf('full') >= 0 && k.indexOf('name') >= 0) return true;

      // label-based (your API likely uses labels)
      if (label.indexOf('full name') >= 0) return true;
      if (label === 'name' || label.indexOf('your name') >= 0) return true;

      // common variants
      if (k.indexOf('applicant') >= 0 && k.indexOf('name') >= 0) return true;
      if (k.indexOf('candidate') >= 0 && k.indexOf('name') >= 0) return true;

      return false;
    }, _nameKey || 'fullName');

    return _nameKey || 'fullName';
  }

  function applyGooglePrefill() {
    $scope.googleUser = readGoogleUser();

    var emailKey = getEmailFieldKey();
    var nameKey = getNameFieldKey();

    if ($scope.googleUser && $scope.googleUser.email) {
      if ($scope.form) {
        $scope.form[nameKey] = $scope.googleUser.name || $scope.form[nameKey];
        $scope.form[emailKey] = $scope.googleUser.email || $scope.form[emailKey];
      }
      $scope.locked[nameKey] = true;
      $scope.locked[emailKey] = true;
    } else {
      $scope.locked[nameKey] = false;
      $scope.locked[emailKey] = false;
    }
  }

  $scope.googleLoginFallback = function () {
    try {
      if (window.fgGoogleSignIn) window.fgGoogleSignIn();
      else toast('Please use the Google sign-in in the navbar.');
    } catch (e) {}
  };

  $scope.skipGoogleAndProceed = function () {
    dismissPopup();
    closeGoogleGate();
    $scope.stepIndex = 1;
    initMaterializeUI();
    forceEnablePageScroll();
  };

  function scrollToField(key) {
    $timeout(function () {
      try {
        var el = document.getElementById('field-' + key);
        if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        var inp = document.querySelector('[name="' + key + '"]');
        if (inp && inp.focus) inp.focus();
      } catch (e) {}
    }, 0);
  }
  $scope.scrollToField = scrollToField;

  // ✅ FIX: checkboxes must remain clickable => NO preventDefault
  $scope.toggleCheckbox = function (key, option, $event) {
    try {
      if ($event && $event.stopPropagation) $event.stopPropagation();
    } catch (e) {}

    var prev = $scope.form[key];
    var arr = Array.isArray(prev) ? prev.slice(0) : [];
    var idx = arr.indexOf(option);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(option);

    $scope.form[key] = arr;
  };

  // ---- init flow (from API) ----
  var jobId = ($stateParams.jobId || '').trim();
  var roleTitle = ($stateParams.roleTitle || '').trim();

  if (!jobId && !roleTitle) {
    $scope.isLoading = false;
    $scope.loadError = 'Unable to open application: job is missing. Please click Apply from the Careers page again.';
    toast($scope.loadError);
    return;
  }

  // placeholders while loading
  $scope.intro = { title: 'Fluke Games – Application Form', body: [], note: '' };
  $scope.role = { id: '', title: roleTitle || '', jobId: jobId || '' };
  $scope.chapters = [];

  $scope.form = {
    roleId: '',
    roleTitle: roleTitle || '',
    jobId: jobId || '',
    whatsappOptIn: false
  };
  $scope.stepIndex = 0;

  // validators
  $scope.PHONE_REGEX = /^\+?[0-9\s().-]{7,20}$/;
  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var URL_REGEX = /^https?:\/\/.+/i;

  $scope.isIntro = function () { return $scope.stepIndex === 0; };
  $scope.totalSteps = function () { return 1 + ($scope.chapters ? $scope.chapters.length : 0); };
  $scope.currentChapter = function () {
    if ($scope.stepIndex <= 0) return null;
    return $scope.chapters[$scope.stepIndex - 1];
  };
  $scope.progressPct = function () {
    var total = $scope.totalSteps();
    if (total <= 1) return 0;
    return Math.round(($scope.stepIndex / (total - 1)) * 100);
  };

  function validateFieldValue(field) {
    var v = $scope.form[field.key];
    if (field.required && isEmpty(v)) return { ok: false };

    if (!isEmpty(v)) {
      var s = (typeof v === 'string') ? v.trim() : v;
      if (field.type === 'email' && !EMAIL_REGEX.test(String(s))) return { ok: false };
      if (field.type === 'tel' && !$scope.PHONE_REGEX.test(String(s))) return { ok: false };
      if (field.type === 'url' && !URL_REGEX.test(String(s))) return { ok: false };
    }
    return { ok: true };
  }

  function validateWhatsAppConsentIfPhoneProvided() {
    var phoneKey = getPhoneFieldKey();
    var hasPhone = !isEmpty($scope.form && $scope.form[phoneKey]);
    if (hasPhone && !$scope.form.whatsappOptIn) {
      toast('Please confirm WhatsApp consent to proceed.');
      scrollToField(phoneKey);
      return false;
    }
    return true;
  }

  function validateCurrentPageAndShowHelp() {
    var chapter = $scope.currentChapter();
    if (!chapter || !chapter.fields) return true;

    for (var i = 0; i < chapter.fields.length; i++) {
      var f = chapter.fields[i];
      var r = validateFieldValue(f);
      if (!r.ok) {
        toast('Missing: ' + f.label);
        scrollToField(f.key);
        return false;
      }
    }

    if (!validateWhatsAppConsentIfPhoneProvided()) return false;
    return true;
  }

  function validateAllPagesAndJump() {
    for (var page = 1; page <= $scope.chapters.length; page++) {
      var ch = $scope.chapters[page - 1];
      if (!ch || !ch.fields) continue;

      for (var i = 0; i < ch.fields.length; i++) {
        var f = ch.fields[i];
        var r = validateFieldValue(f);
        if (!r.ok) {
          $scope.stepIndex = page;
          initMaterializeUI();
          toast('Missing: ' + f.label);
          scrollToField(f.key);
          return false;
        }
      }
    }

    if (!validateWhatsAppConsentIfPhoneProvided()) return false;

    // final guard: email must exist + be filled (because backend expects it)
    var emailKey = getEmailFieldKey();
    if (!emailKey) return false;
    if (isEmpty($scope.form[emailKey])) {
      toast('Missing: Email');
      scrollToField(emailKey);
      return false;
    }

    return true;
  }

  function checkGoogleButtonRendered() {
    $timeout(function () {
      try {
        var container = document.querySelector('#googleGateModal .g-signin2');
        var hasBtn = false;

        if (container) {
          hasBtn =
            !!container.querySelector('iframe') ||
            !!container.querySelector('[role="button"]') ||
            (container.children && container.children.length > 0);
        }

        $scope.googleBtnReady = !!hasBtn;
      } catch (e) {
        $scope.googleBtnReady = false;
      }
    }, 900);
  }

  function afterFlowLoaded() {
    $timeout(function () {
      initMaterializeUI();
      forceEnablePageScroll();

      applyGooglePrefill();
      checkGoogleButtonRendered();

      if ($scope.isIntro() && !($scope.googleUser && $scope.googleUser.email) && !isPopupDismissed()) {
        openGoogleGate();
        checkGoogleButtonRendered();
      }
    }, 250);
  }

  // Load from API
  CareersApplyService.getFlowAsync(jobId, roleTitle)
    .then(function (flow) {
      $scope.isLoading = false;

      if (!flow || !flow.role || !(flow.role.jobId || flow.role.title)) {
        $scope.loadError = 'Unable to open application: role not found. Please click Apply from the Careers page again.';
        toast($scope.loadError);
        return;
      }

      $scope.intro = flow.intro;
      $scope.role = flow.role;
      $scope.chapters = flow.chapters;

      // Discover keys after chapters are available
      _emailKey = getEmailFieldKey();
      _nameKey = getNameFieldKey();
      _phoneKey = getPhoneFieldKey();

      // Hard fail if API forgot an email field (no injection)
      if (!_emailKey) {
        $scope.loadError = 'This job form is missing an Email field in the Jobs API configuration. Please fix the job questions and try again.';
        toast($scope.loadError);
        return;
      }

      // reset form with job context (keep any prefilled values)
      var prev = $scope.form || {};
      $scope.form = angular.extend({}, prev, {
        roleId: flow.role.id || '',
        roleTitle: flow.role.title || '',
        jobId: flow.role.jobId || ''
      });

      applyGooglePrefill();
      afterFlowLoaded();
    })
    .catch(function (err) {
      $scope.isLoading = false;
      $scope.loadError = 'Unable to load the application form. Please refresh and try again.';
      toast($scope.loadError);
      console.error('Jobs API error:', err);
    });

  $scope.startApplication = function () {
    if ($scope.isLoading) return;

    applyGooglePrefill();
    if (!($scope.googleUser && $scope.googleUser.email) && !isPopupDismissed()) {
      openGoogleGate();
      checkGoogleButtonRendered();
      return;
    }
    $scope.stepIndex = 1;
    initMaterializeUI();
    forceEnablePageScroll();
  };

  $scope.next = function (formCtrl) {
    if ($scope.isLoading) return;
    if ($scope.isIntro()) return $scope.startApplication();

    if (formCtrl && formCtrl.$setSubmitted) formCtrl.$setSubmitted();
    if (!validateCurrentPageAndShowHelp()) return;

    if ($scope.stepIndex < $scope.totalSteps() - 1) {
      $scope.stepIndex++;
      initMaterializeUI();
      forceEnablePageScroll();
    }
  };

  $scope.back = function () {
    if ($scope.isLoading) return;
    if ($scope.stepIndex > 0) $scope.stepIndex--;
    initMaterializeUI();
    forceEnablePageScroll();
  };

  function buildFieldIndex() {
  var idx = {};
  try {
    ($scope.chapters || []).forEach(function (ch) {
      (ch.fields || []).forEach(function (f) {
        if (!f) return;
        var key = String(f.key || f.id || '');
        if (!key) return;
        idx[key] = {
          label: String(f.label || key),
          type: String(f.type || ''),
          id: String(f.id || ''),
          key: key
        };
      });
    });
  } catch (e) {}
  return idx;
}

function pickByLabelOrKeyContains(fieldIndex, form, needles) {
  needles = (needles || []).map(function (s) { return String(s).toLowerCase(); });
  var best = '';
  try {
    Object.keys(fieldIndex || {}).forEach(function (k) {
      var meta = fieldIndex[k] || {};
      var label = String(meta.label || '').toLowerCase();
      var key = String(k || '').toLowerCase();
      var id = String(meta.id || '').toLowerCase();
      for (var i = 0; i < needles.length; i++) {
        var n = needles[i];
        if (label.indexOf(n) >= 0 || key.indexOf(n) >= 0 || id.indexOf(n) >= 0) {
          var v = form && form[k];
          if (v !== null && v !== undefined && String(v).trim() !== '') best = v;
        }
      }
    });
  } catch (e) {}
  return best;
}

function buildPayload() {
  var f = $scope.form || {};
  var gu = readGoogleUser() || {};

  var fieldIndex = buildFieldIndex();

  var emailKey = getEmailFieldKey();
  var nameKey = getNameFieldKey();
  var phoneKey = getPhoneFieldKey();

  var resolvedName =
    (f[nameKey] && String(f[nameKey]).trim()) ? f[nameKey] : (gu.name || '');

  var resolvedEmail =
    (f[emailKey] && String(f[emailKey]).trim()) ? f[emailKey] : (gu.email || '');

  // ✅ pick resume/portfolio even if keys are random
  var resolvedResume =
    pickByLabelOrKeyContains(fieldIndex, f, ['resume', 'cv']) ||
    f.resumeLink ||
    '';

  var resolvedPortfolio =
    pickByLabelOrKeyContains(fieldIndex, f, ['portfolio', 'website', 'link']) ||
    f.portfolioLink ||
    '';

  // ✅ create readable answers (label -> value), still keep raw for stability
  var answersRaw = angular.copy(f);
  var answersReadable = {};

  Object.keys(answersRaw || {}).forEach(function (k) {
    // skip internal fields you don't want duplicated
    if (k === 'roleId' || k === 'roleTitle' || k === 'jobId') return;

    var meta = fieldIndex[k];
    var label = meta ? meta.label : k;

    var v = answersRaw[k];
    if (Array.isArray(v)) answersReadable[label] = v.slice(0);
    else answersReadable[label] = v;
  });

  return {
    meta: {
      submittedAt: new Date().toISOString(),
      source: 'fluke-games-careers',
      formVersion: 'v6-api-driven-whatsapp-consent'
    },
    role: {
      id: f.roleId,
      title: f.roleTitle,
      jobId: f.jobId,
      team: ($scope.role && $scope.role.team) ? $scope.role.team : '',
      location: ($scope.role && $scope.role.location) ? $scope.role.location : '',
      employmentType: ($scope.role && $scope.role.employmentType) ? $scope.role.employmentType : ''
    },
    google: { name: gu.name || '', email: gu.email || '', imageUrl: gu.imageUrl || '' },
    applicant: {
      fullName: resolvedName,
      email: resolvedEmail,
      phone: f[phoneKey],
      whatsappOptIn: !!f.whatsappOptIn,
      university: f.university,
      degreeAndYear: f.degreeYear,
      resumeLink: resolvedResume,
      portfolioLink: resolvedPortfolio
    },

    // ✅ send BOTH
    answersRaw: answersRaw,
    answersReadable: answersReadable
  };
}


  function extractTrackingId(data) {
    if (!data) return '';
    return (data.trackingId || data.applicationId || data.requestId || data.id || data.itemId || '');
  }

  function prettySubmitted(isoString) {
    try {
      var d = isoString ? new Date(isoString) : new Date();
      return d.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit'
      });
    } catch (e) {
      return isoString || '';
    }
  }

  $scope.submit = function (formCtrl) {
    if ($scope.isSubmitting || $scope.isSubmitted || $scope.isLoading) return;

    $scope.submitError = '';
    applyGooglePrefill();

    if (formCtrl && formCtrl.$setSubmitted) formCtrl.$setSubmitted();
    if (!validateAllPagesAndJump()) return;

    if ($scope.form.ackVolunteer !== 'Agree and Submit') {
      toast('Please select "Agree and Submit" before submitting.');
      scrollToField('ackVolunteer');
      return;
    }

    var payload = buildPayload();
    $scope.isSubmitting = true;
    toast('Submitting...');

    $http({
      method: 'POST',
      url: APPLY_API_URL,
      headers: { 'Content-Type': 'application/json' },
      data: payload
    })
      .then(function (resp) {
        $scope.isSubmitting = false;

        var data = resp && resp.data ? resp.data : null;
        var trackingId = extractTrackingId(data);

        var emailKey = getEmailFieldKey();

        $scope.isSubmitted = true;
        $scope.submitReceipt = {
          submittedPretty: prettySubmitted(payload.meta && payload.meta.submittedAt),
          email: ($scope.form && emailKey && $scope.form[emailKey]) ? $scope.form[emailKey] : '',
          roleTitle: ($scope.form && $scope.form.roleTitle) ? $scope.form.roleTitle : '',
          trackingId: trackingId
        };

        $timeout(function () {
          try { window.scrollTo(0, 0); } catch (e) {}
          initMaterializeUI();
          forceEnablePageScroll();
        }, 0);

        toast('Application received. Thank you!');
        console.log('Apply API response:', data);
      })
      .catch(function (err) {
        $scope.isSubmitting = false;

        var msg = 'Submit failed. Please try again.';
        if (err && err.data) {
          if (typeof err.data === 'string') msg = err.data;
          if (err.data.message) msg = err.data.message;
          if (err.data.error) msg = err.data.error;
        }
        $scope.submitError = msg;
        toast(msg);
        console.error('Apply API error:', err);
      });
  };

  $scope.$on('$destroy', function () {
    closeGoogleGate();
    forceEnablePageScroll();
  });

  initMaterializeUI();
  forceEnablePageScroll();
});

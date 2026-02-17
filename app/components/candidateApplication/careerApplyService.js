// app/components/careersApply/careersApplyService.js
var app = angular.module('myAppCareersApplyService', []);

app.factory('CareersApplyService', function ($http, $q) {
  var JOBS_API_URL = 'https://xtipeal88c.execute-api.us-east-1.amazonaws.com/jobs';

  var INTRO = {
    title: 'Fluke Games – Application Form',
    body: [
      'Welcome to the Fluke Games Volunteer Portal.',
      '',
      'Please watch the prototype / gameplay video on our LinkedIn page. If the vision resonates with you, we’d love to learn more about you.'
    ],
    note: 'Note: This is an unpaid volunteer role intended for skill development, collaboration, and portfolio-building experience.'
  };

  var ACK_OPTIONS = ['Agree and Submit', 'Disagree'];

  // Cache jobs (single fetch per page load)
  var _jobsPromise = null;
  var _jobsCache = null;

  function safeStr(x) { return (x === null || x === undefined) ? '' : String(x); }

  function humanizeId(id) {
    var s = safeStr(id).replace(/[_-]+/g, ' ').trim();
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function inferTypeFromId(id) {
    var k = safeStr(id).toLowerCase();
    if (k.indexOf('email') >= 0) return 'email';
    if (k.indexOf('phone') >= 0 || k.indexOf('mobile') >= 0) return 'tel';
    if (k.indexOf('resume') >= 0 || k.indexOf('portfolio') >= 0 || k.indexOf('link') >= 0 || k.indexOf('url') >= 0) return 'url';
    if (k.indexOf('discord') >= 0) return 'text';
    return 'text';
  }

  // IMPORTANT:
  // - Normalize only the questions coming FROM API.
  // - DO NOT inject missing ids/questions (no fallback required:true).
  function normalizeQuestion(q) {
    var id = (q && (q.id || q.key)) ? (q.id || q.key) : '';
    if (!id) return null;

    var rawType = (q && q.type) ? String(q.type) : inferTypeFromId(id);
    var t = String(rawType || '').toLowerCase().trim();

    // common backend variants
    if (t === 'phone' || t === 'phonenumber' || t === 'mobile') t = 'tel';
    if (t === 'longtext' || t === 'multiline') t = 'textarea';
    if (t === 'singlechoice') t = 'radio';
    if (t === 'multichoice') t = 'checkbox';

    if (!t) t = 'text';

    var out = {
      key: id,
      id: id,
      label: (q && q.label) ? q.label : humanizeId(id),
      type: t,
      required: !!(q && q.required),
      options: (q && q.options) ? q.options : undefined,
      placeholder: (q && q.placeholder) ? q.placeholder : undefined,
      helpText: (q && q.helpText) ? q.helpText : undefined,
      meta: (q && q.meta) ? q.meta : undefined
    };

    // sensible defaults
    if (out.type === 'textarea' && !out.placeholder) out.placeholder = 'Write your answer';
    if ((out.type === 'text' || out.type === 'email' || out.type === 'url' || out.type === 'tel') && !out.placeholder) {
      if (out.type === 'email') out.placeholder = 'you@example.com';
      else out.placeholder = '';
    }

    return out;
  }

  function normalizeQuestionsList(list) {
    var out = [];
    (list || []).forEach(function (q) {
      var nq = normalizeQuestion(q);
      if (nq && nq.id) out.push(nq);
    });
    return out;
  }

  // Optional ordering: if API provides ids + objects, order by ids BUT DO NOT INJECT missing.
  function orderByIdsNoInject(ids, questionsObjList) {
    var out = [];
    var idList = Array.isArray(ids) ? ids : [];
    var qs = Array.isArray(questionsObjList) ? questionsObjList : [];

    // map by id
    var byId = {};
    qs.forEach(function (q) {
      var id = q && q.id ? q.id : (q && q.key ? q.key : '');
      if (id) byId[id] = q;
    });

    // if ids exist, output only those that exist in byId
    if (idList.length) {
      idList.forEach(function (id) {
        if (byId[id]) {
          var nq = normalizeQuestion(byId[id]);
          if (nq) out.push(nq);
        }
      });

      // append remaining objects not listed in ids (stable)
      qs.forEach(function (q) {
        var id = q && q.id ? q.id : (q && q.key ? q.key : '');
        if (!id) return;
        if (idList.indexOf(id) >= 0) return;
        var nq2 = normalizeQuestion(q);
        if (nq2) out.push(nq2);
      });

      return out;
    }

    // no ids given -> just normalize list order
    return normalizeQuestionsList(qs);
  }

  function buildChapter(title, description, fields) {
    return { title: title, description: description || '', fields: fields || [] };
  }

  // Keep acknowledgement as a single required field (does NOT depend on API)
  function buildAckChapter() {
    return buildChapter(
      'Acknowledgement',
      'Before submitting, please confirm you understand this is a volunteer-based role.',
      [
        {
          key: 'ackVolunteer',
          id: 'ackVolunteer',
          label: 'I acknowledge that this is a volunteer based role.',
          type: 'radio',
          required: true,
          options: ACK_OPTIONS
        }
      ]
    );
  }

  function jobToRoleId(job) {
    var title = safeStr(job && job.title).toLowerCase();
    title = title.replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    return title || safeStr(job && job.jobId) || '';
  }

  function fetchJobs() {
    if (_jobsPromise) return _jobsPromise;

    var d = $q.defer();
    _jobsPromise = d.promise;

    $http({
      method: 'GET',
      url: JOBS_API_URL,
      headers: { 'Accept': 'application/json' }
    })
      .then(function (resp) {
        var data = resp && resp.data ? resp.data : {};
        var items = data.items || [];
        _jobsCache = items;
        d.resolve(items);
      })
      .catch(function (err) {
        d.reject(err);
      });

    return _jobsPromise;
  }

  function findJob(jobs, jobId, roleTitle) {
    var id = safeStr(jobId).trim();
    var title = safeStr(roleTitle).trim().toLowerCase();

    if (id) {
      for (var i = 0; i < jobs.length; i++) {
        if (safeStr(jobs[i].jobId) === id) return jobs[i];
      }
    }

    if (title) {
      for (var j = 0; j < jobs.length; j++) {
        if (safeStr(jobs[j].title).trim().toLowerCase() === title) return jobs[j];
      }
      for (var k = 0; k < jobs.length; k++) {
        if (safeStr(jobs[k].title).trim().toLowerCase().indexOf(title) >= 0) return jobs[k];
      }
    }

    return null;
  }

  function buildFlowFromJob(job) {
    if (!job) return null;

    var roleId = jobToRoleId(job);
    var roleTitle = safeStr(job.title) || roleId;

    // ONLY what the API provides:
    // - If API provides generalQuestions/personalQuestions: use them (ordered by ids if present)
    // - If they are missing/empty: DO NOT create default/injected questions.
    var generalFields = orderByIdsNoInject(job.generalQuestionIds, job.generalQuestions);
    var personalFields = orderByIdsNoInject(job.personalQuestionIds, job.personalQuestions);

    // Role questions
    var roleFields = orderByIdsNoInject(job.roleQuestionIds, job.roleQuestions);

    var chapters = [];

    // Include chapters only if there are API-provided fields
    if (generalFields && generalFields.length) {
      chapters.push(buildChapter(
        'General Questions',
        'We’d love to hear your thoughts about the project.\n\n' +
          'Please share how you connect with the game’s direction, what excites you, and any feedback or ideas you may have.',
        generalFields
      ));
    }

    if (personalFields && personalFields.length) {
      chapters.push(buildChapter(
        'Applicant Information',
        'Tell us a bit about yourself.',
        personalFields
      ));
    }

    if (roleFields && roleFields.length) {
      chapters.push(buildChapter(
        roleTitle,
        safeStr(job.description || '').trim() ? 'Role-specific questions for this application.' : '',
        roleFields
      ));
    } else {
      // If roleFields empty, still return flow (avoid crash)
      chapters.push(buildChapter(
        roleTitle,
        safeStr(job.description || '').trim() ? 'Role-specific questions for this application.' : '',
        []
      ));
    }

    // Always require acknowledgement (single stable field)
    chapters.push(buildAckChapter());

    return {
      intro: INTRO,
      role: {
        id: roleId,
        title: roleTitle,
        jobId: safeStr(job.jobId),
        team: safeStr(job.team),
        location: safeStr(job.location),
        employmentType: safeStr(job.employmentType),
        tags: job.tags || [],
        description: safeStr(job.description)
      },
      chapters: chapters
    };
  }

  return {
    fetchJobs: function () { return fetchJobs(); },

    getFlowAsync: function (jobId, roleTitle) {
      return fetchJobs().then(function (jobs) {
        var job = findJob(jobs, jobId, roleTitle);
        return buildFlowFromJob(job);
      });
    },

    getJobByIdAsync: function (jobId) {
      return fetchJobs().then(function (jobs) {
        return findJob(jobs, jobId, '');
      });
    }
  };
});

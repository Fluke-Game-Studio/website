// app/components/careers/careersCtrl.js
var app = angular.module('myAppCareersCtrl', []);

app.controller('CareersCtrl', function ($scope, $timeout, $sce, CareersService) {
  $scope.jobs = [];
  $scope.selectedJob = null;

  $scope.loading = true;
  $scope.loadError = '';

  function initModal() {
    var modalEl = document.getElementById('jobModal');
    if (!window.M || !modalEl) return;

    // dismissible true, and keep body from doing weird scroll jumps
    return M.Modal.init(modalEl, {
      dismissible: true,
      opacity: 0.6,
      preventScrolling: true, // body scroll locked; modal-content will scroll
      onOpenStart: function () {
        // small safety: ensure modal-content is at top each open
        $timeout(function () {
          var content = modalEl.querySelector('.modal-content');
          if (content) content.scrollTop = 0;
        }, 0);
      }
    });
  }

  function initTooltips() {
    var tooltips = document.querySelectorAll('.tooltipped');
    if (window.M && tooltips.length) M.Tooltip.init(tooltips, {});
  }

  function normalizeForUi(jobs) {
    return (jobs || []).map(function (j) {
      return {
        jobId: j.jobId,
        title: j.title || '',
        type: j.type || 'Volunteer (Remote)',
        tags: Array.isArray(j.tags) ? j.tags : [],
        descHtml: $sce.trustAsHtml(j.desc || ''),
        raw: j.raw || {}
      };
    });
  }

  function loadJobs() {
    $scope.loading = true;
    $scope.loadError = '';

    CareersService.listJobsPublic()
      .then(function (jobs) {
        $scope.jobs = normalizeForUi(jobs);
        $scope.selectedJob = ($scope.jobs && $scope.jobs.length) ? $scope.jobs[0] : null;
      })
      .catch(function (e) {
        $scope.jobs = [];
        $scope.selectedJob = null;
        $scope.loadError = (e && e.message) ? e.message : 'Failed to load jobs';
      })
      .finally(function () {
        $scope.loading = false;

        // ensure Materialize hooks re-init after ng-repeat renders
        $timeout(function () {
          if (!modalInstance) modalInstance = initModal();
          initTooltips();
        }, 0);
      });
  }

  var modalInstance = null;

  $scope.openJob = function (job) {
    $scope.selectedJob = job;

    $timeout(function () {
      if (!modalInstance) modalInstance = initModal();
      if (modalInstance) modalInstance.open();
      initTooltips();
    }, 0);
  };

  // Init once after first render
  $timeout(function () {
    modalInstance = initModal();
    initTooltips();
  }, 0);

  // Load jobs from API
  loadJobs();
});

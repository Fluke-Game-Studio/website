var app = angular.module("myApp", [
  'ui.bootstrap',
  'ngAnimate',
  'ngSanitize',
  'myAppRouter',
  'myAppWIPCtrl',
  'myAppHomeCtrl',
  'myAppQbgCtrl',
  'myAppPavanCtrl',
  'myAppShowcaseCtrl',
  'myAppHomeService',
  'myAppQbgService',
  'myAppPavanService',
  'myAppShowcaseService',
  'myAppNavbarDirective',
  'myAppBackgroundCanvasDirective',
  'myAppNavbarService',
  'myAppLoginCtrl',
  'myAppLoginService',
  'myAppCareersService',
  'myAppCareersCtrl',
  'myAppCareersApplyService',
  'myAppCareersApplyCtrl'
]);

app.run(function($rootScope, $location) {
  $rootScope.location = $location;
  $rootScope.isLoading = false;
});

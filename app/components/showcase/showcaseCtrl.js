angular.module('myAppShowcaseCtrl', []).controller('showcaseCtrl', ['$rootScope', '$scope', 'pavanContent', '$window', '$sce', function($rootScope, $scope, pavanContent, $window, $sce){
    $window.scrollTo(0, 0);
    document.body.style.height = '100vh';
    $rootScope.isLoading = true;
    $scope.$on('$destroy', function () {
        
      });
}]);
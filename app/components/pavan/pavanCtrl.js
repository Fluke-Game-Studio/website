angular.module('myAppPavanCtrl', []).controller('pavanCtrl', ['$scope', 'pavanContent', '$window', '$sce', function($scope, pavanContent, $window, $sce){
    $window.scrollTo(0, 0);
    $scope.pavanVideoIds = ['NcKUwYlBdxs', 'rQiyZuMRYdA', 'LwVUdcShfzI', 'v0KCW1CtqF4'];
}]);
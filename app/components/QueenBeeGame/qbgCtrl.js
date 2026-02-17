angular.module('myAppQbgCtrl', []).controller('qbgCtrl', ['$scope', 'homeContent', '$window', '$document', '$timeout', function($scope, homeContent, $window, $document, $timeout){
	let last_x = 0;
    $window.scrollTo(0, 0);
    document.body.style.height = "100vh";

    // Mocking homeContent service for content initialization
    $scope.dataset = { /* Mocked content */ };
    $scope.header = { /* Mocked header */ };
    $scope.subheading = { /* Mocked subheading */ };
}]);

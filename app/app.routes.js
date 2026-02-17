var app = angular.module('myAppRouter', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('wip', {
            url: '/wip',
            templateUrl: 'app/components/WIPLanding/partial-WIP.html'
        })

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'app/components/home/partial-home.html'
        })

        .state('qbg', {
            url: '/queenbeegame',
            templateUrl: 'app/components/QueenBeeGame/partial-qbg.html'
        })

        .state('pavan', {
            url: '/pavan',
            templateUrl: 'app/components/pavan/partial-pavan.html'
        })

        .state('showcase', {
            url: '/showcase',
            templateUrl: 'app/components/showcase/partial-showcase.html'
        })

        .state('careerApply', {
            url: '/careers/apply?roleTitle',
            templateUrl: 'app/components/candidateApplication/partial-careers-apply.html',
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('About', {
            url: '/about',
            templateUrl: 'app/components/about/about.html'
        })

        // SERVICES PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('Services', {
            url: '/Services',
            templateUrl: 'app/components/services/services.html'
        })

        // CONTACT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('Contact', {
            url: '/Contact',
            templateUrl: 'app/components/contact/contact.html'
        })

        // LOGIN PAGE ======================================================
        .state('Login', {
            url: '/Login',
            templateUrl: 'app/components/login/login.html'
        })

        .state('careers', {
        url: '/careers',
        templateUrl: 'app/components/careers/partial-careers.html'
        });

});

app.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$stateChangeSuccess', function(event, toState) {
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_path: $location.path()
      });
    }
  });
}]);
// ----------------------------------------
// Router
// ----------------------------------------

MyApp.config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        template: '<h3><em>Hello Angular</em></h3>'
      })
  }]);

MyApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

MyApp.run(['$rootScope', function($rootScope) {
  $rootScope.$on("$stateChangeError", console.error.bind(console));
}]);





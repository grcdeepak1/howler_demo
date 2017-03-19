// ----------------------------------------
// Router
// ----------------------------------------

MyApp.config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/player');

    $stateProvider
      .state('player', {
        url: '/player',
        templateUrl: 'templates/player.html',
        controller: 'PlayerCtrl',
      })
  }]);

MyApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

MyApp.run(['$rootScope', function($rootScope) {
  $rootScope.$on("$stateChangeError", console.error.bind(console));
}]);





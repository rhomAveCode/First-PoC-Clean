'use strict';
/* http://docs.angularjs.org/#!angular.service */

// Declare app level module which depends on filters, and services
angular.module('myApp', [ 'myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/seasons', {template: 'partials/season-list.html',   controller: SeasonListCtrl});
    $routeProvider.when('/seasons/new',  {template: 'partials/season-form.html', controller: SeasonNewCtrl});
    $routeProvider.when('/phones/aggregation',  {template: 'partials/phone-aggre.html', controller: PhoneAggreCtrl});
    $routeProvider.when('/phones/:_id', {template: 'partials/phone-detail.html', controller: SeasonDetailCtrl});
    $routeProvider.when('/phones/edit/:_id', {template: 'partials/season-form.html', controller: PhoneEditCtrl});
    $routeProvider.otherwise({redirectTo: '/seasons'});

    //$locationProvider.html5Mode(true);

    /*$rootScope.$on('$afterRouteChange', function(){
      $window.scrollTo(0,0);
    });*/
  }]);



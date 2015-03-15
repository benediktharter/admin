var adminApp = angular.module('adminApp', ['ngResource', 'ui.router', 'angularFileUpload']);

adminApp.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /admin/landing
    $urlRouterProvider.otherwise('/landing');
    //
    // Now set up the states
    $stateProvider
        .state('landing', {
            url: '/landing',
            templateUrl: '/admin/landing'
        })
        .state('work', {
            url: '/work',
            templateUrl: '/admin/work',
            data: {
                resource: 'work'
            }
        })
        .state('work_create', {
            url: '/work/create',
            templateUrl: '/admin/work/create',
            data: {
                resource: 'work'
            }
        })
        .state('work_edit', {
            url: '/work/:id',
            templateUrl: function ($stateParams){
                return '/admin/work/' + $stateParams.id + '/edit';
            },
            data: {
                resource: 'work'
            }
        })
        .state('cartoon', {
            url: '/cartoon',
            templateUrl: '/admin/cartoon',
            data: {
                resource: 'cartoon'
            }
        })
        .state('cartoon_create', {
            url: '/cartoon/create',
            templateUrl: '/admin/cartoon/create',
            data: {
                resource: 'cartoon'
            }
        })
        .state('cartoon_edit', {
            url: '/cartoon/:id',
            templateUrl: function ($stateParams){
                return '/admin/cartoon/' + $stateParams.id + '/edit';
            },
            data: {
                resource: 'cartoon'
            }
        });
});

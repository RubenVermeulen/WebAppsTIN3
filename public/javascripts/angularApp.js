angular.module('webApps').config(
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainController',
            controllerAs: 'vm'
        }).state('timeline', {
            url: '/timeline',
            templateUrl: '/timeline.html',
            controller: 'MainController',
            controllerAs: 'vm',
            onEnter: ['$state', 'auth', function($state, auth) {
                if ( ! auth.isLoggedIn()) {
                    $state.go('login');
                }
            }],
            resolve: {
                postPromise: ['posts', function(posts) {
                    return posts.getAll();
                }]
            }
        }).state('login', {
            url: '/login',
            templateUrl: '/login.html',
            controller: 'AuthController',
            controllerAs: 'vm',
            onEnter: ['$state', 'auth', function($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
            }]
        }).state('register', {
            url: '/register',
            templateUrl: '/register.html',
            controller: 'AuthController',
            controllerAs: 'vm',
            onEnter: ['$state', 'auth', function($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
            }]
        }).state('change-password', {
            url: '/change-password',
            templateUrl: '/change-password.html',
            controller: 'AuthController',
            controllerAs: 'vm',
            onEnter: ['$state', 'auth', function($state, auth) {
                if (!auth.isLoggedIn()) {
                    $state.go('login');
                }
            }]
        });

        $urlRouterProvider.otherwise('home');
    }
);

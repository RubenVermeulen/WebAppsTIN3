angular.module('webApps').config(
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
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
        }).state('update-profile', {
            url: '/update-profile',
            templateUrl: '/update-profile.html',
            controller: 'AuthController',
            controllerAs: 'vm',
            onEnter: ['$state', 'auth', function($state, auth) {
                if (!auth.isLoggedIn()) {
                    $state.go('login');
                }
            }]
        }).state('users', {
            url: '/users',
            templateUrl: '/users.html',
            controller: 'UsersController',
            controllerAs: 'vm',
            onEnter: ['$state', 'auth', function($state, auth) {
                if ( ! auth.isLoggedIn()) {
                    $state.go('login');
                }
            }],
            resolve: {
                postPromise: ['users', function(users) {
                    users.getAll();
                }]
            }
        }).state('user', {
            url: '/users/{id}',
            templateUrl: '/user.html',
            controller: 'UsersController',
            controllerAs: 'vm',
            onEnter: ['$state', 'auth', function($state, auth) {
                if ( ! auth.isLoggedIn()) {
                    $state.go('login');
                }
            }],
            resolve: {
                user: ['$stateParams', 'users', function($stateParams, users) {
                    return users.get($stateParams.id);
                }],
                userPosts: ['$stateParams', 'posts', function($stateParams, posts) {
                    return posts.get($stateParams.id);
                }],
                followers: ['$stateParams', 'users', function($stateParams, users) {
                    return users.getFollowers($stateParams.id);
                }],
                following: ['$stateParams', 'users', function($stateParams, users) {
                    return users.getFollowing($stateParams.id);
                }]
            }
        });

        $urlRouterProvider.otherwise('login');
    }
);

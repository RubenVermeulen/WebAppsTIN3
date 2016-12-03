describe('angular', function() {

    var $scope,
        $httpBackend,
        $http,
        users;

    var dummies = [
        {id: 1, email: 'frank@hogent.be', firstName: 'Frank', lastName: 'Vermeulen'},
        {id: 2, email: 'sofie@hogent.be', firstName: 'Sofie', lastName: 'Schelstraete'},
        {id: 3, email: 'louis@hogent.be', firstName: 'Louis', lastName: 'De Jaegher'},
        {id: 4, email: 'theo@hogent.be', firstName: 'Theo', lastName: 'Van Damme'}
    ];

    // Initialize

    beforeEach(function() {
        module('webApps');

        inject( function($injector){
            users = $injector.get('users');
        });

        inject(function(_$http_) {
            $http = _$http_;
        });

        inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', '/users').respond(200, dummies);

            $httpBackend.when('GET', /\/users\/.+/).respond(function(method, url, data, headers) {
                var args = url.match(/\/users\/(.+)/);

                for (var key in dummies) {
                    if (dummies[key].id === parseInt(args[1])) {
                        return [200, dummies[key]];
                    }
                }
                return [400, {}]; // args[1] is de waarde tussen de haakjes in de reguliere expressie
            });
        });

        inject(function($rootScope) {
            $scope = $rootScope.$new();
        })
    });

    // Tests

    it('get all users', function() {
        users.getAll().success(function(data, status, header, config){
            $scope.valid = true;
            $scope.users = data;
        });

        $httpBackend.flush(); // process all calls (async)

        expect($scope.valid).toBe(true);
        expect($scope.users.length).toEqual(4);
        expect($scope.users[3].id).toEqual(4);
    });

    it('get specific user', function() {
        users.get(2).success(function(data, status, header, config){
            $scope.valid = true;
            $scope.user = data;
        });

        $httpBackend.flush(); // process all calls (async)

        expect($scope.valid).toBe(true);
        expect($scope.user.email).toEqual('sofie@hogent.be');
        expect($scope.user.firstName).toEqual('Sofie');
        expect($scope.user.lastName).toEqual('Schelstraete');
    });
});
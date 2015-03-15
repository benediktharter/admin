adminApp.controller('LoginController', function ($scope, $resource) {
    $scope.message = 'Ingrese sus datos';
    
    var authAPI = $resource('/admin/doLogin');
    
    $scope.doLogin = function () {
        
        var response = authAPI.save({ email: $scope.email, password: $scope.password }, function () {
            if (response.result === false) {
                $scope.message = 'Usuario y/o contaseña incorrecta.';
            } else if (response.result === true) {
                window.location.assign('/admin/home');
            } else {
                $scope.message = 'Error desconocido. Inténtelo nuevamente más tarde.';
            }
        });
        
    };
});
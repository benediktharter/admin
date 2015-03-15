adminApp.controller('ListController', function ($scope, $http, $stateParams, $state) {
    var resource = $state.current.data.resource;

    $scope.models = [];

    $http.get('/admin/' + resource + '?ajax=true').
        success(function(response) {
            if ((response) && (response[resource])) {
                $scope.models = response[resource]
            }
        })
        .error(function () {
            $state.go('landing');
        });

    $scope.delete = function (item) {
        if (! confirm('¿Eliminar este item?')) {
            return;
        }

        $http.delete('/admin/' + resource + '/' + item.id + '?ajax=true')
            .error(function () {
                alert('Error procesando la operación.');
            });

        var index = $scope.models.indexOf(item);
        $scope.models.splice(index, 1);
    };
});

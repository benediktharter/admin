adminApp.controller('EditController', function ($scope, $http, $stateParams, $state, $upload) {
    var id = $stateParams.id;
    //$state.current.data.resource
    var resource = $state.current.data.resource;

    $http.get('/admin/' + resource + '/'+ id +'/edit?ajax=true').
        success(function(response) {
            $('form').animate({opacity: 1});

            if (response) {
                $scope[resource] = response;

                $scope.images = response.images;
            }
        })
        .error(function () {
            $state.go('landing');
        });

    $scope.progress = '';

    $scope.onFileSelect = function($files) {
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];

            $scope.upload = $upload.upload({
                url: '/admin/' + resource + '/images',
                method: 'POST',
                withCredentials: true,
                file: file,
                data: {
                    id: id
                }
            }).progress(function(evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function(data, status, headers, config) {
                if ((! data) && (! data.thumbnail)) {
                    return;
                }

                $scope.progress = '';

                addImage(data);
            }).error(function () {
                alert('Error subiendo imagen.');
            });
        }
    };

    $scope.save = function () {
        var data = {};
        data[resource] = $scope[resource];
        data['images'] = $scope.images;

        $http.put('/admin/' + resource + '/' + id, data)
            .success(function (response, status, headers, config) {
                if (! response) {
                    alert('Error procesando la operación.');
                } else if (response.result == 'error') {
                    alert(response.message);
                } else {
                    $state.transitionTo(resource, {}, { reload: true });
                }
            })
            .error(function () {
                alert('Error guardando.');
            });
    };

    $scope.deleteImage = function (item) {
        if (! confirm('¿Eliminar imagen?')) {
            return;
        }

        var i = $scope.images.indexOf(item);

        $scope.images.splice(i, 1);

        $http.delete('/admin/' + resource + '/images/' + item.id)
            .error(function () {
                alert('Error procesando la operación.');
            });
    };

    $scope.images = [];

    function addImage(image) {
        $scope.images.push(image);
    }
});

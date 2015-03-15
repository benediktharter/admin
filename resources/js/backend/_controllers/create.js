adminApp.controller('CreateController', function ($scope, $http, $stateParams, $state, $upload) {
    var id = $stateParams.id
    //$state.current.data.resource
    var resource = $state.current.data.resource;

    $scope.progress = '';

    $scope.onFileSelect = function($files) {
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];

            $scope.upload = $upload.upload({
                url: '/admin/' + resource + '/images',
                method: 'POST',
                withCredentials: true,
                file: file,
                formDataAppender: function(formData, key, val) {

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

    $http.get('/admin/' + resource + '/images')
        .success(function (response) {
            $('form').animate({opacity: 1});

            if ((! response) || (! response.length)) {
                return;
            }

            $scope.images = response;
        })
        .error(function () {
            $('form').animate({opacity: 1});
            alert('Error cargando imágenes.');
        });


    $scope.save = function () {
        var data = {};
        data[resource] = $scope[resource];
        data['images'] = $scope.images;

        $http.post('/admin/' + resource, data)
            .success(function () {
                $state.transitionTo(resource, {}, { reload: true });
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

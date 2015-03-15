adminApp.controller('NavbarController', function ($scope, $http) {
    $('.navbar').on('click', 'li', function () {
        $('.navbar li.active').removeClass('active');

        $(this).addClass('active');
    });
});
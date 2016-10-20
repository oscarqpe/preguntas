'use strict';
/* global app:true */

var app = angular.module('directoriosApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'lbServices',
    'appServices',
    'appControllers',
    'ui.bootstrap',
    'ngAnimate',
]);

app.run(function($rootScope, $location, $cookieStore, $http){
    /*$rootScope.$on('$routeChangeStart', function (event,next,current) {
        if ($cookieStore.get('e_session_conect') == false || $cookieStore.get('e_session_conect') == null){
            if (next.templateUrl == "views/registro.html")
                $location.path("/registro");
            else
                $location.path("/login");
        }else{
            if (next.templateUrl == "views/login.html"){
                $location.path("/perfil");
            }
        }
    });*/
}).config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/index.html',
            controller: "indexCtrl"
        })
        .otherwise({
            redirectTo: '/'
        });
});

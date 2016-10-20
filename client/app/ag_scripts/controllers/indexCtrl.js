'use strict';

var appCtrl = angular.module('directoriosApp');

appCtrl.controller('indexCtrl', function ($scope, $q, $log, $cookieStore, $location, 
	$http, $routeParams, AppServices) {

	$scope.preguntas =[];

	$scope.queryById = function(id) {
		$scope.preguntas = []
		AppServices.getPreguntasById(id)
		.success(function (data) {
			console.log(data);
			$scope.preguntas.push(data);
			for (var i = 0; i < $scope.preguntas.length; i++) {
				$scope.preguntas[i].alternativas 
					= $scope.preguntas[i].alternativas.replace(/\r\n\r\n/g, "\n");
				$scope.preguntas[i].ubicacion 
					= $scope.preguntas[i].ubicacion.replace(/\r\n\r\n/g, "\n");
				$scope.preguntas[i].respuesta
					= $scope.preguntas[i].respuesta.replace(/\r\n\r\n/g, " ");
				$scope.preguntas[i].respuesta
					= $scope.preguntas[i].respuesta.replace(/\r\n/g, " ");
				$scope.preguntas[i].respuesta
					= $scope.preguntas[i].respuesta.replace(/\n/g, " ");
			}
			$scope.limpiar();
			$("#search").focus();
		});
	}
	$scope.all = function () {
		$scope.preguntas =[];
		AppServices.getPreguntas($("#search").val())
		.success(function (data) {
			console.log(data);
			$scope.preguntas = data.data.preguntas;
			for (var i = 0; i < $scope.preguntas.length; i++) {
				$scope.preguntas[i].alternativas 
					= $scope.preguntas[i].alternativas.replace(/\r\n\r\n/g, "\n");
				$scope.preguntas[i].ubicacion 
					= $scope.preguntas[i].ubicacion.replace(/\r\n\r\n/g, "\n");
				$scope.preguntas[i].respuesta
					= $scope.preguntas[i].respuesta.replace(/\r\n\r\n/g, " ");
				$scope.preguntas[i].respuesta
					= $scope.preguntas[i].respuesta.replace(/\r\n/g, " ");
				$scope.preguntas[i].respuesta
					= $scope.preguntas[i].respuesta.replace(/\n/g, " ");
			}
			//$scope.limpiar();
			$("#search").focus();
		});
	}
	$scope.autoComplete = function (id) {
		$scope.queryById(id);
	}
	$scope.limpiar = function () {
		$('#search').val("");
		$("#search").focus();
	}
	$scope.generate = function () {
		AppServices.getPreguntasAll()
		.success(function (data) {
			console.log(data);
			$scope.preguntas2 = [];
			$scope.preguntas2 = data;
			for (var i = 0; i < $scope.preguntas2.length; i++) {
				$scope.preguntas2[i].pregunta2 
					= $scope.preguntas2[i].pregunta.replace(/[\s]/g, "");
				console.log($scope.preguntas2[i]);
				/*AppServices.update($scope.preguntas2[i])
				.success(function(data){
					console.log(data);
				});*/
			}
		});
	}
});
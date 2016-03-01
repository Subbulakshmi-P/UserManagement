

var app=angular.module('RoutingApp', ['ngRoute','angularUtils.directives.dirPagination']);

app.config( ['$routeProvider', function($routeProvider) {

	$routeProvider

		.when('/list1', {

			templateUrl: 'list1.html',
			controller: "TableUserController"
		})

		.when('/list2', {

			templateUrl: 'list2.html',
			controller: "CreateUserController"
		})

		.when('/list3/:param', {

			templateUrl: 'list3.html',
			controller: "EditUserController"
		})

		.otherwise({

			redirectTo: '/'

		});

}]);





app.controller('TableUserController', function ($scope, $http)
{

	$http.get('/users').success(function (data) {
		$scope.users= data;
	});

	$scope.remove=function(id){
		//console.log(id);
		$http.delete('/userDelete/'+id);
	}



});




app.controller('CreateUserController', function ($scope,$http) {

	    $scope.addnew = function(){
		  console.log($scope.user);
		  $http.post('/userCreate', $scope.user).success(function (response){

		  });
	  };


});


app.controller("EditUserController" ,function($scope, $http, $routeParams, $location){

	$http.get('/users/'+ $routeParams.param).success(function(data){
		//console.log(data);
		$scope.user=angular.copy(data);
	});

	/*$scope.edit=function(id){

		console.log(id);

		console.log("edit called");

		$http.get('/users/'+id).success(function (response) {

			//$scope.user= response;
			$scope.user=angular.copy(data);
			console.log(response);
		});

	};*/


	$scope.update=function() {
		 // console.log($scope.user._id);
		  $http.put('/userUpdate/'+ $scope.user._id, $scope.user).success(function(data) {
			  $scope.user = data;
		  });


	  }

});




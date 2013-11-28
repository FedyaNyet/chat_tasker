
var app_config = function($routeProvider) {
  $routeProvider
	.when('/login', {
		controller: 'AppController',
		templateUrl: 'view/login.html'
	})
	.when('/chat', {
		controller: 'ChatController',
		templateUrl: 'view/chat.html'
	})
	.otherwise({
		redirectTo: '/login'
	});
};

var MyApp = angular.module('MyApp', ["firebase"])
	.config(app_config)
	.directive('onFinishRender', function ($timeout) {
		return {
			restrict: 'A',
			link: function (scope, element, attr) {
				if (scope.$last === true) {
					$timeout(function () {
						scope.$emit('ngRepeatFinished');
					});
				}
			}
		};
	});

MyApp.controller('AppController',
	function($scope, CurrentUserModel){
		
		$scope.username = CurrentUserModel.username;

		$scope.$watch("username",function(newVal, oldVal){
			CurrentUserModel.username = newVal;
		});
	}
);

var MyApp = angular
	.module('MyApp', ["ngRoute", "ngAnimate", "firebase"])
	.config(function($routeProvider) {
		$routeProvider
			.when('/login', {
				controller: 'AppController',
				templateUrl: 'view/login.html'
			})
			.when('/chat', {
				controller: 'AppController',
				templateUrl: 'view/main.html'
			})
			.otherwise({
				redirectTo: '/login'
			});
	})
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
	})
	.controller('AppController',
		function($scope, $location, UserModel){
			
			$scope.users = {};
			UserModel.addScopeModel($scope, 'users');

			$scope.activeChat = "public";
			$scope.activePMUsername = "";
			$scope.username = UserModel.username;

			//If use is loggedIn, send them to Chat, otherwise to Login.
			$scope.$watch(function() { return $location.path(); }, function(newVal, oldVal){
				if(UserModel.loggedIn){
					$location.path('/chat');
				}else{
					$location.path('/login');
				}
			});
		}
	);


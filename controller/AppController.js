

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
		function($scope, $location, CurrentUserModel){
			
			$scope.activeChat = "public";

			//If use is loggedIn, send them to Chat, otherwise to Login.
			$scope.$watch(function() { return $location.path(); }, function(newValue, oldValue){
				if (! CurrentUserModel.getUser().loggedIn){
					$location.path('/login');
				}else{
					$location.path('/chat');
				}
			});
		}
	);


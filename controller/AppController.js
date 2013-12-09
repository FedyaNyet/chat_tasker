var MyApp = angular
	.module('MyApp', ["ngRoute", "ngAnimate", "firebase"])
	.config(function($routeProvider) {
		//Here is the logic that dictates which view to load, based on the url we specify
		$routeProvider
			.when('/login', {
				controller: 'AppController',
				templateUrl: 'view/login.html'
			})
			.when('/chat', {
				controller: 'AppController',
				templateUrl: 'view/main.html'
			})
			//always default to login when in doubt.
			.otherwise({
				redirectTo: '/login'
			});
	})
	.directive('onFinishRender', function ($timeout) {
		//This directive is used by ng-repeat to broadcaset to the scope, that it's finished rendering the view.
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
		//This is the parent controller for the entire app. All Other Controllers inherit it's scope.
		function($scope, $location, UserModel){
			
			$scope.users = {};
			UserModel.addScopeModel($scope, 'users');

			/**
			 * Using an object in the parent scope enables accessing and updating the parent scope variable without discociation in child controllers.
			 * @type appScope | contains only the 'activePublicChat' attribute that determines if the user is currently in the public or a private chat room.
			 */
			$scope.appScope = {
				activePublicChat: true,
			};

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



MyApp.controller('UserController',
	function ($scope, $location, $routeParams, CurrentUserModel, angularFire) {
		
		$scope.users = [];
		var ref = new Firebase("https://users-cs-701.firebaseio.com/");
		angularFire(ref, $scope, "users");

		$scope.showLogout = function(username){
			return username == CurrentUserModel.username;
		};

		$scope.logout = function(){
			$scope.users.splice($scope.$parent.user_index, 1);
			$location.path('/logout');
		};

		$scope.addUser = function(e){
			if (e.keyCode != 13 || $scope.$parent.username === "") return;
			CurrentUserModel.user_index = $scope.users.length;
			CurrentUserModel.loggedIn = true;
			
			$scope.users.push({username: CurrentUserModel.username});
			$location.path('/chat');
		};

	}
);
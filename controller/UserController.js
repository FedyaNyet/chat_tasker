
MyApp.controller('UserController',
	function ($scope, $location, CurrentUserModel, angularFire) {
		
		$scope.user = CurrentUserModel.getUser();

		$scope.users = {};
		var ref = new Firebase("https://usernames-cs-701.firebaseio.com/");
		angularFire(ref, $scope, "users");

		$scope.logout = function(){
			delete $scope.users[$scope.user.username];
			CurrentUserModel.logout();
			$location.path('/logout');
		};

		$scope.login = function(e){
			if (e.keyCode != 13 || $scope.user.username === "") return;
			CurrentUserModel.login();
			$scope.users[$scope.user.username] = $scope.user.username;
			$location.path('/chat');
		};

	}
);
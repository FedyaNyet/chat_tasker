
MyApp.controller('UserController',
	function ($scope, $location, CurrentUserModel) {
		
		$scope.logout = function(){
			CurrentUserModel.removeUser();
			$location.path('/logout');
		};

		$scope.login = function(e){
			if (e.keyCode != 13 || $scope.$parent.username === "") return;
			CurrentUserModel.setUser($scope.$parent.username);
			$location.path('/chat');
		};

	}
);
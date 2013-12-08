
MyApp.controller('UserController',
	function ($scope, $location, PrivateChatModel, UserModel) {

		$scope.username = "";
		$scope.privateChats = {};
		$scope.loginErrorMessage = null;

		PrivateChatModel.addScopeModel($scope, 'privateChats');

		$scope.getActiveChat = function(){
			return PrivateChatModel.activeChat;
		};

		$scope.hasChatHistory = function(username){
			convoId = PrivateChatModel.getConversationKey([UserModel.username, username]);
			if($scope.privateChats[convoId]){
				return true;
			}
			return false;
		};

		$scope.getChatColor = function(username){
			if($scope.activePMUsername === username){
				return "red";
			}
			return "";
		};

		$scope.userClicked = function(username){
			if(username === UserModel.username) return;
			$scope.activeChat = "private";
			$scope.activePMUsername = username;
		};

		$scope.logout = function(){
			UserModel.logout();
			$location.path('/login');
		};

		$scope.login = function(e){
			if (e.keyCode != 13 || $scope.username === "") return;
			UserModel.login(
				$scope.username,
				function(){
					$scope.loginErrorMessage = null;
					$location.path('/chat');
				},
				function(){
					$scope.loginErrorMessage = "Username Already Taken.";
				}
			);
		};

	}
);

MyApp.controller('UserController',
	function ($scope, $location, PrivateChatModel, UserModel) {

		$scope.username = UserModel.username;
		$scope.loginErrorMessage = null;
		$scope.privateChats = {};

		PrivateChatModel.bindAllPrivateChatModel($scope, 'privateChats');

		$scope.getActiveChat = function(){
			return PrivateChatModel.activeChat;
		};

		$scope.hasChatHistory = function(username){
			if(username === UserModel.username) return false;
			convoId = PrivateChatModel.getConversationKey([UserModel.username, username]);
			if($scope.privateChats[convoId]){
				return true;
			}
			return false;
		};

		$scope.getChatColor = function(username){
			if(PrivateChatModel.activeChatUsername === username){
				return "green";
			}
			return "";
		};

		$scope.userClicked = function(username){
			if(username === UserModel.username) return;
			$scope.appScope.activeChat = "private";
			PrivateChatModel.startConversation(username);
		};

		$scope.logout = function(){
			for(var username in $scope.users){
				if(username !== UserModel.username){
					var key = PrivateChatModel.getConversationKey([username, UserModel.username]);
					PrivateChatModel.closeConversation(key);
				}
			}
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
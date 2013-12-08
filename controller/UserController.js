
MyApp.controller('UserController',
	function ($scope, $location, PrivateChatModel, UserModel) {

		$scope.username = UserModel.username;
		$scope.loginErrorMessage = null;
		$scope.privateChats = {};

		PrivateChatModel.bindAllPrivateChatModel($scope, 'privateChats');


		$scope.$watch('privateChats',function(){
			for(var username in $scope.users){
				var convoHash = PrivateChatModel.getConversationKey([username, $scope.username]);
				if(!PrivateChatModel.viewedChatCounts[convoHash])
					PrivateChatModel.viewedChatCounts[convoHash] = 0;
			}
		});


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
			var hash = PrivateChatModel.getConversationKey([$scope.username, username]);
			var hasUnreads = Object.keys($scope.privateChats[hash]).length > PrivateChatModel.viewedChatCounts[hash];
			if(PrivateChatModel.activeChatUsername === username){
				return "green";
			}
			else if(hasUnreads){
				return "red";
			}
			return "";
		};

		$scope.userClicked = function(username){
			if(username === UserModel.username) return;
			$scope.appScope.activeChat = "private";
			PrivateChatModel.startConversation(username);
			//on running this controller, it means we've seen this conversation.
			if($scope.privateChats[PrivateChatModel.activeHash])
				PrivateChatModel.viewedChatCounts[PrivateChatModel.activeHash] = $scope.privateChats[PrivateChatModel.activeHash].length;
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
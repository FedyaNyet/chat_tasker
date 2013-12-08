
MyApp.controller('PrivateChatController',
	function ($scope, UserModel) {
		
		$scope.toUsername = "";
		$scope.newMessage = "";
		$scope.privateMessages = {};
		UserModel.addScopeModel($scope, 'privateMessages');

		$scope.hideConversation = function(username){
			ChatModel.startPublicChat(username);
		};

		$scope.endConversation = function(username){
			ChatModel.endPrivateChat(username);
		};

		$scope.sendMessage = function(e){
			if (e.keyCode != 13 || $scope.newMessage === "") return;
			var users = [CurrentUserModel.getUser().username,  $scope.toUsername];

			var convoId = PrivateChatModel.getConversationKey(users);
			if(!$scope.privateMessages[convoId])
				$scope.privateMessages[convoId] = [];
			$scope.privateMessages[convoId][$scope.privateMessages[convoId].length] = {
				sender: users.sort().indexOf(CurrentUserModel.getUser().username),
				message: $scope.newMessage
			};
			$scope.newMessage = "";
		};
	}
);
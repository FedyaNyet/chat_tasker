
MyApp.controller('PrivateChatController',
	function ($scope, angularFire, CurrentUserModel, ChatModel) {
		
		$scope.privateMessages = {};
		$scope.toUsername = ChatModel.toUsername;
		var ref = new Firebase("https://private-messages-cs-701.firebaseio.com/");
		angularFire(ref, $scope, "privateMessages");

		$scope.$watch(
			function(){return ChatModel.toUsername;},
			function(){$scope.toUsername = ChatModel.toUsername;}
		);

		$scope.showConversation = function(username){
			ChatModel.startPrivateChat(username);
		};

		$scope.hideConversation = function(username){
			ChatModel.startPublicChat(username);
		};

		$scope.endConversation = function(username){
			ChatModel.endPrivateChat(username);
		};

		$scope.sendMessage = function(){
			console.log('sendMessage');
			$scope.privateMessages.push({
				from:CurrentUserModel.getUser().username,
				to: $scope.toUsername,
				message: "test message"
			});
			CurrentUserModel.showPrivateMessage($scope.user.username, username);
		};


	}
);
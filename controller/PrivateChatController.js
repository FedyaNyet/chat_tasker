
MyApp.controller('PrivateChatController',
	function ($scope, UserModel, PrivateChatModel) {
		
		$scope.newMessage = "";
		$scope.activePrivateMessages = {};
		$scope.activeChatUsername = PrivateChatModel.activeChatUsername;
		$scope.activeHash = PrivateChatModel.activeHash;

		PrivateChatModel.bindActiveChatModel($scope, 'activePrivateMessages');

		$scope.hideConversation = function(){
			PrivateChatModel.hideConversation();
			$scope.newMessage = "";
			$scope.appScope.activeChat = "public";
		};

		$scope.getMessageSender = function(senderIndex){
			return PrivateChatModel.getMessageSenderUsername(senderIndex);
		};

		$scope.sendMessage = function(e){
			if (e.keyCode != 13 || $scope.newMessage === "") return;
			PrivateChatModel.sendMessage({
				sender: PrivateChatModel.getCurrentUserIndex(),
				message: $scope.newMessage
			});
			$scope.newMessage = "";
		};
	}
);
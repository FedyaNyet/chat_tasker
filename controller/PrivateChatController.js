
MyApp.controller('PrivateChatController',
	function ($scope, UserModel, PrivateChatModel) {
		
		$scope.newMessage = "";
		$scope.activePrivateMessages = {};
		$scope.isActive = PrivateChatModel.isActive;
		$scope.activeChatUsername = PrivateChatModel.activeChatUsername;
		$scope.activeHash = PrivateChatModel.activeHash;


		$scope.$watch(function(){return  PrivateChatModel.isActive; },function(){ $scope.isActive = PrivateChatModel.isActive; });

		//function pointer to remove angularFireConnection;
		var discociatePrivateChat;

		var activePrivateMessagesBinding = PrivateChatModel.bindActiveChatModel($scope, 'activePrivateMessages');
		activePrivateMessagesBinding.then(function(disassociate) {
			discociatePrivateChat = disassociate;
		});

		$scope.$watch('activePrivateMessages',function(newVal, oldVal){
			if(!Object.keys(newVal).length && Object.keys(oldVal).length){
				discociatePrivateChat();
				PrivateChatModel.isActive = false;
				$scope.activePrivateMessages = oldVal;
			}
			var convoKey = PrivateChatModel.getConversationKey([UserModel.username, PrivateChatModel.activeChatUsername]);
			PrivateChatModel.viewedChatCounts[convoKey] = Object.keys(newVal).length;
		});

		$scope.hideConversation = function(){
			$scope.newMessage = "";
			PrivateChatModel.hideConversation();
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
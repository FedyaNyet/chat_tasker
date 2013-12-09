
MyApp.controller('PrivateChatController',
	function ($scope, UserModel, PrivateChatModel) {
		
		$scope.newMessage = "";
		$scope.activePrivateMessages = {};
		//Keep track of the public chat conversation.
		$scope.isActive = PrivateChatModel.isActive;
		$scope.activeChatUsername = PrivateChatModel.activeChatUsername;
		$scope.activeHash = PrivateChatModel.activeHash;


		//Syncronize the PrivateChatModel's isActive state with the scope to display in the view.
		$scope.$watch(function(){return  PrivateChatModel.isActive; },function(){ $scope.isActive = PrivateChatModel.isActive; });

		//function pointer to remove angularFireConnection;
		//function pointer to remove angularFireConnection; (This will be called when a chat partner leave the chat, but the local chat convo shouldn't we wiped out.)
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

		//change the app's chat scope, to view the public chat.
		$scope.hideConversation = function(){
			$scope.newMessage = "";
			PrivateChatModel.hideConversation();
			$scope.appScope.activePublicChat = true;
		};

		//becuase only the index of the sender is stored, a trnasaltion to the username must be made.
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
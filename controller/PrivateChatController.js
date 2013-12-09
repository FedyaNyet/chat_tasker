
MyApp.controller('PrivateChatController',
	function ($scope, $timeout, UserModel, PrivateChatModel) {

		$scope.chatHeight = 0;
		$scope.messages = {};
		$scope.newMessage = "";

		//Keep track of the public chat conversation.
		$scope.isActive = PrivateChatModel.isActive;
		$scope.activeChatUsername = PrivateChatModel.activeChatUsername;
		$scope.activeHash = PrivateChatModel.activeHash;

		//Syncronize the PrivateChatModel's isActive state with the scope to display in the view.
		$scope.$watch(function(){return  PrivateChatModel.isActive; },function(){ $scope.isActive = PrivateChatModel.isActive; });

		//function pointer to remove angularFireConnection; (This will be called when a chat partner leave the chat, but the local chat convo shouldn't we wiped out.)
		var discociatePrivateChat;

		if(!$scope.appScope.activePublicChat)
			PrivateChatModel.bindActiveChatModel($scope, 'messages').then(function(disassociate) {
				discociatePrivateChat = disassociate;
			});

		$scope.$watch('messages', function(newVal, oldVal){
			if(!Object.keys(newVal).length && Object.keys(oldVal).length){
				discociatePrivateChat();
				PrivateChatModel.isActive = false;
				$scope.messages = oldVal;
			}
			var convoKey = PrivateChatModel.getConversationKey([UserModel.username, PrivateChatModel.activeChatUsername]);
			PrivateChatModel.viewedChatCounts[convoKey] = Object.keys(newVal).length;
			$timeout(function(){
				$scope.chatHeight = 0;
				$('ul.messageOut li').each(function(){
					$scope.chatHeight += $(this).outerHeight();
				});
			});
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

		$scope.addMessage = function(e){
			if (e.keyCode != 13 || $scope.newMessage === "") return;
			PrivateChatModel.sendMessage({
				sender: PrivateChatModel.getCurrentUserIndex(),
				message: $scope.newMessage
			});
			$scope.newMessage = "";
			$scope.scrollChatDown();
		};

		//scroll down to bottom of chat screen when the page loads.
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$scope.scrollChatDown($scope.chatHeight);
		});

		$scope.scrollChatDown = function(){
			$('ul.messageOut').scrollTop($scope.chatHeight+20);
		};
	}
);
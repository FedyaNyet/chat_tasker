
MyApp.controller('PrivateChatController',
	function ($scope, UserModel, PrivateChatModel) {
		
		$scope.newMessage = "";
		$scope.activeHash = PrivateChatModel.getConversationKey([UserModel.username,  $scope.$parent.activePMUsername]);
		$scope.allPrivateMessages = {};
		PrivateChatModel.addScopeModel($scope, 'allPrivateMessages');

		$scope.hideConversation = function(){
			$scope.newMessage = "";
			$scope.activeHash = "";
			$scope.$parent.activeChat = "public";
		};

		$scope.getMessageSender = function(senderIndex){
			return getSortedUsers()[senderIndex];
		};

		getSortedUsers = function(){
			userOne = UserModel.username;
			userTwo = $scope.$parent.activePMUsername;
			return ([userOne, userTwo]).sort();
		};

		$scope.sendMessage = function(e){
			if (e.keyCode != 13 || $scope.newMessage === "") return;
			if(!$scope.allPrivateMessages[$scope.activeHash]){
				$scope.allPrivateMessages[$scope.activeHash] = [];
			}
			var convoLength = $scope.allPrivateMessages[$scope.activeHash].length;
			$scope.allPrivateMessages[$scope.activeHash][convoLength] = {
				sender: getSortedUsers().indexOf(UserModel.username),
				message: $scope.newMessage
			};
			$scope.newMessage = "";
		};
	}
);
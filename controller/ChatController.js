
MyApp.controller('ChatController',
	function ($scope, $timeout,  angularFire, UserModel, PublicChatModel) {
		
		//Keep track of the public chat conversation.
		$scope.chat_height = 0;

		$scope.newMessage = "";
		$scope.messages = {};
		PublicChatModel.addScopeModel($scope, 'messages');

		//update the chat_height when a new message is added.
		$scope.$watch('messages',function(){
			$timeout(function(){
				$('ul.messageOut li').each(function(){
					$scope.chat_height += $(this).outerHeight();
				});
			});
		});

		//scroll down to bottom of chat screen when the page loads.
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$scope.scrollChatDown();
		});

		//scroll down the chat when you post a new message.
		$scope.addMessage = function(e){
			if (e.keyCode != 13 || $scope.newMessage === "") return;
			PublicChatModel.addMessage({from: UserModel.username, body: $scope.newMessage});
			$scope.newMessage = "";
			$scope.scrollChatDown();
		};

		$scope.scrollChatDown = function(){
			$('ul.messageOut').scrollTop($scope.chat_height);
		};
    }
);
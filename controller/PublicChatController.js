
MyApp.controller('PublicChatController',
	function ($scope, $timeout,  angularFire, UserModel, PublicChatModel) {
		
		$scope.chatHeight = 0;
		$scope.messages = [];
		$scope.newMessage = "";

		//Keep track of the public chat conversation.
		PublicChatModel.addScopeModel($scope, 'messages');

		//Add the new message, and scroll the chat down & down the chat when you post a new message.
		$scope.addMessage = function(e){
			if (e.keyCode != 13 || $scope.newMessage === "") return;
			$scope.messages.push({from: UserModel.username, body: $scope.newMessage});
			$scope.newMessage = "";
			$scope.scrollChatDown();
		};

		$scope.$watch('messages',function(){
			$timeout(function(){
				$scope.chatHeight = 0;
				$('ul.messageOut li').each(function(){
					$scope.chatHeight += $(this).outerHeight();
				});
			});
		});

		//scroll down to bottom of chat screen when the page loads.
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$scope.scrollChatDown($scope.chatHeight);
		});

		$scope.scrollChatDown = function(){
			$('ul.messageOut').scrollTop($scope.chatHeight);
		};
    }
);
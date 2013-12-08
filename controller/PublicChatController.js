
MyApp.controller('PublicChatController',
	function ($scope, $timeout,  angularFire, UserModel, PublicChatModel) {
		
		//This enables chat to scroll down only after a newMessage is added, OR the page is loaded... (not on newMessage keydown)
		$scope.chat_height = 0;

		$scope.newMessage = "";
		$scope.messages = {};
		$scope.privateMessages = {};
		PublicChatModel.addScopeModel($scope, 'messages');

		$scope.addMessage = function(e){
			if (e.keyCode != 13 || $scope.newMessage === "") return;
			PublicChatModel.addMessage({from: UserModel.username, body: $scope.newMessage});
			$scope.newMessage = "";
			$scope.scrollChatDown();
		};

		$scope.$watch('messages',function(){
			$timeout(function(){
				$('ul.messageOut li').each(function(){
					$scope.chat_height += $(this).outerHeight();
				});
			});
		});

		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$scope.scrollChatDown();
		});

		$scope.scrollChatDown = function(){
			$('ul.messageOut').scrollTop($scope.chat_height);
		};
    }
);
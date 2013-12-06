
MyApp.controller('PublicChatController',
	function ($scope, $timeout,  angularFire, CurrentUserModel, ChatModel) {
		
		//This enables chat to scroll down only after a newMessage is added, OR the page is loaded... (not on newMessage keydown)
		$scope.chat_height = 0;

		$scope.newMessage = "";
		$scope.messages = [];
		var ref = new Firebase("https://messages-cs-701.firebaseio.com/");
		angularFire(ref, $scope, "messages");

		$scope.addMessage = function(e){
			if (e.keyCode != 13 || $scope.newMessage === "") return;
			$scope.messages.push({from: CurrentUserModel.getUser().username, body: $scope.newMessage});
			$scope.newMessage = "";
			$scope.scrollChatDown();
		};

		$scope.$watch('messages',function(){
			$timeout(function(){
				$('#chat ul li').each(function(){
					$scope.chat_height += $(this).outerHeight();
				});
			});
		});

		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$scope.scrollChatDown();
		});

		$scope.scrollChatDown = function(){
			$('#chat ul').scrollTop($scope.chat_height);
		};
    }
);
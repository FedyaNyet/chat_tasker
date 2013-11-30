
MyApp.controller('ChatController',
	function ($scope, $timeout, $location, $routeParams, CurrentUserModel, angularFire) {
		
		//This makes it so that the chat scrolls down only when a new Message is added, OR the page is loaded... (not on newMessage change)
		$scope.chat_height = 0;

		$scope.newMessage = "";
		$scope.messages = [];
		var ref = new Firebase("https://messages-cs-701.firebaseio.com/");
		angularFire(ref, $scope, "messages");

		$scope.addMessage = function(e){
			if (e.keyCode != 13) return;
			$scope.messages.push({from: CurrentUserModel.username, body: $scope.newMessage});
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


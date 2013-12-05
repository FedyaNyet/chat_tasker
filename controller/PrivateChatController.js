
MyApp.controller('PrivateChatController',
	function ($scope, $location, CurrentUserModel, angularFire) {
		
		$scope.privateMessages = {};
		$scope.toUsername = ""
		var ref = new Firebase("https://private-messages-cs-701.firebaseio.com/");
		angularFire(ref, $scope, "privateMessages");

		

		$scope.showConversation = function(username){
			console.log('showConversation:'+username);
			$scope.$parent.activeChat = "private";
			$scope.toUsername = username;
		}

		$scope.hideConversation = function(){
			console.log('hideConversation');
			$scope.$parent.activeChat = "public";
		}

		$scope.endConversation = function(){
			console.log('endConversation');
			$scope.$parent.activeChat = "public";
		}

		$scope.sendMessage = function(){
			console.log('sendMessage');
			$scope.privateMessages.push({
				from:CurrentUserModel.getUser().username,
				to: $scope.toUsername,
				message: "test message"
			});
			CurrentUserModel.showPrivateMessage($scope.user.username, username);
		}


	}
);
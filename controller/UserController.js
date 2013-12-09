
MyApp.controller('UserController',
	function ($scope, $location, $timeout, PrivateChatModel, UserModel) {

		$scope.username = UserModel.username;
		$scope.loginErrorMessage = null;
		$scope.privateChats = {};

		PrivateChatModel.bindAllPrivateChatModel($scope, 'privateChats');

		//This keeps track of how many private messages each user has received.
		$scope.$watch('privateChats',function(){
			for(var username in $scope.users){
				var convoHash = PrivateChatModel.getConversationKey([username, $scope.username]);
				if(!PrivateChatModel.viewedChatCounts[convoHash])
					PrivateChatModel.viewedChatCounts[convoHash] = 0;
			}
		});

		/**
		 * Check if the current user has an active conversation with supplied username.
		 * @param  {String}  username | username of chat participant. (not current user's)
		 * @return {Boolean}          | If the conversation exists.
		 */
		$scope.hasChatHistory = function(username){
			if(username === UserModel.username) return false;
			convoId = PrivateChatModel.getConversationKey([UserModel.username, username]);
			if($scope.privateChats[convoId]){
				return true;
			}
			return false;
		};

		/**
		 * Returns the color of the chat icon to display next to a users name
		 * @param  {String} username | The username for which to return the status of the conversatin with the current user.
		 * @return {String}          | The a color (blue, green, red) or empty string.
		 */
		$scope.getChatColor = function(username){
			var hash = PrivateChatModel.getConversationKey([$scope.username, username]);
			var hasUnreads = Object.keys($scope.privateChats[hash]).length > PrivateChatModel.viewedChatCounts[hash];
			if(PrivateChatModel.activeChatUsername === username){
				if(!PrivateChatModel.isActive){
					return "blue";
				}
				return "green";
			}
			else if(hasUnreads){
				return "red";
			}
			return "";
		};

		/**
		 * This action set the application's scope.appScope.activePublicChat to true and starts the private conversation by updating the PrivateChatModel.
		 * @param  {String} username | The user that was clicked.
		 */
		$scope.userClicked = function(username){
			if(username === UserModel.username) return;
			PrivateChatModel.hideConversation();
			$scope.appScope.activePublicChat = true;//switch back to public context.
			$timeout(function(){
				$scope.appScope.activePublicChat = false;
				PrivateChatModel.startConversation(username);
				//on running this controller, it means we've seen this conversation.
				if($scope.privateChats[PrivateChatModel.activeHash])
					PrivateChatModel.viewedChatCounts[PrivateChatModel.activeHash] = $scope.privateChats[PrivateChatModel.activeHash].length;
			});
			
		};

		/**
		 * Removes the current user from the firebase database. And navigates the user to the login screen.
		 */
		$scope.logout = function(){
			for(var username in $scope.users){
				if(username !== UserModel.username){
					var key = PrivateChatModel.getConversationKey([username, UserModel.username]);
					PrivateChatModel.closeConversation(key);
				}
			}
			PrivateChatModel.hideConversation();
			UserModel.logout();
			$location.path('/login');
		};

		/**
		 * The function checks if the username already exists and if it does, sets $scope.loginErrorMessage. If successful, redirectes the user to /chat
		 * @param  {Event} e | The keypress event on the username input on the login screen.
		 */
		$scope.login = function(e){
			if (e.keyCode != 13 || $scope.username === "") return;
			UserModel.login(
				$scope.username,
				function(){
					$scope.loginErrorMessage = null;
					$location.path('/chat');
				},
				function(){
					$scope.loginErrorMessage = "Username Already Taken.";
				}
			);
		};

	}
);
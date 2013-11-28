
MyApp.controller('ChatController',
	function ($scope, $location, $routeParams, CurrentUserModel, angularFire) {
		
		$scope.msg = "";
		$scope.messages = [];
		var ref = new Firebase("https://messages-cs-701.firebaseio.com/");
		angularFire(ref, $scope, "messages");

		$scope.addMessage = function(e){
			if (e.keyCode != 13) return;
			$scope.messages.push({from: CurrentUserModel.username, body: $scope.msg});
			$scope.msg = "";
		};

		$scope.$on('ngRepeatFinished', function(){
			scrollChatDown();
		});

		$scope.$watch('messages',function(oldVal, newVal){
			scrollChatDown();
		},true);

		$scope.$watch(function() { return $location.path(); }, function(newValue, oldValue){
			if (! CurrentUserModel.loggedIn){
				$location.path('/login');
			}
		});
    }
);


function scrollChatDown(){
	var list = $('#messageOut ul');
	list.scrollTop(list.height());
}

MyApp.controller('TaskController',
	function ($scope, CurrentUserModel, angularFire) {
		
		$scope.newTask = "";
		$scope.tasks = [];
		var ref = new Firebase("https://tasks-cs-701.firebaseio.com/");
		angularFire(ref, $scope, "tasks");

		$scope.getClass = function($task){
			if($task.checked){
				return "line-through";
			}
			return "";
		};

		$scope.removeTask = function($index){
			$scope.tasks.splice($index, 1);
		};

		$scope.addTask = function(e){
			if (e.keyCode != 13 || $scope.newTask === "") return;
			$scope.tasks.splice(0, 0, {checked:false, text:$scope.newTask});
			$scope.newTask = "";
		};
	}
);
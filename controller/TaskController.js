
MyApp.controller('TaskController',
	function ($scope, angularFire) {
		
		$scope.newTask = "";
		$scope.tasks = [];
		var ref = new Firebase("https://tasks-cs-701.firebaseio.com/");
		angularFire(ref, $scope, "tasks");

		/**
		 * Returns if the item should have line-through or not.
		 * @param  {Object} $task | The task being updated.
		 * @return {String}       | "line-through" if task is checked, "" otherwise.
		 */
		$scope.getClass = function($task){
			if($task.checked){
				return "line-through";
			}
			return "";
		};

		/**
		 * Splices the scope's tasks array and removes the task object.
		 * @param  {int} $index |Index of the object being removed
		 */
		$scope.removeTask = function($index){
			$scope.tasks.splice($index, 1);
		};

		/**
		 * prepends the task to the scope's tasks array.
		 * @param {Event} e | The key up event. Insertion happends on Enter, when newTask is a none empty string.
		 */
		$scope.addTask = function(e){
			if (e.keyCode != 13 || $scope.newTask === "") return;
			$scope.tasks.splice(0, 0, {checked:false, text:$scope.newTask});
			$scope.newTask = "";
		};
	}
);
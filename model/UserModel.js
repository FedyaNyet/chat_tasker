
MyApp.service('UserModel',
	function(angularFire){

		var _url = "https://usernames-cs-701.firebaseio.com/";
		var _ref = new Firebase(_url);

		UserModel = this;

		this.username= null;
		this.loggedIn= false;
		this.loginTime = null;

		/**
		 * Bind the modelName to the supplied scope with firebase data.
		 * @param {$scope} scope     | The scope contining the modelName being bound.
		 * @param {String} modelName | name of the model being bound to firebase data.
		 */
		this.addScopeModel= function(scope, modelName){
			return angularFire(_ref, scope, modelName);
		};

		/**
		 * Check the login status of a user. Does nothing if callbacks arn't supplied.
		 * @param  {Function|optional} isNotLogged | Callback function if the user is not logged in.
		 * @param  {Function|optional} isLoggedIn  | Callback function if the user is logged in.
		 */
		this.checkLogin= function(isNotLogged, isLoggedIn){
			return _ref.child(UserModel.username).once('value', function(snapshot) {
				if (snapshot.val() === null && typeof(isNotLogged) == "function") {
					isNotLogged();
				}else if(typeof(isLoggedIn) == "function"){
					isLoggedIn();
				}
			});
		};

		/**
		 * Returns the user for the supplied username.
		 * @param  {String} username | username of the user object being fetched.
		 * @return {Object}          | If exists, and Object containing {username, loggedIn, loginTime}, otherwise undefined.
		 */
		this.getUser= function(username){
			if(!username || username === "") return false;
			return (new firebase(_url)).child(username);
		};

		/**
		 * Removes the current user from firebase and updates the UserModel object.
		 */
		this.logout= function(){
			if(UserModel.username) (new Firebase(_url + UserModel.username)).remove();
			UserModel.username = null;
			UserModel.loggedIn = false;
		};

		/**
		 * Adds user to firebase and update the UserModel attributes username,loggedIn,loginTime
		 * @param  {String} username 	| The username to be logged into the app.
		 * @param  {function} success 	| Callback function if successfully logged in.
		 * @param  {function} error   	| Callback function if error logging in.
		 */
		this.login= function(username, success, error){
			UserModel.username = username;
			UserModel.checkLogin(
				function(){
					var time = (new Date()).getTime();
					_ref.child(username).set({username: username, loggedIn: true, loginTime: time});
					UserModel.loggedIn = true;
					UserModel.loginTime = time;
					if (typeof(success) == "function") { success();}
					
				},
				function(){
					UserModel.username = null;
					UserModel.loggedIn = false;
					UserModel.loginTime = null;
					if (typeof(error) == "function") { error();}
				}
			);
		};
		
		/**
		 * Removes all the user from the application's firebase database.
		 */
		this.clearUsers= function(){
			_ref.remove();
		};

	}
);

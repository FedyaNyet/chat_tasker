
MyApp.service('UserModel',
	function(angularFire){

		var _url = "https://usernames-cs-701.firebaseio.com/";
		var _ref = new Firebase(_url);

		UserModel = this;

		this.username= null;
		this.loggedIn= false;

		this.addScopeModel= function(scope, modelName){
			return angularFire(_ref, scope, modelName);
		};
		this.checkLogin= function(isLoggeding, isNotLoggedIn){
			return _ref.child(UserModel.username).once('value', function(snapshot) {
				if (snapshot.val() === null && typeof(isLoggeding) == "function") {
					isLoggeding();
				}else if(typeof(isNotLoggedIn) == "function"){
					isNotLoggedIn();
				}
			});
		};
		this.logout= function(){
			if(UserModel.username) (new Firebase(_url + UserModel.username)).remove();
			UserModel.username = null;
			UserModel.loggedIn = false;
		};
		this.login= function(username, success, error){
			UserModel.username = username;
			UserModel.checkLogin(
				function(){
					_ref.child(username).set({username: username, loggedIn: true});
					UserModel.loggedIn = true;
					if (typeof(success) == "function") { success();}
					
				},
				function(){
					UserModel.username = null;
					UserModel.loggedIn = false;
					if (typeof(error) == "function") { error();}
				}
			);
		};
		this.clearUsers= function(){
			_ref.remove();
		};

	}
);

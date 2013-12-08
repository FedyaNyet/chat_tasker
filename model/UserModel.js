
MyApp.service('UserModel',
	function(angularFire){

		var _url = "https://usernames-cs-701.firebaseio.com/";
		var _ref = new Firebase(_url);

		var UserModel = {
			username: null,
			loggedIn: false,
			addScopeModel: function(scope, modelName){
				return angularFire(_ref, scope, modelName);
			},
			checkLogin: function(isLoggeding, isNotLoggedIn){
				return _ref.child(UserModel.username).once('value', function(snapshot) {
					if (snapshot.val() === null && typeof(isLoggeding) == "function") {
						isLoggeding();
					}else if(typeof(isNotLoggedIn) == "function"){
						isNotLoggedIn();
					}
				});
			},
			logout: function(){
				if(UserModel.username) (new Firebase(_url + UserModel.username)).remove();
				UserModel.username = null;
				UserModel.loggedIn = false;
			},
			login: function(username, success, error){
				UserModel.username = username;
				this.checkLogin(
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
			},
			clearUsers: function(){
				_ref.remove();
			}
		};

		return UserModel;
	}
);

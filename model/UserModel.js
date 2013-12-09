
MyApp.service('UserModel',
	function(angularFire){

		var _url = "https://usernames-cs-701.firebaseio.com/";
		var _ref = new Firebase(_url);

		UserModel = this;

		this.username= null;
		this.loggedIn= false;
		this.loginTime = null;

		this.addScopeModel= function(scope, modelName){
			return angularFire(_ref, scope, modelName);
		};
		this.checkLogin= function(isNotLogged, isLoggedIn){
			return _ref.child(UserModel.username).once('value', function(snapshot) {
				if (snapshot.val() === null && typeof(isNotLogged) == "function") {
					isNotLogged();
				}else if(typeof(isLoggedIn) == "function"){
					isLoggedIn();
				}
			});
		};
		this.getUser= function(username){
			if(!username || username === "") return false;
			return (new firebase(_url)).child(username);
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
		this.clearUsers= function(){
			_ref.remove();
		};

	}
);

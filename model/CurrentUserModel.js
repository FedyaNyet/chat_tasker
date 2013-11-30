/**
 * This service Model is reponsible for handeling the current user's state
 *
 * @attribute loggedIn: (True/False)[default:""] If the CurrentUserModel is logged in or not.
 * @attribute username: (String)[default:""] The CurrentUserModel username.
 *
 * @function setUser(String $username): Sets the CurrentUserModel username, logges the model in, and saves it localStorage.
 * @function getUser(): Returns a CurrentUserModel instance and preopulates it with data from localStorage if possible.
 * @function removeUser(): Removes the localStorage data and logges the CurrentUserModel out.
 */

MyApp.service('CurrentUserModel',
	function(){

		this.loggedIn = false;
		this.username = "";

		this.getUser = function(){
			if(localStorage.getItem('CurrentUserModel')){
				user = JSON.parse(localStorage.getItem('CurrentUserModel'));
				this.setUser(user.username);
			}
			return this;
		};

		this.setUser = function($username){
			localStorage.setItem('CurrentUserModel',JSON.stringify({
				loggedIn: true,
				username: $username
			}));
			this.loggedIn = true;
			this.username = $username;
		};

		this.removeUser = function(){
			localStorage.removeItem('CurrentUserModel');
			this.loggedIn = false;
			this.username = "";
		};
	}
);
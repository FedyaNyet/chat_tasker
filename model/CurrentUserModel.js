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

		this.username = "";
		this.loggedIn = false;

		this.getUser = function(){
			return this;
		};

		this.login = function(){
			this.loggedIn = true;
		};

		this.logout = function(){
			this.username = "";
			this.loggedIn = false;
		};

		this.showPrivateMessage = function(sender, receiver){
			if(this.username == receiver){
				console.log('message from:'+sender);
			}
		}
	}
);
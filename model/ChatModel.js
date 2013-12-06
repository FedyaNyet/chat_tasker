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

MyApp.service('ChatModel',
	function(){

		this.activeChat = "public";
		this.toUsername = null;

		this.startPublicChat = function(){
			this.toUsername = null;
			this.activeChat = "public";
			return this;
		};

		this.startPrivateChat = function(username){
			//start local storage with chat info.
			this.toUsername = username;
			this.activeChat = "private";
			return this;
		};

		this.endPrivateChat = function(username){
			//remove from local storage.
			this.startPublicChat();
			return this;
		};

	}
);
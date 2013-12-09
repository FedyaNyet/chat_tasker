
MyApp.service('PrivateChatModel',
	function(angularFire, UserModel){

		var _url = "https://private-messages-cs-701.firebaseio.com/";
		
		this.activeHash = null;
		this.activeChatUsername = null;
		this.viewedChatCounts = {};
		this.isActive = false;

		//Used by UserController to keep track of all the private conversations and notifying users when they receive PMs
		this.bindAllPrivateChatModel= function(scope, modelName){
			return angularFire(new Firebase(_url), scope, modelName);
		};

		//Used by PrivateChatController to track the started private conversation
		this.bindActiveChatModel = function(scope, modelName){
			return angularFire(new Firebase(_url).child(this.activeHash), scope, modelName);
		};

		/**
		 * This function returns the username for the suplied index of the the user in a conversation.
		 * @param  {Integer} userIndex | The index of the username.
		 * @return {String}            | The username of the private chat pariticipant at index userIndex, when participants are sorted alphabetically.
		 */
		this.getMessageSenderUsername = function(userIndex){
			var user1 = UserModel.username;
			var user2 = this.activeChatUsername;
			return ([user1, user2]).sort()[userIndex];
		};

		/**
		 * Returns the index for the current user in the chat. This is based on an alphetical soring of the user.
		 * @return {Integer} | user's position in a sorted array of participants in the private conversation.
		 */
		this.getCurrentUserIndex = function(){
			var user1 = UserModel.username;
			var user2 = this.activeChatUsername;
			return ([user1, user2]).sort().indexOf(UserModel.username);
		};

		/**
		 * removes the conversation from Firebase db.
		 * @param  {String} key | The unique key of the conversation being deleted.
		 */
		this.closeConversation = function(key){
			if(key !== "")(new Firebase( _url + key )).remove();
		};

		/**
		 * Starts the conversation between a supplied user, and UserModel's username.
		 * @param  {String} activeChatUsername | The username with which the current user is starting the conversation with.
		 */
		this.startConversation = function(activeChatUsername){
			this.activeChatUsername = activeChatUsername;
			var user1 = UserModel.username;
			var user2 = this.activeChatUsername;
			this.activeHash = this.getConversationKey([user1, user2]);
			this.viewedChatCounts[this.activeHash] = 0;
			this.isActive = true;
		};

		/**
		 * Unsets the Model's fields.
		 */
		this.hideConversation = function(){
			this.isActive = false;
			this.activeHash = null;
			this.activeChatUsername = null;
		};

		/**
		 * Returns a unique key for the participant usernames.
		 * @param  {Array} users | A list of usernamesfor which to genenrate a key.
		 * @return {String}      | A key defining the conversation.
		 */
		this.getConversationKey = function(users){
			return JSON
				.stringify(users.sort())
				.split("")
				.reduce(function(a,b){
					a=((a<<5)-a)+b.charCodeAt(0);
					return a&a;
				},0);
		};
	}
);


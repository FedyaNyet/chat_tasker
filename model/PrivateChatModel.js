

MyApp.service('PrivateChatModel',
	function(angularFire, UserModel){

		var _url = "https://private-messages-cs-701.firebaseio.com/";
		
		this.activeHash = null;
		this.activeChatUsername = null;
		this.viewedChatCounts = {};
		this.isActive = false;

		this.bindAllPrivateChatModel= function(scope, modelName){
			return angularFire(new Firebase(_url), scope, modelName);
		};

		this.bindActiveChatModel = function(scope, modelName){
			return angularFire(new Firebase(_url+this.activeHash), scope, modelName);
		};

		this.sendMessage = function(message){
			(new Firebase(_url)).child(this.activeHash).push().set(message);
		};

		this.getCurrentUserIndex = function(){
			var user1 = UserModel.username;
			var user2 = this.activeChatUsername;
			return ([user1, user2]).sort().indexOf(UserModel.username);
		};

		this.closeConversation = function(key){
			if(key !== "")(new Firebase( _url + key )).remove();
		};

		this.getMessageSenderUsername = function(userIndex){
			var user1 = UserModel.username;
			var user2 = this.activeChatUsername;
			return ([user1, user2]).sort()[userIndex];
		};

		this.startConversation = function(activeChatUsername){
			this.activeChatUsername = activeChatUsername;
			var user1 = UserModel.username;
			var user2 = this.activeChatUsername;
			this.activeHash = this.getConversationKey([user1, user2]);
			this.viewedChatCounts[this.activeHash] = 0;
			this.isActive = true;
			console.log('convo started');
		};

		this.hideConversation = function(){
			this.isActive = false;
			this.activeHash = null;
			this.activeChatUsername = null;
		};

		// this.deleteConversation = function(){
		// 	console.log("PrivateChatModel.deleteConversation");
		// 	if (this.activeHash){
		// 		(new Firebase(_url + this.activeHash )).remove();
		// 		this.viewedChatCounts[this.activeHash] = 0;
		// 	}
		// 	this.hideConversation();
		// };

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


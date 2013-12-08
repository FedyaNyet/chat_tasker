

MyApp.service('PrivateChatModel',
	function(angularFire){

		var _url = "https://private-messages-cs-701.firebaseio.com/";
		var _ref = new Firebase(_url);

		return {
			addScopeModel: function(scope, modelName){
				return angularFire(_ref, scope, modelName);
			},
			addMessage: function(message){
				_ref.push(message);
			},
			getConversationKey: function(users){
				var hash = JSON
					.stringify(users.sort())
					.split("")
					.reduce(function(a,b){
						a=((a<<5)-a)+b.charCodeAt(0);
						return a&a;
					},0);
				return hash;
			}
		}
		;
	}
);


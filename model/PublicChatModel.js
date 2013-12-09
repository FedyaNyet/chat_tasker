

MyApp.service('PublicChatModel',
	function(angularFire){

		var _url = "https://messages-cs-701.firebaseio.com/";
		var _ref = new Firebase(_url);

		return {
			addScopeModel: function(scope, modelName){
				return angularFire(_ref, scope, modelName);
			},
			removeAllMessages: function(){
				(new Firebase( _url )).remove();
			}
		};
	}
);



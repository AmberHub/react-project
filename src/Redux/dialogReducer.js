const dialogReducer = (state, action) => {

	switch (action.type) {

		case "ADD-MESSAGE" : 
			let message = { 
				message : state.textMessageValue
			};
			state.DialogMessageData.push(message);
			state.textMessageValue = '';
			return state;

		case "CHANGE-MESSAGE-LETTER" : 
			state.textMessageValue = action.text;
			return state;

		default : 
			return state;
	};

};

export default dialogReducer;
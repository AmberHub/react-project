const profileReducer = (state, action) => {

	switch (action.type) {

		case "ADD-POST" : 
			let post = { 
				message :  state.textPostValue
			};
			state.PostsData.push(post);
			state.textPostValue = '';
			return state;

		case "CHANGE-POST-LETTER" : 
			state.textPostValue = action.text;
			return state;

		default :
			return state;
	};

};


export default profileReducer;
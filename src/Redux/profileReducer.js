let initialState = {

			PostsData : [
			{message:"Hi"},
			{message:"I have a problem"},
			{message:"I'm your socnet"},
			{message:"And now I'm sucks"} ],

			textPostValue : "",

}





const profileReducer = (state=initialState, action) => {

	let stateCopy = {...state};

	switch (action.type) {

		case "ADD-POST" : 
			let body = state.textPostValue;
			return {
				...state,
				PostsData: [...state.PostsData, {message :  body}],
				textPostValue: ''
			};
		case "CHANGE-POST-LETTER" : 
		return {
			...state,
			textPostValue: action.text
		}
		default :
			return state;
	};

};


export default profileReducer;
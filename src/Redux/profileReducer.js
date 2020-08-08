let initialState = {

	profileData : null,
	PostsData : [{message:"Hi"}],
	textPostValue : "",
	isFetching : false
}


const profileReducer = (state=initialState, action) => {


	switch (action.type) {

		case "ADD_POST" : 
			let body = state.textPostValue;
			return {
				...state,
				PostsData: [...state.PostsData, {message :  body}],
				textPostValue: ''
			};

		case "CHANGE_POST_LETTER" : 
		return { ...state, textPostValue: action.text };

		case "SET_PROFILE" : 
		return {...state, profileData: action.data};

		case "FETCHING" : 
		return {...state, isFetching: !state.isFetching};

		default : return state;
	};

};


export default profileReducer;
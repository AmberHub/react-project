import { profileAPI } from "./../API/api.js";
import { updateProfile, fetching, setStatus, updateStatus } from "./actionCreators.js";



let initialState = {

	profileData : null,
	PostsData : [{message:"Hi"}],
	textPostValue : "",
	isFetching : false,
	status : ""
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

		case "SET_STATUS" :
		return {...state, status: action.status}

		default : return state;
	};

};


export let setProfileTC = (userId, isAuth, myId) => (dispatch) => {
	dispatch(fetching());
    if (!userId && isAuth) {
      userId = myId;
    };
	profileAPI.setProfile(userId).then( data => {
      dispatch(updateProfile(data))});
      dispatch(fetching());
}

export let setStatusTC = (userId) => (dispatch) => {
	profileAPI.getStatus(userId).then( status => {
      dispatch(setStatus(status))});
}

export let updateStatusTC = (status) => (dispatch) => {
	profileAPI.updateStatus(status).then( data => { 
		if(data.resultCode === 0) {
			dispatch(setStatus(status))
		}
	});
}


export default profileReducer;
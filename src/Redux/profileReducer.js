import { profileAPI } from "./../API/api.js";
import { updatePhotoSuccess, requestProfile,
 fetching, setStatus, updateStatus } from "./actionCreators.js";



let initialState = {

	profileData : null,
	PostsData : [{message:"Hi"}],
	isFetching : false,
	status : "",
	photos : {large : null, small : null}
}


const profileReducer = (state=initialState, action) => {


	switch (action.type) {

		case "ADD_POST" : 
			return {...state,
				PostsData: [...state.PostsData, {message :  action.post}]
			};

		case "SET_PROFILE" : 
		return {...state, profileData: action.data};

		case "FETCHING" : 
		return {...state, isFetching: !state.isFetching};

		case "SET_STATUS" :
		return {...state, status: action.status}

		case "UPDATE_PHOTO_SUCCESS" : 
		return {...state, photos : action.photos}

		default : return state;
	};

};


export let setProfileTC = (userId, isAuth, myId) => async (dispatch) => {

	dispatch(fetching());
	
	if (isAuth && !userId) 
		userId = myId;

		let data = await profileAPI.setProfile(userId)
			dispatch(updatePhotoSuccess(data.photos))
    		dispatch(requestProfile(data));
    		dispatch(fetching());
}

export let setStatusTC = (userId) => async (dispatch) => {
	let status = await profileAPI.getStatus(userId)
      dispatch(setStatus(status));
}

export let updateStatusTC = (status) => async (dispatch) => {
	let data = await profileAPI.updateStatus(status)
		if(data.resultCode === 0) {
			dispatch(setStatus(status))
		}
}

export let updatePhotoTC = (photo, myId) => async (dispatch) => {
	let data = await profileAPI.updatePhoto(photo)
		if(data.resultCode === 0) {
			let data = await profileAPI.getPhoto(myId)
			dispatch(updatePhotoSuccess(data))
		}
}





export default profileReducer;
import { profileAPI } from "./../API/api.js";
import { updatePhotoSuccess, requestProfile,
 fetching, setStatus, updateStatus, updateProfileSuccess, setEditMode } from "./actionCreators.js";
import { stopSubmit } from "redux-form";


let initialState = {

	profileData : null,
	PostsData : [{message:"Hi", id : 1}],
	isFetching : false,
	status : "",
	photos : {large : null, small : null},
	isOwner : false,
	editMode : false
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

		case "UPDATE_PROFILE_SUCCESS" : 
		return {...state, profileData : action.values}

		case "IS_OWNER" : 
		return {...state, isOwner : action.isOwner}

		case "SET_EDIT_MODE" : 
		return {...state, editMode : action.editMode}

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

export let updateProfileTC = (values, myId) => async (dispatch) => {
	let data = await profileAPI.updateProfile(values)
	if(data.resultCode === 0) {
		let data = await profileAPI.setProfile(myId)
			dispatch(updateProfileSuccess(data))
			dispatch(setEditMode(false))
	} else {
		dispatch(stopSubmit("profileInfo", { _error : data.messages[0]}));
		dispatch(setEditMode(true))
	}
}

export let setStatusTC = (userId, myId) => async (dispatch) => {
		if(!userId)
			userId = myId;

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
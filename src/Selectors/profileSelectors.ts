import { AppStateType } from "./../utils/types"

export const getPostData = (state: AppStateType) => {
	return state.Profile.PostsData
}

export const getIsFetching = (state: AppStateType) => {
	return state.Profile.isFetching
}

export const getProfileData = (state: AppStateType) => {
	return state.Profile.profileData
}

export const getStatus = (state: AppStateType) => {
	return state.Profile.status
}

export const getPhotos = (state: AppStateType) => {
	return state.Profile.photos
}

export const getIsOwner = (state: AppStateType) => {
	return state.Profile.isOwner
}

export const getEditMode = (state: AppStateType) => {
	return state.Profile.editMode
}
export const getPostData = (state) => {
	return state.Profile.PostsData
}

export const getIsFetching = (state) => {
	return state.Profile.isFetching
}

export const getProfileData = (state) => {
	return state.Profile.profileData
}

export const getStatus = (state) => {
	return state.Profile.status
}

export const getPhotos = (state) => {
	return state.Profile.photos
}

export const getIsOwner = (state) => {
	return state.Profile.isOwner
}

export const getEditMode = (state) => {
	return state.Profile.editMode
}
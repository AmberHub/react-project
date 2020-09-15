export const getUsers = (state) => {
	return state.UsersPage.users
}

export const getPage = (state) => {
	return state.UsersPage.page
}

export const getCount = (state) => {
	return state.UsersPage.count
}

export const getTotalCountPage = (state) => {
	return state.UsersPage.totalCountPage
}

export const getCurrentPage = (state) => {
	return state.UsersPage.currentPage
}

export const getIsFetching = (state) => {
	return state.UsersPage.isFetching
}

export const getFollowInProgres = (state) => {
	return state.UsersPage.followInProgres
}

export const getCurrentPortion = (state) => {
	return state.UsersPage.currentPortion
}
import { AppStateType } from "../utils/types"

export const getUsers = (state: AppStateType) => {
	return state.UsersPage.users
}

export const getPage = (state: AppStateType) => {
	return state.UsersPage.page
}

export const getCount = (state: AppStateType) => {
	return state.UsersPage.count
}

export const getTotalCountPage = (state: AppStateType) => {
	return state.UsersPage.totalCountPage
}

export const getCurrentPage = (state: AppStateType) => {
	return state.UsersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
	return state.UsersPage.isFetching
}

export const getFollowInProgress = (state: AppStateType) => {
	return state.UsersPage.followInProgress
}

export const getCurrentPortion = (state: AppStateType) => {
	return state.UsersPage.currentPortion
}
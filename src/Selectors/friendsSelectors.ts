import {AppStateType} from "../utils/types";


export let getFriends = (state: AppStateType) => {
    return state.FriendsPage.friends
}

export let getCountFriends = (state: AppStateType) => {
    return state.FriendsPage.count
}

export let getPageFriends = (state: AppStateType) => {
    return state.FriendsPage.page
}

export let getTotalCountOfFriends = (state: AppStateType) => {
    return state.FriendsPage.totalCountOfFriends
}

export let getCurrentPortionFriends = (state: AppStateType) => {
    return state.FriendsPage.currentPortionFriends
}

export let getCurrentPageFriends = (state: AppStateType) => {
    return state.FriendsPage.currentPageFriends
}

export let getIsFetchingFriends = (state: AppStateType) => {
    return state.FriendsPage.isFetching
}

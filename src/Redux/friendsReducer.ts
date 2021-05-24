import {friendsAPI, UsersDataType} from "../API/api"
import {UsersType} from "../utils/types";

const SET_FRIENDS_SUCCESS = "SET_FRIENDS_SUCCESS"
const FOLLOW_UNFOLLOW_FRIENDS_PAGE = "FOLLOW_UNFOLLOW_FRIENDS_PAGE"
const CHANGE_PORTION = "CHANGE_PORTION"
const CHANGE_PAGE = "CHANGE_PAGE"
const GET_TC = "GET_TC"
const FETCHING = "FETCHING"


type setFriendsSuccessACType = {
    type : typeof SET_FRIENDS_SUCCESS
    data : UsersDataType
}

let setFriendsSuccess = (data: UsersDataType): setFriendsSuccessACType => ({type: SET_FRIENDS_SUCCESS, data})

type followFriendsPageACType = {
    type : typeof FOLLOW_UNFOLLOW_FRIENDS_PAGE
    id : number
}
export let followFriendsPage = (id: number): followFriendsPageACType => ({type : FOLLOW_UNFOLLOW_FRIENDS_PAGE, id})

type ChangePortionACType = {
    type : typeof CHANGE_PORTION
    currentPortion : number
}
export let changePortionFriends = (currentPortion: number): ChangePortionACType => ({type : CHANGE_PORTION, currentPortion})

type ChangePageACType = {
    type : typeof CHANGE_PAGE
    page: number
}
export let changePageFriends = (page: number): ChangePageACType => ({type : CHANGE_PAGE, page});

type RequestTotalCountPageACType = {
    type : typeof GET_TC
    totalCountPage: number
}
export let requestTotalCountPage = (total: number): RequestTotalCountPageACType => ({type: GET_TC, totalCountPage : total});

type fetchingACType = {
    type : typeof FETCHING
}
export let fetching = (): fetchingACType => ({ type : FETCHING })

type actionsType = setFriendsSuccessACType | followFriendsPageACType | ChangePageACType
    | ChangePortionACType | RequestTotalCountPageACType | fetchingACType

type InitialStateType = typeof initialState

let initialState = {
    friends : [] as Array<UsersType> | null,
    followInProgress : [] as Array<number>,
    isFetching : false,
    count : 9,
    page : 1,
    totalCountOfFriends : 0,
    currentPortionFriends : 1,
    currentPageFriends : 1
}

const friendsReducer = (state=initialState, action: actionsType): InitialStateType => {

    switch(action.type) {
        case SET_FRIENDS_SUCCESS :
            return {...state, friends : action.data.items}

        case FOLLOW_UNFOLLOW_FRIENDS_PAGE :
            return {...state, friends :
                    state.friends !== null ? state.friends.map( friend => {
                        if(friend.id === action.id) {
                             return { ...friend, followed: !friend.followed }
                        } else {
                             return friend }})
                        : []
                    }

        case CHANGE_PORTION :
            return {...state, currentPortionFriends: action.currentPortion}

        case CHANGE_PAGE :
            return {...state, currentPageFriends: action.page, page : action.page}

        case GET_TC :
            return {...state, totalCountOfFriends: action.totalCountPage}

        case FETCHING :
            return {...state, isFetching: !state.isFetching}

        default :
            return state
    }
}

export let setFriendsTC = (page : number, count : number, isChangingPage : boolean, isFetching : boolean, searchName? : string) => async (dispatch: Function) => {
    let data = await friendsAPI.requestFriends(page, count, searchName)
    if(data.error === null) {
        isFetching && dispatch(fetching())

        dispatch(requestTotalCountPage(data.totalCount))
        dispatch(setFriendsSuccess(data))

        if(isChangingPage)
            dispatch(changePageFriends(page))

        isFetching && dispatch(fetching())
    }
}

export default friendsReducer
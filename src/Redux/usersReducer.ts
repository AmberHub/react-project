import {userAPI} from "../API/api";
import { UsersType } from "../utils/types"
import { followFriendsPage } from "./friendsReducer";

const SET_USERS = "SET_USERS";
const GET_TC = "GET_TC";
const FETCHING = "FETCHING";
const FOLLOW_UNFOLLOW = "FOLLOW_UNFOLLOW";
const CHANGE_PAGE = "CHANGE_PAGE";
const FOLLOWING = "FOLLOWING";
const CHANGE_PORTION = "CHANGE_PORTION";



type RequestUsersACType = {
	type : typeof SET_USERS
	newUsers : Array<UsersType> | null
}
export let requestUsers = (newUsers: Array<UsersType> | null): RequestUsersACType => ({ type: SET_USERS, newUsers });


type RequestTotalCountPageACType = {
	type : typeof GET_TC
	totalCountPage: number
}
export let requestTotalCountPage = (total: number): RequestTotalCountPageACType => ({type: GET_TC, totalCountPage : total});


type FetchingACType = {
	type : typeof FETCHING
}
export let fetching = (): FetchingACType => ({type : FETCHING});


export type FollowACType = {
	type : typeof FOLLOW_UNFOLLOW
	userId : number
}
export let follow = (userId: number): FollowACType => ({ type : FOLLOW_UNFOLLOW, userId });


type ChangePageACType = {
	type : typeof CHANGE_PAGE
	page: number
}
export let changePage = (page: number): ChangePageACType => ({type : CHANGE_PAGE, page});


type FollowingACType = {
	type : typeof FOLLOWING
	userId : number
	isFetching: boolean
}
export let following = (userId: number, isFetching: boolean): FollowingACType => ({type : FOLLOWING, userId, isFetching});


type ChangePortionACType = {
	type : typeof CHANGE_PORTION
	currentPortion : number
}
export let changePortion = (currentPortion: number): ChangePortionACType => ({type : CHANGE_PORTION, currentPortion});




type initialStateType = typeof initialState;

type actionsType = RequestUsersACType | RequestTotalCountPageACType | FetchingACType |
	FollowACType | ChangePageACType | FollowingACType | ChangePortionACType

let initialState = {
	users : [ ] as Array<UsersType>,
	page : 1,
	count : 5,
	totalCountPage : 0,
	currentPage : 1,
	isFetching : false,
	followInProgress : [ ] as Array<number>,
	currentPortion : 1
};

const usersReducer = ( state = initialState, action: actionsType): initialStateType => {


	switch( action.type ) {

		case FOLLOW_UNFOLLOW :
			return { ...state,
			 users : state.users.map( user => {
			 	if(user.id === action.userId) {
			 		return { ...user, followed: !user.followed }
			 	} else {
			 		return user
			 	}})
			}

		case SET_USERS : 
			return { ...state, users : [...action.newUsers] };

		case CHANGE_PAGE :
			return {...state, page : action.page, currentPage : action.page};

		case GET_TC :
			 return {...state, totalCountPage: action.totalCountPage};

		case FETCHING :
			return {...state, isFetching: !state.isFetching};

		case FOLLOWING :
			return {...state, followInProgress : action.isFetching ?
			[...state.followInProgress, action.userId]
			: state.followInProgress.filter( id => id != action.userId)} ;

			case CHANGE_PORTION :
			return {...state,
				currentPortion : action.currentPortion
			}


		default : return state;
	}

};

export let setUsersTC = (page: number, count: number, isFetching: boolean, isChangingPage : boolean, term?: string) => async (dispatch: Function) => {
		isFetching && dispatch(fetching())
		let data = await userAPI.setUsers(page, count, term)
			dispatch(requestUsers(data.items));
			dispatch(requestTotalCountPage(data.totalCount));
			if(isChangingPage)
				dispatch(changePage(page));
		isFetching && dispatch(fetching());
}

let _followHelper = async (dispatch: Function, option: any, id: number, follow: Function, following: Function, isFriendsPage?: boolean) => {
	dispatch(following(id, true));
	let data = await option(id)
	if(data.resultCode === 0) {
		dispatch(follow(id))
		if (isFriendsPage)
			dispatch(followFriendsPage(id))
		dispatch(following(id, false))
	}
}

export let followTC = (isFollow: boolean, id: number, isFriendsPage?: boolean) => async (dispatch: Function) => {
	dispatch(following(id, true));
	if (!isFollow) {
		debugger
			await _followHelper(dispatch, userAPI.unfollow.bind(userAPI), id, follow, following, isFriendsPage)
		} else if (isFollow) {
		debugger
			await _followHelper(dispatch, userAPI.follow.bind(userAPI), id, follow, following, isFriendsPage)
		}
}


export default usersReducer;
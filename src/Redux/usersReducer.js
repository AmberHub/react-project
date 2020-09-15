import {requestUsers, requestTotalCountPage, fetching,
 follow, changePage, following} from "./actionCreators.js";
import {userAPI} from "./../API/api.js";


let initialState = {
	users : [ ],
	page : 1,
	count : 5,
	totalCountPage : 20,
	currentPage : 1,
	isFetching : false,
	followInProgres : [ ],
	currentPortion : 1
};

const usersReducer = ( state = initialState, action) => {


	switch( action.type ) {

		case "FOLLOW_UNFOLLOW" :
			return { ...state,
			 users : state.users.map( user => {
			 	if(user.id === action.userId) {
			 		return { ...user, followed: !user.followed }
			 	} else {
			 		return user
			 		};
				}
				)
			}

		case "SET_USERS" : 
			return { ...state, users : [...action.newUsers] };

		case "CHANGE_PAGE" :
			return {...state, page : action.page, currentPage : action.page};

		case "GET_TC" :
			 return {...state, totalCountPage: action.totalCountPage};

		case "FETCHING" : 
			return {...state, isFetching: !state.isFetching};

		case "FOLLOWING" : 
			return {...state, followInProgres : action.isFetching ? 
			[...state.followInProgres, action.userId]
			: state.followInProgres.filter( id => id != action.userId)} ;

			case "CHANGE_PORTION" : 
			return {...state,
				currentPortion : action.currentPortion
			}

		default : return state;
	}

};

export let setUsersTC = (page, count) => async (dispatch) => {
		dispatch(fetching());
		let data = await userAPI.setUsers(page, count)
			dispatch(requestUsers(data.items));
			dispatch(requestTotalCountPage(data.totalCount));
			dispatch(fetching());
};

export let changePageTC = (page, count) => async (dispatch) => {
		dispatch(fetching());
		let data = await userAPI.setUsers(page, count)
			dispatch(requestUsers(data.items));
			dispatch(requestTotalCountPage(data.totalCount));
			dispatch(changePage(page));
			dispatch(fetching());
}

let _followHelper = async (dispatch, option, userId, followAC, followingAC) => {
	dispatch(followingAC(userId, true));
	let data = await option(userId)
	if(data.resultCode === 0) {
		dispatch(followingAC(userId, false));
		dispatch(followAC(userId))
	}
}

export let followTC = (isFollow, userId) => async (dispatch) => {
	dispatch(following(userId, true));
	if (isFollow === false) {
			_followHelper(dispatch, userAPI.unfollow.bind(userAPI), userId, follow, following)
		} else if (isFollow === true) {
			_followHelper(dispatch, userAPI.follow.bind(userAPI), userId, follow, following)
		}
}


export default usersReducer;
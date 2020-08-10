import {updateUsers, getTotalCountPage, fetching, follow, changePage} from "./actionCreators.js";
import {userAPI} from "./../API/api.js";


let initialState = {
	users : [ ],
	page : 1,
	count : 5,
	totalCountPage : 20,
	currentPage : 1,
	isFetching : false,
	followInProgres : false
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
			return {...state, followInProgres: !state.followInProgres};

		default : return state;
	}

};

export let setUsersTC = (page, count) => (dispatch) => {
		dispatch(fetching());
		userAPI.setUsers(page, count).then( data => {
			dispatch(updateUsers(data.items));
			dispatch(getTotalCountPage(data.totalCount));
			dispatch(fetching());
		})
};

export let changePageTC = (page, count) => (dispatch) => {
		dispatch(fetching());
		userAPI.setUsers(page, count).then( data => {
			dispatch(updateUsers(data.items));
			dispatch(getTotalCountPage(data.totalCount));
			dispatch(changePage(page));
			dispatch(fetching());
		})
}

export let followTC = (isFollow, userId) => (dispatch) => {
	if (isFollow === false) {
		userAPI.unfollow(userId).then( data => {
		if(data.resultCode === 0) {
			dispatch(follow(userId))
		}})
	} else if (isFollow === true) {
		userAPI.follow(userId).then( data => {
			if(data.resultCode === 0) {
				dispatch(follow(userId))
			}})
	}
	
}


export default usersReducer;
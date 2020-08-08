let initialState = {
	users : [ ],
	page : 1,
	count : 5,
	totalCountPage : 20,
	currentPage : 1,
	isFetching : false
};

const usersReducer = ( state = initialState, action) => {


	switch( action.type ) {

		case "FOLLOW_UNFOLLOW" :
			return { ...state,
			 users : state.users.map( user => {
			 	if(user.id === action.userId) {
			 		return { ...user, follow: !user.follow }
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

		default : return state;
	}

};

export default usersReducer;
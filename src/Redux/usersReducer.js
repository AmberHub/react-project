let initialState = {
	users : [
		{ id: 1, follow: false, name: "Vasya", secondName: "Pypkin", status: "first BLL", location : {city : "Lvov", country: "Ukraine"}, photo: ""},
		{ id: 2, follow: true, name: "Tom", secondName: "Watcher", status: "first UI", location : {city : "New-York", country: "USA"}, photo: ""},
		{ id: 3, follow: false, name: "Vova", secondName: "Mechkov", status: "first API", location : {city : "Minsk", country: "Belarus"}, photo: ""}
	]
};

const usersReducer = ( state = initialState, action) => {


	switch( action.type ) {

		case "FOLLOW-UNFOLLOW" :
			let stateCopy = { ...state,
			 users : state.users.map( user => {
			 	if(user.id === action.userId) {
			 		return { ...user, follow: !user.follow }
			 	} else {
			 		return user
			 		};
				}
				)
			}
			return stateCopy;


		default : return state;
	}

};

export default usersReducer;
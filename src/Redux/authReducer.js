let initialState = {

	login: null,
	email: null,
	userId: null,
	isAuth: false

};

const authReducer = (state=initialState, action) => {
	switch(action.type) {

		case "SET_AUTH_USER_DATA" :
		return { ...state,
		login: action.data.login,
		email: action.data.email,
		userId: action.data.id,
		isAuth: true };

		default : return state;
	}
 }

 export default authReducer;
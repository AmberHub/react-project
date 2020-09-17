import { isAuthTC } from "./authReducer.js";
import { initialized } from "./actionCreators.js";


const initialState = {

	appInitialized : false

}


const appReducer = (state=initialState, action) => {
	switch(action.type) {

		case "INITIALIZED" : 
		return {
			...state,
			appInitialized : true
		}

		default : return state
	}
}



export const initializeAppTC = () => (dispatch) => {
  let promise = Promise.all([dispatch(isAuthTC())]);
    promise.then( () => dispatch(initialized()))
}

export default appReducer;
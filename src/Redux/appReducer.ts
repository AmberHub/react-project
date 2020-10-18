import { isAuthTC } from "./authReducer"

const INITIALIZED = "INITIALIZED"


type InitializedACType = {
	type : typeof INITIALIZED
}
let initialized = (): InitializedACType => ({type : INITIALIZED})


type initialStateType = typeof initialState

type actionsType = InitializedACType

const initialState = {
	appInitialized : false
}


const appReducer = (state=initialState, action: actionsType): initialStateType => {
	switch(action.type) {

		case INITIALIZED : 
		return {
			...state,
			appInitialized : true
		}

		default : return state
	}
}



export const initializeAppTC = () => (dispatch: Function) => {
  let promise = Promise.all([dispatch(isAuthTC())]);
    promise.then( () => dispatch(initialized()))
}

export default appReducer;
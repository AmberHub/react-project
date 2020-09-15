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

export default appReducer;
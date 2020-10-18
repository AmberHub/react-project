type initialStateType = typeof initialState;

let initialState = {}

const sidebarReducer = (state=initialState, action: any): initialStateType => {

	switch (action.type) {
		default : return state;
	}

}

export default sidebarReducer;
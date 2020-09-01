let initialState = {

			DialogMessageData : [
			{message:"yo"},
			{message:"yo"},
			{message:"yo"},
			{message:"yo"},
			{message:"yo"} ],

			DialogNameData : [
			{id:"1", name:"Soniashka"},
			{id:"2", name:"Nazarko"},
			{id:"3", name:"Vitya"} ],
}


const dialogReducer = (state=initialState, action) => {

	let stateCopy = {...state};

	switch (action.type) {

		case "ADD_MESSAGE" : 
			return {...state,
				DialogMessageData: [...state.DialogMessageData, {message : action.message}]
			}

		default : return state;
	};

};

export default dialogReducer;
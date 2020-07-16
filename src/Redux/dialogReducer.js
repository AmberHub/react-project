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


			textMessageValue : "",

}


const dialogReducer = (state=initialState, action) => {

	let stateCopy = {...state};

	switch (action.type) {

		case "ADD-MESSAGE" : 
			let body = state.textMessageValue;
			return {
				...state,
				DialogMessageData: [...state.DialogMessageData, {message : body}],
				textMessageValue: ''
			}
		case "CHANGE-MESSAGE-LETTER" : 
		return {
			...state,
			textMessageValue: action.text
		}
		default : 
			return state;
	};

};

export default dialogReducer;
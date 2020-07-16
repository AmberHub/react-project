import dialogReducer from './dialogReducer.js';
import profileReducer from './profileReducer.js';
import sidebarReducer from './sidebarReducer.js';


let store = {

	_state : {

			ProfileData : {

				PostsData : [
				{message:"Hi"},
				{message:"I have a problem"},
				{message:"I'm your socnet"},
				{message:"And now I'm sucks"} ],

				textPostValue : "",

			},

			

			DialogData : {

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

			},

			SidebarData : { }
	},


	getState() {
		return this._state;
	},

	_rerenderAll() {
		console.log('rerender isn`t working');
	},


	dispatch(action) {
		this._state.DialogData = dialogReducer(this._state.DialogData, action);
		this._state.ProfileData = profileReducer(this._state.ProfileData, action);
		this._state.SidebarData = sidebarReducer(this._state.SidebarData, action);

		this._rerenderAll(this._state);
	},


	callStore(funcRerender) {
			this._rerenderAll = funcRerender;
	}

};


window.store = store;



export default store;



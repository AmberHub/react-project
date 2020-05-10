import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store from './Redux/store.js';


let rerenderAll = (state) => {ReactDOM.render(
	  <React.StrictMode>
	  	<BrowserRouter>
	    	<App dispatch = {store.dispatch.bind(store)}
	    	state={store.getState()} 
	    	/>
	    </BrowserRouter>
	  </React.StrictMode>,
	  document.getElementById('root')
	)
};



rerenderAll(store.getState());

store.callStore(rerenderAll);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

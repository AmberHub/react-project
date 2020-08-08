import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store from './Redux/redux-store.js';
import {Provider} from "react-redux";


let rerenderAll = (state) => {ReactDOM.render(
	  <React.StrictMode>
	  	<Provider store={store}>
		  	<BrowserRouter>
		    	<App/>
		    </BrowserRouter>
	    </Provider>
	  </React.StrictMode>,
	  document.getElementById('root')
	)
};


rerenderAll(store.getState());



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

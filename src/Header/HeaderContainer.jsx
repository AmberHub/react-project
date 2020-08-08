import React from 'react';
import classes from "./Header.module.css";
import Header from "./Header.jsx";
import { connect } from "react-redux";
import * as axios from "axios";
import { setAuthUserData } from "./../Redux/actionCreators.js";

class HeaderAPI extends React.Component {

	componentDidMount = () => {
		axios.get("https://social-network.samuraijs.com/api/1.0/auth/me", {
			withCredentials : true
		}).then( response => {
			this.props.setAuthUserData(response.data.data)
		})
	};

	render = () => {
		return <Header { ...this.props } />
	};
};

let mapStateToProps = (state) => ({
	isAuth: state.Auth.isAuth,
	login: state.Auth.login,
	userId: state.Auth.userId
})


export default connect(mapStateToProps, { setAuthUserData })(HeaderAPI);
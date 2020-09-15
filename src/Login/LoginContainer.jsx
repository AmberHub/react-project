import React from 'react';
import Login from "./Login.jsx";
import { loginTC } from "./../Redux/authReducer.js";
import { connect } from "react-redux";
import { reset } from "redux-form";


const LoginContainer = (props) => {

    return <Login {...props} />

}

let mapStateToProps = (state) => ({
    isAuth : state.Auth.isAuth
});


export default connect(mapStateToProps, { loginTC, reset } )(LoginContainer)


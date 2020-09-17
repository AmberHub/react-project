import React from 'react';
import Login from "./Login.jsx";
import { loginTC } from "./../Redux/authReducer.js";
import { connect } from "react-redux";
import { reset } from "redux-form";
import { getIsAuth, getCaptchaUrl } from "./../Selectors/authSelectors.js";


const LoginContainer = (props) => {

    return <Login {...props} />

}

let mapStateToProps = (state) => ({
    isAuth : getIsAuth(state),
    captchaUrl : getCaptchaUrl(state)
});


export default connect(mapStateToProps, { loginTC, reset } )(LoginContainer)


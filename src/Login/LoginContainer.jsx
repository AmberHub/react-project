import React from 'react';
import Login from "./Login.jsx";
import { loginTC } from "./../Redux/authReducer.js";
import { connect } from "react-redux";


class LoginContainer extends React.Component {

  render = () => {
    return <Login {...this.props} />
  };
}

let mapStateToProps = (state) => {


};


export default connect(mapStateToProps, { loginTC } )(LoginContainer)


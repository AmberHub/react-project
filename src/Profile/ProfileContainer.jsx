import React from 'react';
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts.jsx";
import Profile from "./Profile.jsx";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {addPost, changePostLetter, updateProfile, fetching} from "./../Redux/actionCreators.js";
import { setProfileTC, setStatusTC, updateStatusTC } from "./../Redux/profileReducer.js";
import { compose } from "redux";
import { withAuth } from "./../HOC/AuthHOC.jsx"

class ProfileAPI extends React.Component {

  componentDidMount = () => {
    this.props.setProfileTC(this.props.match.params.userId,
    this.props.isAuth, this.props.myId);
    this.props.setStatusTC(this.props.myId);
  };

  render = () => {
    return <Profile { ...this.props }/>
  };
};

let mapStateToProps = (state) => {
  return{
    PostsData : state.Profile.PostsData,
    textPostValue : state.Profile.textPostValue,
    isFetching : state.Profile.isFetching,
    profileData : state.Profile.profileData,
    status : state.Profile.status,
    isAuth : state.Auth.isAuth,
    myId : state.Auth.userId
  }
};

let authMapStateToProps = (state) => {
  return{
    isAuth : state.Auth.isAuth
  }
};


export default compose(
  connect(mapStateToProps, { addPost, changePostLetter,
  updateProfile, fetching, setProfileTC, setStatusTC, updateStatusTC }),
  withRouter,
  connect(authMapStateToProps, { }),
  withAuth) (ProfileAPI);

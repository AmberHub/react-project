import React from 'react';
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts.jsx";
import Profile from "./Profile.jsx";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {addPost, changePostLetter, updateProfile, fetching} from "./../Redux/actionCreators.js";
import { profileAPI } from "./../API/api.js";

class ProfileAPI extends React.Component {

  componentDidMount = () => {
    this.props.fetching();
    let userId = this.props.match.params.userId;
    if (!userId && this.props.isAuth) {
      userId = this.props.myId;
    };

    profileAPI.setProfile(userId).then( data => {
       this.props.updateProfile(data)});
      this.props.fetching();
  };

  render = () => {
    return <Profile { ...this.props }/>
  }
};

let mapStateToProps = (state) => {
  return{
    PostsData : state.Profile.PostsData,
    textPostValue : state.Profile.textPostValue,
    isFetching : state.Profile.isFetching,
    profileData : state.Profile.profileData,
    isAuth : state.Auth.isAuth,
    myId : state.Auth.userId
  }
};

let ComponentWithURLDataProfile = withRouter(ProfileAPI);

export default connect(mapStateToProps, { addPost, changePostLetter,
 updateProfile, fetching }) (ComponentWithURLDataProfile);
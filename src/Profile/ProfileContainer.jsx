import React from 'react';
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts.jsx";
import Profile from "./Profile.jsx";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {addPost, changePostLetter, setProfile, fetching} from "./../Redux/actionCreators.js";
import * as axios from "axios";

class ProfileAPI extends React.Component {

  componentDidMount = () => {
    this.props.fetching();
    let userId = this.props.match.params.userId;
    if (!userId && this.props.isAuth) {
      userId = this.props.myId;
    };
    axios.get("https://social-network.samuraijs.com/api/1.0/profile/" + userId).then( response => 
    this.props.setProfile(response.data))
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
 setProfile, fetching }) (ComponentWithURLDataProfile);
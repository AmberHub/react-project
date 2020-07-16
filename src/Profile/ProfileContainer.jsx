import React from 'react'
import classes from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts.jsx"
import Profile from "./Profile.jsx"
import {connect} from "react-redux"
import {addPostActionCreator, changePostLetterActionCreator} from "./../Redux/actionCreators.js"


let mapStateToProps = (state) => {
  return{
    PostsData : state.Profile.PostsData,
    textPostValue : state.Profile.textPostValue
  }
};

let mapDispatchToProps = (dispatch) => {
  return{
    addPost : () => {  dispatch( addPostActionCreator() )  },
    changePostLetter : (text) => {  dispatch( changePostLetterActionCreator(text) )  }
  }
};

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);


export default ProfileContainer;
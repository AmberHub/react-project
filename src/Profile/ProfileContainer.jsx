import React, {useEffect, useState} from 'react';
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts.jsx";
import Profile from "./Profile.jsx";
import Preloader from "./../utils/Preloader.jsx";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetching, changeIsOwner } from "./../Redux/actionCreators.js";
import { updatePhotoTC, setProfileTC, setStatusTC, updateStatusTC } from "./../Redux/profileReducer.js";
import { compose } from "redux";
import { withAuth } from "./../HOC/AuthHOC.jsx"
import { getIsOwner ,getPhotos, getPostData, getIsFetching, getProfileData,
getStatus } from "./../Selectors/profileSelectors.js";
import { getIsAuth, getMyId } from "./../Selectors/authSelectors.js";

const ProfileContainer = (props) => {

  useEffect( () => {
    props.setProfileTC(props.match.params.userId,
    props.isAuth, props.myId);
    props.setStatusTC(props.match.params.userId, props.myId);
    props.changeIsOwner(false);
  }, [])

  useEffect( () => {
    if(!props.match.params.userId) {
      props.setProfileTC(props.match.params.userId,
      props.isAuth, props.myId);
      props.setStatusTC(props.myId);
      props.changeIsOwner(true);
    } 
  }, [props.match.params.userId])


  let selectPhoto = (e) => {
   props.updatePhotoTC(e.target.files[0], props.myId)
  }
    
    return <> {!props.profileData  ? <Preloader />
    : <Profile { ...props }  isOwner={props.isOwner} selectPhoto={selectPhoto}/>} </>

};

let mapStateToProps = (state) => ({

    PostsData : getPostData(state),
    isFetching : getIsFetching(state),
    profileData : getProfileData(state),
    status : getStatus(state),
    isAuth : getIsAuth(state),
    myId : getMyId(state),
    photos : getPhotos(state),
    isOwner : getIsOwner(state)

});


let authMapStateToProps = (state) => ({
    isAuth : getIsAuth(state)
});


export default compose(
  connect(mapStateToProps, { changeIsOwner ,updatePhotoTC, fetching, setProfileTC, setStatusTC, updateStatusTC }),
  withRouter,
  connect(authMapStateToProps, { }),
  withAuth) (ProfileContainer);

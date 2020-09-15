import React, {useEffect, useState} from 'react';
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts.jsx";
import Profile from "./Profile.jsx";
import Preloader from "./../utils/Preloader.jsx";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetching } from "./../Redux/actionCreators.js";
import { updatePhotoTC, setProfileTC, setStatusTC, updateStatusTC } from "./../Redux/profileReducer.js";
import { compose } from "redux";
import { withAuth } from "./../HOC/AuthHOC.jsx"
import { getPhotos, getPostData, getIsFetching, getProfileData,
getStatus } from "./../Selectors/profileSelectors.js";
import { getIsAuth, getUserId } from "./../Selectors/authSelectors.js";

const ProfileAPI = (props) => {

  let [isOwner, setIsOwner] = useState(false);

  useEffect( () => {
    props.setProfileTC(props.match.params.userId,
    props.isAuth, props.myId);
    props.setStatusTC(props.myId);
  }, [])

  useEffect( () => {
    if(!props.match.params.userId) {
      props.setProfileTC(props.match.params.userId,
      props.isAuth, props.myId);
      setIsOwner(true);
    } 
  }, [props.match.params.userId])

  let selectPhoto = (e) => {
   props.updatePhotoTC(e.target.files[0], props.myId)
  }
    
    return <> {!props.profileData ? <Preloader />
    : <Profile { ...props } isOwner={isOwner} selectPhoto={selectPhoto}/>} </>

};

let mapStateToProps = (state) => ({

    PostsData : getPostData(state),
    isFetching : getIsFetching(state),
    profileData : getProfileData(state),
    status : getStatus(state),
    isAuth : getIsAuth(state),
    myId : getUserId(state),
    photos : getPhotos(state)

});


let authMapStateToProps = (state) => ({
    isAuth : state.Auth.isAuth
});


export default compose(
  connect(mapStateToProps, { updatePhotoTC, fetching, setProfileTC, setStatusTC, updateStatusTC }),
  withRouter,
  connect(authMapStateToProps, { }),
  withAuth) (ProfileAPI);

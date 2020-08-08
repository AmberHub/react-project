import React from 'react';
import classes from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer.jsx";
import Preloader from "./../Preloader.jsx";
import ProfileBody from "./ProfileBody/ProfileBody.jsx";


const Profile = (props) => {
  return (
  	<div className={classes.ProfileWrapper}>
  		<div className={classes.upProfile}>
  			<ProfileBody profileData={props.profileData}/>
  		</div>
  		<div className={classes.post}>
  			<MyPostsContainer store={props.store}/>
  		</div>
  	</div>
  );
}

export default Profile;
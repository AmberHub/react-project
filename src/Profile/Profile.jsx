import React from 'react';
import classes from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer.jsx";
import ProfileBody from "./ProfileBody/ProfileBody.jsx";


const Profile = (props) => {
	return <div className={classes.ProfileWrapper}>
  		<div className={classes.upProfile}>
  			<ProfileBody isOwner={props.isOwner} photos={props.photos}
        selectPhoto={props.selectPhoto} profileData={props.profileData}
  			status={props.status} updateStatusTC={props.updateStatusTC}/>
  		</div>
  		<div className={classes.MyPosts}>
  			<MyPostsContainer reset={props.reset}/>
  		</div>
  	</div>
}

export default Profile;
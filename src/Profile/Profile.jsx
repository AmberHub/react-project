import React from 'react';
import classes from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer.jsx";
import ProfileBody from "./ProfileBody/ProfileBody.jsx";
import Preloader from "./../Preloader.jsx";


const Profile = (props) => {
	return <> {!props.profileData ? <Preloader /> : 
  	<div className={classes.ProfileWrapper}>
  		<div className={classes.upProfile}>
  			<ProfileBody profileData={props.profileData}
  			status={props.status} updateStatusTC={props.updateStatusTC}/>
  		</div>
  		<div className={classes.post}>
  			<MyPostsContainer store={props.store}/>
  		</div>
  	</div>
	} </>
}

export default Profile;
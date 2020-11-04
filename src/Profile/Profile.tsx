import React, { ChangeEvent } from 'react';
import classes from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileBody from "./ProfileBody/ProfileBody";
import { ProfileDataType, PhotosType } from "../utils/types"

type PropsType = StateType & DispatchType

type StateType = {
	userId : number
	isOwner : boolean
	photos: PhotosType | null
	profileData : ProfileDataType | null
	status : string | null
}

type DispatchType = {
  selectPhoto : (e: ChangeEvent<HTMLInputElement>) => void
  updateStatusTC : (status : string | null) => void
}

const Profile: React.FC<PropsType> = ({userId, isOwner, photos, selectPhoto, profileData, status, updateStatusTC}) => {
	return <div className={classes.ProfileWrapper}>
  		<div className={classes.upProfile}>
  			<ProfileBody userId={userId} isOwner={isOwner} photos={photos}
        selectPhoto={selectPhoto} profileData={profileData}
  			status={status} updateStatusTC={updateStatusTC}/>
  		</div>
  		<div className={classes.MyPosts}>
  			<MyPostsContainer />
  		</div>
  	</div>
}

export default Profile;
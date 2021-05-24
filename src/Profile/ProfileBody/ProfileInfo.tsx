import React, {useState} from "react";
import {InjectedFormProps, reduxForm } from "redux-form"
import { require } from "../../utils/validate"
import { Input, createField } from "../../utils/completeFormComponents"
import {ProfileDataType} from "../../utils/types"
import classes from "./ProfileInfo.module.css";
import { Button } from 'antd';
import { Switch } from 'antd';
import {
	ChromeOutlined,
	createFromIconfontCN,
	FacebookOutlined, GithubOutlined, IeOutlined,
	InstagramOutlined,
	TwitterOutlined,
    YoutubeOutlined
} from '@ant-design/icons';
import VkIcon from "../../utils/vkIcon"
import {NavLink} from "react-router-dom";


type PropsType = StateType & DispatchType

type StateType = {
	myId : number | null
	editMode : boolean
	profileData : ProfileDataType | null
	isOwner : boolean
}

type DispatchType = {
	updateProfileTC : (values: Object, myId: number | null) => void
	setEditMode : 	(option: boolean) => void
}

const ProfileInfo: React.FC<PropsType> = ({updateProfileTC, myId, editMode, setEditMode, profileData, isOwner}) => {

	let [showContacts, setShowContacts] = useState(false)

	let onSubmitProfileInfo = (values: Object) => {
	updateProfileTC(values, myId)
  }
	return <>
	{
		profileData &&
		!editMode ?
		<div className={classes.infoTextWrapper}>
			{isOwner && <div  className={classes.buttonEditInfo}><Button value="large" onClick={() => setEditMode(true)}>Edit Info</Button></div>}
		{ProfileInfoHelper("About me", profileData.aboutMe)}
		{ProfileInfoHelper("Looking for a job", profileData.lookingForAJob ? "yes" : "no")}
		{ProfileInfoHelper("My skills", profileData.lookingForAJobDescription)}
			Show contacts <Switch defaultChecked={false} onChange={() => setShowContacts(!showContacts)} />
			{
				showContacts && <div>
					{Object.keys(profileData.contacts).map( c => {
						return ProfileInfoHelper(c, profileData.contacts[c], true)
					})}
				</div>
			}
		</div>

		: <div>
			<ProfileInfoFormWith initialValues={profileData} isOwner={isOwner} setEditMode={setEditMode}
								 onSubmit={onSubmitProfileInfo} profileData={profileData}/>
		</div>
	}

	</>
}

type PropsTypeForInfoForm = {
	isOwner : boolean
	profileData: ProfileDataType | null

	setEditMode: (option: boolean) => void
}

const ProfileInfoForm: React.FC< PropsTypeForInfoForm &
	InjectedFormProps< ProfileDataType | null,
		PropsTypeForInfoForm>> = ({handleSubmit, error, isOwner, profileData}) => {
	return <div className={classes.infoTextWrapper}>
		<form onSubmit={handleSubmit}>
		{error && <span>{error}</span>}
			{isOwner && <button className={classes.buttonSubmitForm}>Save</button>}
			<div>
				{createField("Name", Input, "fullName", [require])}
			</div>
			<div>
				{createField("About me", Input, "aboutMe", [require])}
			</div>
			<div>
				{createField("Looking for a job", Input, "lookingForAJob", [], {type : "checkbox"}, "Looking for a job")}
			</div>
			<div>
				{createField("Looking for a job description", Input, "lookingForAJobDescription", [require])}
			</div>
			{ profileData &&
				Object.keys(profileData.contacts).map( c => {
				return <div key={c} >{createField( c, Input, "contacts." + c)}</div>
			} )}
		</form>
	</div>
}

let ProfileInfoHelper = (name: string | null, result: string | null, isContacts?: boolean) => {
	return <>
		{!isContacts ?
			result &&
			<div className={classes.infoItem} key={name}><span>{name}</span> : <span>{result}</span></div>
			: result && <div key={name} className={classes.infoItem}><a href={result}><span className={classes.IconsContacts}>{ContactsIconGener(name)}</span><span>{name}</span></a></div>
		}
		</>
}

let ContactsIconGener = (name: string | null) => {
	switch(name) {
		case "facebook" :
			return <FacebookOutlined />
		case "website" :
			return <ChromeOutlined />
		case "twitter" :
			return <TwitterOutlined />
		case "instagram" :
			return <InstagramOutlined />
		case "youtube" :
			return <YoutubeOutlined />
		case "github" :
			return <GithubOutlined />
		case "mainLink" :
			return <IeOutlined />
		case "vk" :
			return <VkIcon />
	}
}

let ProfileInfoFormWith = reduxForm< ProfileDataType | null, PropsTypeForInfoForm >({ form : "profileInfo" })(ProfileInfoForm)

export default ProfileInfo;
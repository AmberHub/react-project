import React from "react";
import { reduxForm } from "redux-form";
import { require } from "./../../utils/validate.js";
import { Input, createField } from "./../../utils/completeFormComponents.jsx";

const ProfileInfo = React.memo((props) => {

	let onSubmitProfileInfo = async (values) => {
	props.updateProfileTC(values, props.myId)
  }
	return <>
	{
		!props.editMode ? 
		<div>
		{props.isOwner && <button onClick={() => props.setEditMode(true)}>Edit Info</button>}
		{ProfileInfoHelper("Name", props.profileData.fullName)}
		{ProfileInfoHelper("About me", props.profileData.aboutMe)}
		{ProfileInfoHelper("Looking for a job", props.profileData.lookingForAJob ? "yes" : "no")}
		{ProfileInfoHelper("My skills", props.profileData.lookingForAJobDescription)}
		<span>Contacts :</span>{Object.keys(props.profileData.contacts).map( c => {
			return ProfileInfoHelper(c, props.profileData.contacts[c])
		} )}
		</div>

		: <div>
			<ProfileInfoFormWith initialValues={props.profileData} isOwner={props.isOwner} setEditMode={props.setEditMode}
			 onSubmit={onSubmitProfileInfo} profileData={props.profileData}/> 
		</div>
	}

	</>
});



const ProfileInfoForm = React.memo((props) => {
	return <div>
		<form onSubmit={props.handleSubmit}>
		{props.error && <span>{props.error}</span>}
			{props.isOwner && <button>Save</button>}
			{createField("Name", Input, "fullName", [require])}
			{createField("About me", Input, "aboutMe", [require])}
			{createField("Looking for a job", Input, "lookingForAJob", [], {type : "checkbox"}, "Looking for a job")}
			{createField("Looking for a job description", Input, "lookingForAJobDescription", [require])}
			{Object.keys(props.profileData.contacts).map( c => {
				return <div key={c} >{createField( c, Input, "contacts." + c)}</div>
			} )}
		</form>
	</div>
})

let ProfileInfoHelper = (name, result, key) => {
	return <div key={name}><span>{name}</span> : <span>{result}</span></div>
}

let ProfileInfoFormWith = reduxForm({ form : "profileInfo" })(ProfileInfoForm)

export default ProfileInfo;
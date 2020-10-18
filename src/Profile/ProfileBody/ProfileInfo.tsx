import React from "react";
import {InjectedFormProps, reduxForm } from "redux-form"
import { require } from "../../utils/validate"
import { Input, createField } from "../../utils/completeFormComponents"
import {ProfileDataType} from "../../utils/types"

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

	let onSubmitProfileInfo = (values: Object) => {
	updateProfileTC(values, myId)
  }
	return <>
	{
		profileData &&
		!editMode ?
		<div>
		{isOwner && <button onClick={() => setEditMode(true)}>Edit Info</button>}
		{ProfileInfoHelper("Name", profileData.fullName)}
		{ProfileInfoHelper("About me", profileData.aboutMe)}
		{ProfileInfoHelper("Looking for a job", profileData.lookingForAJob ? "yes" : "no")}
		{ProfileInfoHelper("My skills", profileData.lookingForAJobDescription)}
		<span>Contacts :</span>{Object.keys(profileData.contacts).map( c => {
			return ProfileInfoHelper(c, profileData.contacts[c])
		} )}
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
	return <div>
		<form onSubmit={handleSubmit}>
		{error && <span>{error}</span>}
			{isOwner && <button>Save</button>}
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

let ProfileInfoHelper = (name: string | null, result: string | null) => {
	return <div key={name}><span>{name}</span> : <span>{result}</span></div>
}

let ProfileInfoFormWith = reduxForm< ProfileDataType | null, PropsTypeForInfoForm >({ form : "profileInfo" })(ProfileInfoForm)

export default ProfileInfo;
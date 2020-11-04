import React from "react"
import ProfileInfo from "./ProfileInfo"
import { connect } from "react-redux"
import { getProfileData, getIsOwner, getEditMode } from "../../Selectors/profileSelectors"
import { getUserId } from "../../Selectors/authSelectors"
import { setEditMode, updateProfileTC } from "../../Redux/profileReducer"
import { AppStateType, ProfileDataType } from "../../utils/types"


type PropsType = ConnectedPropsType & DispatchPropsType & OwnPropsType

type ConnectedPropsType = {
	profileData : ProfileDataType | null
	isOwner : boolean
	myId : number | null
	editMode : boolean

}

type DispatchPropsType = {
	updateProfileTC : (values: Object, myId: number | null) => void
	setEditMode : (editMode: boolean) => void
}

type OwnPropsType = {

}

const ProfileInfoContainer: React.FC<PropsType> = ({...props}) => {
	return <ProfileInfo {...props} />
}

let mapStateToProps = (state: AppStateType): ConnectedPropsType => ({
		profileData : getProfileData(state),
		isOwner : getIsOwner(state),
		myId : getUserId(state),
		editMode : getEditMode(state)

})



export default connect<ConnectedPropsType, DispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
	{ updateProfileTC, setEditMode })(ProfileInfoContainer)
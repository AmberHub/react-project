import React from "react";
import ProfileInfo from "./ProfileInfo.jsx";
import { connect } from "react-redux";
import { updateProfileTC } from "./../../Redux/profileReducer.js";
import { getProfileData, getIsOwner, getEditMode } from "./../../Selectors/profileSelectors.js";
import { getMyId } from "./../../Selectors/authSelectors.js";
import { setEditMode } from "./../../Redux/actionCreators.js";

const ProfileInfoContainer = (props) => {
	return <ProfileInfo {...props} />
}

let mapStateToProps = (state) => ({
		profileData : getProfileData(state),
		isOwner : getIsOwner(state),
		myId : getMyId(state),
		editMode : getEditMode(state)

})



export default connect(mapStateToProps, { updateProfileTC, setEditMode })(ProfileInfoContainer);
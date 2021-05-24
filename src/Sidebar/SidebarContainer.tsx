import React from "react"
import Sidebar from "./Sidebar"
import { connect } from "react-redux"
import { getNewDialogsCount } from "../Selectors/sidebarSelectors"
import {AppStateType} from "../utils/types";

const SidebarContainer = ({...props}) => {
	return <Sidebar {...props}/>
}

let mapStateToProps = (state: AppStateType) => ({
	newDialogsCount : getNewDialogsCount(state)
})

export default connect(mapStateToProps, { })(SidebarContainer)
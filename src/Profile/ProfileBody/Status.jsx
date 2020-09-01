import React from "react";
import {Field} from "redux-form";
import {Input} from "./../../utils/completeFormComponents.jsx";
import {require} from "./../../utils/validate.js";


class Status extends React.Component {

	componentDidUpdate = (prevProps, prevState) => {
		if(prevProps.status !== this.props.status) {
			this.setState({
			status: this.props.status
		})}
	}

	state = {
		editMode : false,
		status : this.props.status
	}

	onChangeStatus = (e) => {
		this.setState({
			status : e.currentTarget.value
		})
	}

	forEditStatus = () => {
		this.setState({
			editMode : true
		})
		
	}

	statusEdited = () => {
		this.setState({
			editMode : false
		})
		this.props.updateStatusTC(this.state.status)
	}

	render = () => {
		return <div>
			{ this.state.editMode ? <StatusFrom onChange={this.onChangeStatus} onBlur={this.statusEdited}
			 value={this.state.status} autoFocus={true} onDoubleClick={this.statusEdited}/> 
			: <span onDoubleClick={this.forEditStatus}>{this.props.status}</span> }
		</div>
	}
}


const StatusFrom = (props) => {
	return <form >
		<Field name="status" component={Input} validate={[ require ]}  />
	</form>
}

export default Status;
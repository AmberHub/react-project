import React from "react";

class Status extends React.Component {

	componentDidUpdate = (prevProps, prevState) => {
		if(prevProps.status !== this.props.status) {
			this.setState({
			status: this.props.status
		})
		}
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
			{ this.state.editMode ? <input onChange={this.onChangeStatus} onBlur={this.statusEdited} value={this.state.status} autoFocus={true} onDoubleClick={this.statusEdited}></input>
			: <span onDoubleClick={this.forEditStatus}>{this.props.status}</span> }
		</div>
	}
}

export default Status;
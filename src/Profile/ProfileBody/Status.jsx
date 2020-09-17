import React, { useState, useEffect } from "react";
import { Field } from "redux-form";
import { Input } from "./../../utils/completeFormComponents.jsx";
import { require } from "./../../utils/validate.js";
import { reduxForm } from "redux-form";


const Status = React.memo((props) => {

	useEffect( () => {
		setStatus(props.status)
	}, [props.status])


	let [editMode, setEditMode] = useState(false);

	let [status, setStatus] = useState(props.status);

	let onChangeStatus = (e) => {
		setStatus(e.status)
	}

	let forEditStatus = () => {
		if(props.isOwner)
		setEditMode(true)
	}

	let statusEdited = () => {
		setEditMode(false);
		props.updateStatusTC(status)
	}

	return <div>
			{ editMode ? <StatusFromWith onChange={onChangeStatus} onBlur={statusEdited}
			 initialValues={{status : status}} onDoubleClick={statusEdited} onSubmit={true}/> 
			: <span onDoubleClick={forEditStatus}>{props.status ? props.status : "---"}</span> }
		</div>
})


const StatusFrom = (props) => {
	return <form onSubmit={props.handleSubmit}>
		<Field name="status" component={Input} validate={[ require ]} onBlur={props.onBlur}
			 value={props.initialValues.status} autoFocus={true} onDoubleClick={props.onDoubleClick} />
	</form>
}


let StatusFromWith = reduxForm({ form : "status" })(StatusFrom);


export default Status;
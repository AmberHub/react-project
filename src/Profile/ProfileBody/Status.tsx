import React, { useState, useEffect } from "react"
import { InjectedFormProps } from "redux-form"
import { Input, createField } from "../../utils/completeFormComponents.jsx"
import { require } from "../../utils/validate"
import { reduxForm } from "redux-form"

type PropsTypeStatus = {
	statusFromProps : string | null
	isOwner : boolean

	updateStatusTC : (status: string | null) => void
}

type StatusFormProps = {
	status: string | null
}

type OwnFormPropsType = {
	initialValues: InitValType
	onBlur : () => void
	onDoubleClick : () => void
}

type InitValType = {
	status : string | null
}

const Status: React.FC<PropsTypeStatus> = ({statusFromProps, isOwner, updateStatusTC}) => {

	useEffect( () => {
		setStatus(statusFromProps)
	}, [statusFromProps])


	let [editMode, setEditMode] = useState(false);

	let [status, setStatus] = useState<string | null>(statusFromProps);

	let onChangeStatus = (values : StatusFormProps) => {
		setStatus(values.status)
	}

	let forEditStatus = () => {
		if(isOwner)
		setEditMode(true)
	}

	let statusEdited = () => {
		setEditMode(false);
		updateStatusTC(status)
	}

	return <div>
			{ editMode ? <StatusFromWith onChange={onChangeStatus} onBlur={statusEdited}
			 initialValues={{status : status}} onDoubleClick={statusEdited}/> 
			: <span onDoubleClick={forEditStatus}>{statusFromProps ? statusFromProps : "none"}{isOwner && !statusFromProps ? "    **double click for edit**" : ""}</span> }
		</div>
}


const StatusFrom: React.FC<InjectedFormProps<StatusFormProps, OwnFormPropsType> & OwnFormPropsType> =
	({onDoubleClick, onBlur, initialValues, ...props}) => {
	return <form onSubmit={props.handleSubmit}>
		{
			createField("Status", Input, "status", [require], {onBlur : onBlur,
			 value : initialValues.status, autoFocus : true, onDoubleClick : onDoubleClick})
		}
	</form>
}


let StatusFromWith = reduxForm<StatusFormProps, OwnFormPropsType>({ form : "status" })(StatusFrom);


export default Status;
import React from 'react';
import classes from "./Dialogs.module.css";
import {NavLink} from "react-router-dom"
import Preloader from "../utils/Preloader.js";
import defaultPhoto from "./../img/defaultPhoto.jpg";
import {DialogType} from '../utils/types';

type PropsType = {
    DialogItem: Array<DialogType> | null
}


const Dialogs: React.FC<PropsType> = ({DialogItem}) => {
    return <>
        {!DialogItem ?
            <Preloader/>
            : <div className={classes.DialogsWrapper}>
                {
                    DialogItem.length > 0 ?
                        DialogItem.map(
                            d => <DialogsItem data={d} key={d.id}/>)
                        : <div><NavLink to="/users">
                            <button>Start chatting</button>
                        </NavLink></div>
                }
            </div>
        } </>
}

type PropsTypeDialogItem = {
    data: DialogType
}

let DialogsItem: React.FC<PropsTypeDialogItem> = ({data}) => {
    return <NavLink className={classes.dialogsNameItem}
                    to={`/dialogs/${data.id}/messages`}>
		<img className={classes.dialogsImg}
			 src={data.photos.small ? data.photos.small : defaultPhoto}
			 alt="photo"/>
        <span>{data.userName}
            {true &&
            <div className={classes.iconNewMessages}>
                <div className={classes.count}>{data.newMessagesCount}</div>
            </div>
            }
 	</span>
    </NavLink>

}

export default Dialogs;
import React from "react"
import classes from "../Profile/ProfileBody/ProfileInfo.module.css"
import img from "../img/vk.png"

type PropsType = {

}

const VkIcon:React.FC<PropsType> = (props) => {
    debugger
    return <img className={classes.vkIcon} src={img} alt="icon"/>
}

export default VkIcon
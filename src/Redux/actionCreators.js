const ADD_POST = "ADD-POST";

const CHANGE_POST_LETTER = "CHANGE-POST-LETTER";

const ADD_MESSAGE = "ADD-MESSAGE";

const CHANGE_MESSAGE_LETTER = "CHANGE-MESSAGE-LETTER";

const FOLLOW_UNFOLLOW = "FOLLOW-UNFOLLOW";


export let addMessageActionCreator = () => ({ type : ADD_MESSAGE });

export let changeMessageLetterActionCreator = (text) => ({ type : CHANGE_MESSAGE_LETTER, text : text });

export let addPostActionCreator = () => ({ type : ADD_POST });

export let changePostLetterActionCreator = (text) => ({ type : CHANGE_POST_LETTER, text : text });

export let followAC = (userId) => ({ type : FOLLOW_UNFOLLOW, userId : userId });
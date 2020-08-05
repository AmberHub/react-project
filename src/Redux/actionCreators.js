const ADD_POST = "ADD_POST";

const CHANGE_POST_LETTER = "CHANGE_POST_LETTER";

const ADD_MESSAGE = "ADD_MESSAGE";

const CHANGE_MESSAGE_LETTER = "CHANGE_MESSAGE_LETTER";

const FOLLOW_UNFOLLOW = "FOLLOW_UNFOLLOW";

const SET_USERS = "SET_USERS";

const CHANGE_PAGE = "CHANGE_PAGE";

const GET_TC = "GET_TC";


export let addMessageActionCreator = () => ({ type : ADD_MESSAGE });

export let changeMessageLetterActionCreator = (text) => ({ type : CHANGE_MESSAGE_LETTER, text });

export let addPostActionCreator = () => ({ type : ADD_POST });

export let changePostLetterActionCreator = (text) => ({ type : CHANGE_POST_LETTER, text });

export let followAC = (userId) => ({ type : FOLLOW_UNFOLLOW, userId });

export let setUsersAC = (newUsers) => ({ type : SET_USERS, newUsers });

export let chagePageAC = (page) => ({type : CHANGE_PAGE, page});

export let getTotalCountPageAC = (total) => ({type: GET_TC, totalCountPage : total});
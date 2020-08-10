import * as axios from "axios";

let instance = axios.create({
	withCredentials : true,
	headers : {
		"API-KEY" : "ec3ada7f-03f2-4d75-b234-2c079ee3d55a"
	},
	baseURL : `https://social-network.samuraijs.com/api/1.0/`
})
export const userAPI = {

	unfollow(userId) {
		return instance.delete(`follow/${userId}`).then( response => response.data )
	},

	follow(userId) {
		return instance.post(`follow/${userId}`).then( response => response.data )
	},

	setUsers(page, count) {
		return instance.get(`users?page=${page}&count=${count}`)
		.then( response => response.data )
	}
}

export const authAPI = {
	isAuthed() {
		return instance.get(`auth/me`).then( response => response.data )
	}
}

export const profileAPI = {
	setProfile(userId) {
		return instance.get(`profile/${userId}`).then( response => response.data )
	}
}
export class UserInfo {
	constructor({nameSelector, jobSelector, avatarSelector}){
		this._name = document.querySelector(nameSelector);
		this._job = document.querySelector(jobSelector);
		this._avatar = document.querySelector(avatarSelector);
		this._userId = null;
	}
	getUserInfo() {
		return {
			name: this._name.textContent,
			job: this._job.textContent,
		}
	}
	setUserInfo(name, about) {
		this._name.textContent = name;
		this._job.textContent = about;
	}

	setUserAvatar(avatar) {
		this._avatar.src = avatar;
	}
}
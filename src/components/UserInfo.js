export class UserInfo {
	constructor({nameSelector, jobSelector, avatarSeleector}){
		this._name = document.querySelector(nameSelector);
		this._job = document.querySelector(jobSelector);
		this._avatar = document.querySelector(avatarSeleector);
		this._userId = ''
	}
	getUserInfo() {
		return {
			name: this._name.textContent,
			job: this._job.textContent,
			avatar: this._avatar.link
		}
	}
	setUserInfo(name, about, avatar, _id) {
		this._name.textContent = name;
		this._job.textContent = about;
		this._avatar.src = avatar;
		this._userId = _id;
	}
}
var oNav = new Vue({
	el: "#nav",
	data: {
		show: false,
		loginEmail: "",
		loginPassword: ""
	},
	methods: {
		showLogin:() => {
			this.show = !this.show;
		},
		closeLogin:() => {
			this.show = false;
		},
		Login:() => {
			if(this.loginEmail == "" || this.loginPassword == "") {return }
			if(this.loginEmail == "123456" && this.loginPassword == "123456") {
				alert("登录成功!");
			} else {
				alert("邮箱或密码不正确!");
			}
			this.show = false;
			this.loginEmail = "";
			this.loginPassword = "";
		}
	}
});

<template>
	<div id="register">
		<header class="globalHeader">
			<h1 id="_logo">
			    <img class="svgLogo_chatwork" src="https://lampart-vn.com/wp-content/uploads/2019/02/logo.png" alt srcset />
				<button type="button" class="logout" @click="logout">Logout</button>
			</h1>
		</header>
		<div class="content two">
			<menu-edit-register-page></menu-edit-register-page>
			<div class="register-content main" style="min-height: 556px;">
				<h1>Setting Login Credentials</h1>
				<div class="register-inner">
					<p>You can set your name and password here.<br>
						*Your name will not be made public.</p>
					<form class="register" style="min-height: 150px">
						<div v-if="msg !== ''">
							<label class="show-error">{{ msg }}</label>
						</div>
						<div class="form-group register-form-row register-form-row-parent">
							<label>Name</label>
							<input
									v-model="name"
									type="text"
									name="name"
									class="form-control register-input" >
							<div class="error" v-if="errors.name !== ''">{{errors.name}}</div>
						</div>
						<div class="form-group register-form-row">
							<label style="padding-top: 3px">Password</label>
							<div class="password-change-component">
								<input
										type="checkbox"
										v-model="chooseChangePassword"
										name="chooseChangePassword"
								        id="chooseChangePassword">
								<label for="chooseChangePassword" class="choose-change-password">Make a new password</label>
								<div v-if="allowShow">
									<div class="register-form-row register-form-row-child">
										<label class="label-child">Current password :</label>
										<input
											v-model="currentPassword"
											type="password"
											name="currentPassword"
											class="form-control register-input" >
										<div class="error" v-if="errors.currentPassword !== ''">{{errors.currentPassword}}</div>
									</div>
									<div class="register-form-row register-form-row-child">
										<label class="label-child">New password :</label>
										<input
												v-model="newPassword"
												type="password"
												name="newPassword"
												class="form-control register-input" >
										<div class="error" v-if="errors.newPassword !== ''">{{errors.newPassword}}</div>
									</div>
									<div class="register-form-row register-form-row-child">
										<label class="label-child">New password (verify) :</label>
										<input
												v-model="confirmPassword"
												type="password"
												name="confirmPassword"
												class="form-control register-input" >
										<div class="error" v-if="errors.confirmPassword !== ''">{{errors.confirmPassword}}</div>
									</div>
								</div>
							</div>
						</div>
						<div class="form-group register-button">
							<button
									class="btn btn-register"
									type="button"
									@click="save">Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { API } from '../../services/api';
import { AppConst } from '../../common/AppConst';
import { ApiConst } from '../../common/ApiConst';
import VueRecaptcha from 'vue-recaptcha';
import MenuEditRegisterPage from './MenuEditRegisterPage.vue'
export default {
	name: "EditRegister",
	components: {VueRecaptcha, MenuEditRegisterPage},
	mixins: [],
	props: {
        params: {
            type: Object,
            default: function () {
                return {
                    parentRouteName: null,
                    user: null
                }
            }
        }
	},
	data () {
		return {
			errors: {
                name: "",
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
			},
			name: "",
            chooseChangePassword : false,
            currentPassword : "",
            newPassword : "",
            confirmPassword : "",
            allowShow : false,
            msg : ""
		}
	},
	computed: {
	},
	watch: {
        'chooseChangePassword': function (value) {
            this.allowShow = value
			if (!value) {
			    this.currentPassword = ''
			    this.newPassword = ''
			    this.confirmPassword = ''
			    this.errors.currentPassword = ''
			    this.errors.newPassword = ''
			    this.errors.confirmPassword = ''
			}
        }
	},
	created () {
        API.GET(ApiConst.DETAIL_REGISTER).then(res => {
                console.log(res.data.name);
                this.name = res.data.name
            });
    },
	mounted () {},
	methods: {
        checkValidateForm() {
            let isValid = false
            this.errors.name = ""
            this.errors.currentPassword = ""
            this.errors.newPassword = ""
            this.errors.confirmPassword = ""

            if (this.name === "") {
                isValid = true
                this.errors.name = "Name required !"
			}

			if (this.name.length > 55 && this.errors.company === "") {
                isValid = true
                this.errors.name = "Max length is 55 characteristics."
			}

			if (this.chooseChangePassword) {
                if (this.currentPassword === "") {
                    isValid = true
                    this.errors.currentPassword = "Password required !"
                }

                if (this.newPassword === "") {
                    isValid = true
                    this.errors.newPassword = "New password required !"
                }

                if (this.newPassword === this.currentPassword && this.errors.newPassword === '') {
                    isValid = true
                    this.errors.newPassword = "Current password and new password must be different."
                }

                if (this.confirmPassword === "") {
                    isValid = true
                    this.errors.confirmPassword = "Confirm password required !"
                }

                if (this.newPassword !== this.confirmPassword && this.errors.confirmPassword === '') {
                    isValid = true
                    this.errors.confirmPassword = "New password and confirm password are not the same."
				}
			}

            return isValid

		},
	    save() {
            this.msg = '';
	        if (this.checkValidateForm()) return
			let defaultData = {
	            name : this.name

			}
			if (this.chooseChangePassword) {
			    defaultData = {...defaultData,
					    current_password: this.currentPassword,
                        new_password: this.newPassword,
                        choose_change_password: this.chooseChangePassword
			    }

            }
            API.POST(ApiConst.EDIT_REGISTER,defaultData).then(res => {
                if (res.error_code === 0) {
                    alert('Success')
                    this.$router.push({name: 'home'})
                } else {
					for (var item in res.data) {
					    this.msg = res.data[item].join()
					}
				}
            });
		},
        logout () {
            API.POST(ApiConst.LOGOUT, null).then(res => {
                if (res.error_code === 0) {
                    localStorage.removeItem(AppConst.LOCAL_USER);
                    this.$router.push({ path: '/login' });
                }
            });
		}
	}
}
</script>

<style scoped>
	.register-inner p {
		border-top-color: initial;
		border-right-color: initial;
		border-bottom-color: initial;
		border-left-color: initial;
		outline-color: initial;
		background-image: initial;
		background-color: transparent;
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		font-size: 100%;
		display: block;
	}
	.main > h1 {
		border-top: black solid 1px;
		border-bottom: black solid 1px;
		padding-top: 5px;
		padding-bottom: 5px;
		bottom: 13px;
		position: relative;
		font-size: 20px;
		font-weight: 700;
	}
	.logout {
		background-color: black;
		color: white;
		border: black;
		position: relative;
		left: 1060px;
		bottom: 10px;
	}
	.main {
		width: 698px;
		z-index: 1;
		background-image: initial;
		background-color: rgb(234, 231, 225);
		border-right-color: rgb(173, 168, 157);
		border-left-color: rgb(209, 204, 195);
		padding: 30px 20px 10px;
	}
	img {
		border-top-color: initial;
		border-right-color: initial;
		border-bottom-color: initial;
		border-left-color: initial;
		vertical-align: middle;
		border: 0;
		outline-color: initial;
		background-image: initial;
		background-color: transparent;
		outline: 0;
		font-size: 100%;
		position: absolute;
		left: 193px;
		top: 5px;
	}
	.svgLogo_chatwork {
		display: block;
		width: 144px;
		height: 29.538432px;
	}
	.globalHeader h1 {
		display: inline-block;
		vertical-align: middle;
		border-top-color: initial;
		border-right-color: initial;
		border-bottom-color: initial;
		border-left-color: initial;
		outline-color: initial;
		background-image: initial;
		background-color: transparent;
		font-size: 16px;
		font-weight: 700;
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
	}
	.globalHeader {
		background-color: black;
		height: 40px;
		width: 100%;
		z-index: 2;
		box-sizing: border-box;
		margin: 0 auto;
		padding-top: 20px;
	}
	.content {
		zoom: 1;
		position: static;
		width: 960px;
		margin: 0 auto;
		display: flex;
		border-top-color: initial;
		border-right-color: initial;
		border-bottom-color: initial;
		border-left-color: initial;
		outline-color: initial;
		padding: 0;
		border: 0;
		outline: 0;
		font-size: 100%;
		vertical-align: baseline;
	}
	.two {
		border-left: 1px solid #b8b9b6;
		background-image: initial;
		background-color: rgb(226, 222, 215);
		border-left-color: rgb(173, 168, 157);
	}
	header {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		width: 960px;
		margin: 0 auto;
		padding-top: 20px;
	}
	.register-inner {
		margin: 0 auto;
	}
	.register-content {
		min-height: 540px;
	}
	.register-inner h2 {
		font-size: 2em;
		font-weight: 300;
		line-height: 1.4;
	}
	.register {
		border-top-color: initial;
		border-right-color: initial;
		border-bottom-color: initial;
		border-left-color: initial;
		outline-color: initial;
		background-image: initial;
		padding: 8px 36px 5px;
		border-radius: 4px;
		background-color: #f5f5f4;
		border: 0;
		outline: 0;
		font-size: 100%;
		vertical-align: baseline;
		display: block;
		margin-top: 12px;
		min-height: 540px;
	}
	.register label {
		box-sizing: border-box;
		color: #34362f;
		font-size: 0.875em;
		font-weight: 700;
		line-height: 1;
		margin-right: 10px;
		padding-top: 18px;
		width: 10%;
	}
	.register-button {
		text-align: center;
	}
	.btn {
		color: #fff;
		border: 0;
		border-radius: 7px;
		padding: 10px 10px;
		-webkit-box-shadow: none;
		box-shadow: none;
	}
	.btn-register {
		background-color: #f9423a;
		width: 100px;
		font-size: 16px;
	}
	.error{
		color: red;
		flex-shrink: 0;
	}
	.register-input {
		box-sizing: border-box;
		padding: 8px 5px;
		border: solid 1px #b8b9b6;
		border-radius: 3px;
		background-color: #fff;
		margin-top: 8px;
	}
	.register .show-error {
		color: red !important;
		width: 100% !important;
	}
	.register-form-row {
		margin-bottom: 6px;
		display:flex;
	}
	.register-form-row-child {
		flex-wrap: wrap;
	}
	.register-form-row-parent {
		flex-wrap: wrap;
	}
	.register-form-row .label-child {
		width: 42%;
	}
	.password-change-component div {
		width: 100%;
	}
	.password-change-component div input {
		width: 100% !important;
	}
	.password-change-component {
		width: 100%;
	}
	.register input[type="text"],
	.register input[type="email"],
	.register input[type="password"] {
		outline: none;
		border: none;
		width: 90%;
		padding: 7px;
		font-size: 18px;
	}
	.choose-change-password {
		font-weight: normal !important;
		padding: 0 15px 0 0 !important;
	}
</style>

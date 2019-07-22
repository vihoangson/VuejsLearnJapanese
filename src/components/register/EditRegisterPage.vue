<template>
    <div id="register">
        <header class="globalHeader">
            <h1 id="_logo">
                <img
                    class="svgLogo_chatwork"
                    src="https://lampart-vn.com/wp-content/uploads/2019/02/logo.png"
                    alt
                    srcset
                />
            </h1>
        </header>
        <div class="content two">
            <menu-edit-register-page></menu-edit-register-page>
            <div class="register-content main" style="height: 507px;">
                <h1>Setting Login Credentials</h1>
                <div class="register-inner">
                    <p>
                        You can set your name and password here.
                        *Your name will not be made public.
                    </p>
                    <form class="register">
                        <div class="form-group register-form-row">
                            <label>Name</label>
                            <input
                                v-model="name"
                                type="text"
                                name="name"
                                class="form-control register-input"
                            />
                            <div class="error" v-if="errors.name !== ''">{{errors.name}}</div>
                        </div>
                        <div class="form-group register-form-row">
                            <label style="padding-top: 3px">Password</label>
                            <div class="password-change-component">
                                <input
                                    type="checkbox"
                                    v-model="chooseChangePassword"
                                    name="chooseChangePassword"
                                />Make a new password
                                <div v-if="allowShow">
                                    <div class="register-form-row">
                                        <label class="label-child">Current password :</label>
                                        <input
                                            v-model="currentPassword"
                                            type="text"
                                            name="currentPassword"
                                            class="form-control register-input"
                                        />
                                        <div
                                            class="error"
                                            v-if="errors.currentPassword !== ''"
                                        >{{errors.currentPassword}}</div>
                                    </div>
                                    <div class="register-form-row">
                                        <label class="label-child">New password :</label>
                                        <input
                                            v-model="newPassword"
                                            type="text"
                                            name="newPassword"
                                            class="form-control register-input"
                                        />
                                        <div
                                            class="error"
                                            v-if="errors.newPassword !== ''"
                                        >{{errors.newPassword}}</div>
                                    </div>
                                    <div class="register-form-row">
                                        <label class="label-child">New password (verify) :</label>
                                        <input
                                            v-model="confirmPassword"
                                            type="text"
                                            name="confirmPassword"
                                            class="form-control register-input"
                                        />
                                        <div
                                            class="error"
                                            v-if="errors.confirmPassword !== ''"
                                        >{{errors.confirmPassword}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group register-button">
                            <button class="btn btn-register" type="button" @click="save">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import VueRecaptcha from 'vue-recaptcha';
import MenuEditRegisterPage from './MenuEditRegisterPage.vue';
import {API} from "../../services/api";
import {ApiConst} from "../../common/ApiConst";
export default {
    name: 'EditRegister',
    components: { VueRecaptcha, MenuEditRegisterPage },
    mixins: [],
    props: {
        params: {
            type: Object,
            default: function() {
                return {
                    parentRouteName: null,
                    modal: null,
                    id: 0
                };
            }
        }
    },
    data() {
        return {
            errors: {
                name: '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            name: '',
            chooseChangePassword: false,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            allowShow: false
        };
    },
    computed: {},
    watch: {
        chooseChangePassword: function(value) {
            this.allowShow = value;
        }
    },
    created() {},
    mounted() {},
    methods: {
        checkValidateForm() {
            let isValid = false;
            this.errors.company = '';
            this.errors.email = '';
            this.errors.password = '';
            this.errors.pleaseTickRecaptchaMessage = '';

            if (this.company === '') {
                isValid = true;
                this.errors.company = 'Company required !';
            }

            if (this.company.length > 55 && this.errors.company === '') {
                isValid = true;
                this.errors.company = 'Max length is 55 characteristics.';
            }

            if (this.email === '') {
                isValid = true;
                this.errors.email = 'Email required !';
            }
            let regexEmail = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,10}/;
            if (!regexEmail.test(this.email) && this.errors.email === '') {
                isValid = true;
                this.errors.email = 'Email invalid.';
            }

            if (this.password === '') {
                isValid = true;
                this.errors.password = 'Password required !';
            }
            let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (
                !regexPassword.test(this.password) &&
                this.errors.password === ''
            ) {
                isValid = true;
                this.errors.password =
                    'Minimum of 8 characters including lower case letter, upper case letter and numbers';
            }

            if (!this.recaptchaVerified) {
                isValid = true;
                this.errors.pleaseTickRecaptchaMessage =
                    'Please tick recaptcha!';
            }

            return isValid;
        },
        updateData(data) {
            return new Promise((resolve, reject) => {
                axios
                    .post('http://sns.dev.com/api/v1/user/register', data, {
                        headers: {
                            'Content-Type': 'application/json',
                            accept: 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    })
                    .then(res => {
                        resolve(res);
                    });
            });
        },
        save() {
            if (this.checkValidateForm()) return;
            let defaultData = {
                name: this.name
            };
            if (this.chooseChangePassword) {
                defaultData = {
                    ...defaultData,
                    currentPassword: this.currentPassword,
                    newPassword: this.newPassword,
                    chooseChangePassword: this.chooseChangePassword
                };
            }
            API.POST(ApiConst.EDIT_REGISTER, defaultData).then(res => {
                console.log(res);
                // this.name = res.data.name
            });
            // this.updateData(defaultData)
            //     .then((data) => {
            //         this.$router.push({name: 'home'})
            //     }).catch()
        }
    }
};
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
    color: rgb(42, 46, 49);
    border-top-color: rgb(61, 64, 67);
    border-bottom-color: rgb(61, 64, 67);
    font-size: 20px;
    font-weight: 700;
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
.error {
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
.register-form-row {
    margin-bottom: 6px;
    display: flex;
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
.register input[type='text'],
.register input[type='email'],
.register input[type='password'] {
    outline: none;
    border: none;
    width: 90%;
    padding: 7px;
    font-size: 18px;
}
</style>

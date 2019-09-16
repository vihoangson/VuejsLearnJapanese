<template>
    <div id="login">
        <header>
            <img src="https://lampart-vn.com/wp-content/uploads/2019/02/logo.png" alt srcset />
        </header>
        <section class="login-content">
            <div class="login-inner">
                <h2 class="title">LOGIN</h2>
                <form name="login" class="login" method="post" @submit="login">
                    <span class="error">{{errors.login_fail}}</span>
                    <div class="login-form-row">
                        <label for="email">Email Address</label>
                        <div class="login-email">
                            <input type="text" v-model="email" />
                        </div>
                        <span class="error">{{errors.email}}</span>
                    </div>
                    <div class="login-form-row">
                        <label for="email">Password</label>
                        <div class="login-email">
                            <input type="password" v-model="password" />
                        </div>
                        <span class="error">{{errors.password}}</span>
                    </div>
                    <div class="login-form-row keep-login">
                        <input id="login-checkbox" type="checkbox" />
                        <label for="login-checkbox">Keep me logged in</label>
                    </div>
                    <!--<vue-recaptcha @verify="markRecaptchaAsVerified" class="recapcha" sitekey="6LexDawUAAAAAP2dVouECeGm63c78bbwGtqJe-G1" :loadRecaptchaScript="true"></vue-recaptcha>-->
                    <span class="error">{{errors.pleaseTickRecaptchaMessage}}</span>

                    <div class="login-form-row login-button">
                        <input type="submit" value="Login" class="btn btn-login" />
                    </div>

                    <div class="text-center box-button-bottom">
                        <button
                            class="forget-password-button btn"
                            type="button"
                            @click="SetNewPassword"
                        >Reset password</button>
                        <button class="sign-up-button btn" type="button" @click="SignUp">Register</button>
                    </div>
                </form>
            </div>


        </section>
    </div>

</template>


<script>
import { API } from '../../services/api';
import { ApiConst } from '../../common/ApiConst';
import { AppConst } from '../../common/AppConst';
import VueRecaptcha from 'vue-recaptcha';


export default {
    name: 'Login',
    components: {
        VueRecaptcha
    },
    data() {
        return {
            showLoader: 'hidden',
            errors: {
                email: '',
                password: '',
                pleaseTickRecaptchaMessage: '',
                login_fail: ''
            },
            email: '',
            password: '',
            recaptchaVerified: true
        };
    },
    methods: {

        markRecaptchaAsVerified() {
            this.errors.pleaseTickRecaptchaMessage = '';
            this.recaptchaVerified = true;
        },
        login(e) {
            e.preventDefault();
            this.errors.login_fail = '';
            this.showLoader = 'visible';
            if (this.email === '') this.errors.email = '* Userame required!';

            if (this.password === '')
                this.errors.password = '* Password required!';

            if (!this.recaptchaVerified)
                this.errors.pleaseTickRecaptchaMessage =
                    '* Please tick recaptcha!';

            if (
                this.email !== '' &&
                this.password !== '' &&
                this.recaptchaVerified
            ) {
                let data = {
                    email: this.email,
                    password: this.password,
                    only_token: true
                };
                this.$store.dispatch('setLoadingPage',true);
                API.POST(ApiConst.LOGIN, data).then(res => {
                    if (res.error_code === 0) {
                        let user = {
                            token: res.data.token,
                            user_id: res.data.id,
                            icon_img: '',
                            name: res.data.name
                        };
                        if (
                            res.data.icon_img !== null &&
                            res.data.icon_img !== ''
                        )
                            user.icon_img = res.data.icon_img;
                        else
                            user.icon_img =
                                'https://britz.mcmaster.ca/images/nouserimage.gif/image';
                        localStorage.setItem(
                            AppConst.LOCAL_USER,
                            JSON.stringify(user)
                        );



                        let targetUser = {
                            id: res.data.id,
                        };

                        API.POST(ApiConst.GET_USER_INFO, targetUser).then(res => {
                            if (res.error_code === 0) {

                                let userInfo = {
                                    id : res.data.id,
                                    email: res.data.email,
                                    name: res.data.name,
                                    company: res.data.company,
                                    icon_img: res.data.icon_img,
                                    cover_img: res.data.cover_img,
                                };
                                localStorage.setItem(
                                    AppConst.LOCAL_USER_INFO,
                                    JSON.stringify(userInfo)
                                );

                                this.$router.push({ path: '/' });

                                this.$store.dispatch('setLoadingPage',false);
                            }
                            // Can't get user info
                            else {
                                this.$store.dispatch('setLoadingPage',false);
                                this.errors.login_fail = '* ' + res.error_msg;
                            }
                        });

                    }
                    // Can't login
                    else {
                        this.$store.dispatch('setLoadingPage',false);
                        this.errors.login_fail = '* ' + res.error_msg;
                    }

                });

            }
        },
        SetNewPassword() {
            this.$router.push({ name: 'ForgotPassword' });
        },
        SignUp() {
            this.$router.push({ name: 'Register' });
        }
    }
};
</script>

<style scoped>
    .loader {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background-color: #ffffffcf;
    }
    .loader img{
        position: relative;
        left: 40%;
        top: 40%;
    }




.hidden {
    display: none;
}
.text-center {
    text-align: center;
}
.set-new-password {
    text-align: center;
    color: blue;
    margin: 5px;
}
.box-button-bottom button {
    color: black !important;
    border: #ada89d 1px solid !important;
}
header {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 960px;
    margin: 0 auto;
    padding-top: 20px;
}
.login-content {
    padding: 50px 0 50px 0;
    background-color: #fff;
}
.login-inner {
    width: 760px;
    margin: 0 auto;
}
.login-inner h2 {
    font-size: 2em;
    font-weight: 300;
    line-height: 1.4;
}
.login-inner h2::before {
    display: block;
    width: 2.7272em;
    height: 1em;
    border-top: solid 1px #676863;
    content: '';
}
.login {
    padding: 25px 70px 30px;
    margin-bottom: 30px;
    border-radius: 4px;
    background-color: #f5f5f4;
}
.login label {
    box-sizing: border-box;
    color: #34362f;
    font-size: 0.875em;
    font-weight: 700;
    line-height: 1;
}
.login input[type='text'],
.login input[type='email'],
.login input[type='password'] {
    outline: none;
    border: none;
    width: 100%;
    padding: 0px;
    font-size: 18px;
}
.login-email {
    box-sizing: border-box;
    padding: 8px 5px;
    border: solid 1px #b8b9b6;
    border-radius: 3px;
    background-color: #fff;
    margin-top: 8px;
}
.login-form-row {
    margin-bottom: 24px;
}
.keep-login {
    text-align: center;
}
.login-button {
    text-align: center;
}
.btn {
    color: #fff;
    border: 0;
    border-radius: 7px;
    padding: 20px 20px;
    -webkit-box-shadow: none;
    box-shadow: none;
}
.btn-login {
    background-color: #f9423a;
    width: 200px;
    font-size: 16px;
}
.btn-login:hover {
    cursor: pointer;
    background-color: #fc271e;
}
.error {
    color: red;
}
.recapcha div {
    width: 100% !important;
    text-align: center;
}
</style>

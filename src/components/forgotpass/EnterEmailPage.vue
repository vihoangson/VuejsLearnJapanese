<template>
    <div id="login">
        <header>
            <img src="https://lampart-vn.com/wp-content/uploads/2019/02/logo.png" alt srcset />
        </header>
        <section class="login-content">
            <div class="login-inner">
                <h2 class="title">Forgot password</h2>
                <form name="login" class="login" method="post" @submit="sentemail">
                    <span class="error">{{errors.login_fail}}</span>
                    <div class="login-form-row">
                        <label for="email">Email Address</label>
                        <div class="login-email">
                            <input type="email" v-model="email" required />
                        </div>
                        <span class="error">{{errors.email}}</span>
                    </div>
                    <span class="error">{{errors.pleaseTickRecaptchaMessage}}</span>

                    <div class="login-form-row login-button">
                        <input type="submit" value="Get email verify" class="btn btn-login" />
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
        name: 'EnterEmail',
        components: {
            VueRecaptcha
        },
        data() {
            return {
                errors: {
                    email: '',
                    password: '',
                    pleaseTickRecaptchaMessage: '',
                    login_fail: ''
                },
                email: 'mcc@gmail.com',
                password: '',
                recaptchaVerified: true
            };
        },
        methods: {

            sentemail(e) {
                e.preventDefault();

                let isValid = false;

                // Start: Check valid email
                this.errors.email = ''

                if (this.email === '') {
                    isValid = true;
                    this.errors.email = 'Email required !';
                }
                let regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                if (!regexEmail.test(this.email) && this.errors.email === '') {
                    isValid = true;
                    this.errors.email = 'Please enter format email.';
                }
                // End: Check valid email

                if(!isValid){
                    let data = {'email': this.email};
                    API.POST(ApiConst.FORGOT_PASS_REQUEST, data).then(res => {
                        if (res.error_code === 0) {
                            alert('We have sent you an email, please check and follow the instructions.');
                            this.$router.push({name: 'login'});
                        } else {
                            switch(res.error_code){
                                case 2:
                                    alert(res.error_msg);
                                    break;
                                default:
                                    alert('Can\'t sent email');
                                    break;
                            }

                        }
                    });
                }
            }
        },
        mounted(){
        }
    };
</script>

<style scoped>
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

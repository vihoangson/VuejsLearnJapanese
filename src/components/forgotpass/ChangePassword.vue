<template>
    <div id="login">
        <header>
            <img src="https://lampart-vn.com/wp-content/uploads/2019/02/logo.png" alt srcset />
        </header>
        <section class="login-content">
            <div class="login-inner">
                <h2 class="title">Change password</h2>
                <form name="login" class="login" method="post" @submit="mchangePassword">
                    <span class="error">{{errors.login_fail}}</span>
                    <div class="login-form-row">
                        <label for="email">New password</label>
                        <div class="login-email">
                            <input type="password" v-model="m_password" required minlength="8" />
                        </div>
                        <span class="error">{{errors.m_password}}</span>
                    </div>
                    <div class="login-form-row">
                        <label for="email">Confirm new password</label>
                        <div class="login-email">
                            <input type="password" v-model="m_password_c" required minlength="8" />
                        </div>
                        <span class="error">{{errors.m_password_c}}</span>
                    </div>

                    <!--<vue-recaptcha @verify="markRecaptchaAsVerified" class="recapcha" sitekey="6LexDawUAAAAAP2dVouECeGm63c78bbwGtqJe-G1" :loadRecaptchaScript="true"></vue-recaptcha>-->
                    <span class="error">{{errors.pleaseTickRecaptchaMessage}}</span>

                    <div class="login-form-row login-button">
                        <button type="button" class="btn btn-default" @click="btnBack" >Back</button>
                        <input type="submit" value="Change password" class="btn btn-login" />
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
import { API } from '../../services/api';
import { ApiConst } from '../../common/ApiConst';
// import VueRecaptcha from 'vue-recaptcha';

export default {
    name: 'EnterEmail',
    components: {},
    data() {
        return {
            errors: {
                email: '',
                password: '',
                pleaseTickRecaptchaMessage: '',
                m_password_c: '',
                m_password: '',
                login_fail: ''
            },
            email: '',
            password: '',
            recaptchaVerified: true
        };
    },
    methods: {
        btnBack(e){
            this.$router.push({ name: 'login' });
        },
        mchangePassword(e) {
            e.preventDefault();
            let isValid = false;

            if (this.m_password === '') {
                this.errors.m_password = '* Password required!';
                isValid = true;
            }
            if (this.m_password_c === '') {
                this.errors.m_password_c = '* Password required!';
                isValid = true;
            }
            if (this.m_password_c !== this.m_password) {
                this.errors.m_password_c =
                    '* Password and confirm password not same';
                isValid = true;
            }

            let tokenResetPass = localStorage.getItem('token_resetpass');
            let data = {
                password_c: this.m_password_c,
                password: this.m_password,
                token: tokenResetPass
            };

            if (!isValid) {
                API.POST(ApiConst.FORGOT_PASS_CHANGE_PASS, data).then(res => {
                    console.log(res);
                    if (res.error_code === 0) {
                        alert('Change password successfully !');
                        this.$router.push({ name: 'login' });
                    } else {
                        switch (res.error_code) {
                            case 2:
                                alert('Token does not exist or expires');
                                return this.$router.push({ name: 'login' });
                            default:
                                alert(
                                    'Change password fail ! ' +
                                        res.error_msg +
                                        ' : ' +
                                        res.data
                                );
                                break;
                        }
                    }
                });
            }
        }
    },
    mounted() {}
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

.btn-default {
    background-color: #ccc;
    width: 200px;
    font-size: 16px;
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

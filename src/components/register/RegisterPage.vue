<template>
    <div id="register">
        <header>
            <img src="https://lampart-vn.com/wp-content/uploads/2019/02/logo.png" alt srcset />
        </header>
        <div class="register-content">
            <div class="register-inner">
                <h2>REGISTER</h2>
                <form class="register">
                    <div v-if="msg !== ''">
                        <label class="show-error">{{ msg }}</label>
                    </div>
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
                        <label>Company</label>
                        <input
                            v-model="company"
                            type="text"
                            name="company"
                            class="form-control register-input"
                        />
                        <div class="error" v-if="errors.company !== ''">{{errors.company}}</div>
                    </div>
                    <div class="form-group register-form-row">
                        <label>Email</label>
                        <input
                            v-model="email"
                            type="email"
                            name="email"
                            class="form-control register-input"
                        />
                        <div class="error" v-if="errors.email !== ''">{{errors.email}}</div>
                    </div>
                    <div class="form-group register-form-row">
                        <label>Password</label>
                        <input
                            v-model="password"
                            type="password"
                            name="password"
                            class="form-control register-input"
                        />
                        <div class="error" v-if="errors.password !== ''">{{errors.password}}</div>
                    </div>
                    <div class="form-group register-form-row">
                        <label>Confirm password</label>
                        <input
                            v-model="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            class="form-control register-input"
                        />
                        <div
                            class="error"
                            v-if="errors.confirmPassword !== ''"
                        >{{errors.confirmPassword}}</div>
                    </div>
                    <div class="form-group register-form-row">
                        <!-- <vue-recaptcha
                            @verify="markRecaptchaAsVerified"
                            class="recapcha"
                            sitekey="6LexDawUAAAAAP2dVouECeGm63c78bbwGtqJe-G1"
                            :loadRecaptchaScript="true"
                        ></vue-recaptcha> -->
                        <div
                            class="error"
                            v-if="errors.pleaseTickRecaptchaMessage !== ''"
                        >{{errors.pleaseTickRecaptchaMessage}}</div>
                    </div>
                    <div class="form-group register-button">
                        <button class="btn btn-register" type="button" @click="save">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { API } from '../../services/api';
import { ApiConst } from '../../common/ApiConst';
import VueRecaptcha from 'vue-recaptcha';
export default {
    name: 'Register',
    components: { VueRecaptcha },
    mixins: [],
    props: {},
    data() {
        return {
            errors: {
                name: '',
                company: '',
                email: '',
                password: '',
                confirmPassword: '',
                pleaseTickRecaptchaMessage: ''
            },
            name: '',
            company: '',
            email: '',
            password: '',
            confirmPassword: '',
            recaptchaVerified: true,
            msg: ''
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        markRecaptchaAsVerified(response) {
            this.errors.pleaseTickRecaptchaMessage = '';
            this.recaptchaVerified = true;
        },
        checkValidateForm() {
            let isValid = false;
            this.errors.name = '';
            this.errors.company = '';
            this.errors.email = '';
            this.errors.password = '';
            this.errors.confirmPassword = '';
            this.errors.pleaseTickRecaptchaMessage = '';

            if (this.name === '') {
                isValid = true;
                this.errors.name = 'Name required !';
            }

            if (this.name.length > 55 && this.errors.name === '') {
                isValid = true;
                this.errors.name = 'Max length is 55 characteristics.';
            }

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
            let regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
            if (!regexEmail.test(this.email) && this.errors.email === '') {
                isValid = true;
                this.errors.email = 'Email invalid.';
            }

            if (this.password === '') {
                isValid = true;
                this.errors.password = 'Password required !';
            }

            if (this.confirmPassword === '') {
                isValid = true;
                this.errors.confirmPassword = 'Confirm password required !';
            }

            if (
                this.password !== this.confirmPassword &&
                this.errors.confirmPassword === ''
            ) {
                isValid = true;
                this.errors.confirmPassword =
                    'Password and confirm password are not the same.';
            }

            if (!this.recaptchaVerified) {
                isValid = true;
                this.errors.pleaseTickRecaptchaMessage =
                    'Please tick recaptcha!';
            }

            return isValid;
        },
        save() {
            if (this.checkValidateForm()) return;
            let data = {
                name: this.name,
                company: this.company,
                email: this.email,
                password: this.password
            };
            API.POST(ApiConst.REGISTER, data).then(res => {
                if (res.error_code === 0) {
                    this.$router.push({ name: 'login' });
                } else {
                    this.msg = 'Duplicate email.';
                }
            });
        }
    }
};
</script>

<style scoped>
header {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 960px;
    margin: 0 auto;
    padding-top: 20px;
}
.register-inner {
    width: 760px;
    margin: 0 auto;
}
.register-content {
    padding: 50px 0 50px 0;
    background-color: #fff;
}
.register-inner h2 {
    font-size: 2em;
    font-weight: 300;
    line-height: 1.4;
}
.register {
    padding: 25px 70px 30px;
    margin-bottom: 30px;
    border-radius: 4px;
    background-color: #f5f5f4;
}
.register label {
    box-sizing: border-box;
    color: #34362f;
    font-size: 0.875em;
    font-weight: 700;
    line-height: 1;
}
.register-button {
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
.btn-register {
    background-color: #f9423a;
    width: 200px;
    font-size: 16px;
}
.error {
    color: red;
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
    margin-bottom: 24px;
}
.register input[type='text'],
.register input[type='email'],
.register input[type='password'] {
    outline: none;
    border: none;
    width: 100%;
    padding: 7px;
    font-size: 18px;
}
</style>

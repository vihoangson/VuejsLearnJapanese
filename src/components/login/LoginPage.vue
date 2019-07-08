<template>
	<div id="login">
		<header>
			<img src="https://lampart-vn.com/wp-content/uploads/2019/02/logo.png" alt srcset />
		</header>
		<section class="login-content">
			<div class="login-inner">
				<h2 class="title">LOGIN</h2>
				<form name="login" class="login" method="post" @submit="login">
					<div class="login-form-row">
						<label for="email">Email Address</label>
						<div class="login-email">
							<input type="text" v-model="username"/>
						</div>
            <span class="error">{{errors.username}}</span>
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
          <vue-recaptcha @verify="markRecaptchaAsVerified" class="recapcha" sitekey="6LexDawUAAAAAP2dVouECeGm63c78bbwGtqJe-G1" :loadRecaptchaScript="true"></vue-recaptcha>
          <span class="error">{{errors.pleaseTickRecaptchaMessage}}</span>
					<div class="login-form-row login-button">
						<input type="submit" value="Login" class="btn btn-login" />
					</div>
				</form>
			</div>
		</section>
	</div>
</template>
<style scoped>
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
	content: "";
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
.login input[type="text"],
.login input[type="email"],
.login input[type="password"] {
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
.error{
  color: red;
}
.recapcha div{
  width: 100% !important;
  text-align: center;
}
</style>

<script>
import axios from 'axios'
import VueRecaptcha from 'vue-recaptcha';

export default {
  name: "Login",
  components: {
    VueRecaptcha
  },
  data () {
    return {
      errors: {
        username: "",
        password: "",
        pleaseTickRecaptchaMessage: ""
      },
      username: "",
      password: "",
      recaptchaVerified: false
    }
  },
	methods: {
    markRecaptchaAsVerified(response) {
      this.errors.pleaseTickRecaptchaMessage = '';
      this.recaptchaVerified = true;
    },
		login (e) {
      e.preventDefault();

      if (this.username === "")
        this.errors.username = '* Userame required!'

      if (this.password === "")
        this.errors.password = '* Password required!'

      if(!this.recaptchaVerified)
        this.errors.pleaseTickRecaptchaMessage = '* Please tick recaptcha!'

      if(this.username !== "" && this.password !== "" && this.recaptchaVerified){
        axios.post("http://172.16.100.31/api/v1/user/login",{
          username: this.username,
          password: this.password,
          only_token: true
        })
          .then(res => {
            let user = {
              token: res.data.data.api_token,
              email: res.data.data.email,
              employee: res.data.data.employee
            };
            localStorage.setItem("user", user);
            this.$router.push({ path: "/" });
          })
      }
		}
	}
};
</script>


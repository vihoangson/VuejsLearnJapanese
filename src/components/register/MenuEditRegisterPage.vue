<template>
    <div id="register" class="sidebar">
        <ul>
            <li class="moreMenu">
                <h1>Account</h1>
                <ul>
                    <li>Login Credentials</li>
                </ul>
            </li>
        </ul>
        <!--<div class="register-content">-->
        <!--<div class="register-inner">-->
        <!--<h2>Account</h2>-->
        <!--<div>Login Credentials</div>-->
        <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
export default {
    name: 'MenuEditRegister',
    components: {},
    mixins: [],
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
};
</script>

<style scoped>
ul {
    list-style: none;
}
li {
    border-top-color: initial;
    border-right-color: initial;
    border-bottom-color: initial;
    border-left-color: initial;
    outline-color: initial;
    background-image: initial;
    display: list-item;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
}
.moreMenu {
    border-bottom-color: rgb(209, 204, 195);
    /*border-bottom: 1px solid #e1e1e0;*/
}
.sidebar {
    width: 220px;
    border-top-color: initial;
    border-right-color: initial;
    border-bottom-color: initial;
    border-left-color: initial;
    outline-color: initial;
    background-image: initial;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
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
    width: 760px;
    margin: 0 auto;
}
.register-content {
    /*background-color: #fff;*/
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

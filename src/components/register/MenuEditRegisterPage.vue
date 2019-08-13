<template>
    <div id="register" class="sidebar">
        <ul>
            <li class="moreMenu">
                <h1><span style="color: red">|</span> Account</h1>
                <h1>Login Credentials</h1>
            </li>
        </ul>
        <div class="back-to-home">
            <button type="button" class="back-button" @click="backHome">Back to home</button>
        </div>
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
    methods: {
        backHome () {
            this.$router.push({ name: 'home' });
        }
    }
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
    font-size: 14px;
    vertical-align: baseline;
    background: transparent;
}
.back-to-home {
    text-align: center;
}
.back-to-home .back-button {
    width: 80%;
    border: 1px black solid;
    padding: 2px;
    background-color: #eae7e1;
    border-radius: 3px;
    font-size: 14px;
}
.moreMenu {
    border-bottom-color: rgb(209, 204, 195);
    position: relative;
    right: 26px;
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
.moreMenu > h1 {
    font-size: 14px !important;
}
</style>

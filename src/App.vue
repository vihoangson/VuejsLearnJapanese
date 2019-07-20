<template>
    <div id="app">
        <router-view @authenticated="setAuthenticated" />
        <modals-container />
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            authenticated: false,
            mockAccount: {
                username: 'syhung@gmail.com',
                password: 'password'
            }
        };
    },
    mounted() {
        let user = localStorage.getItem('user');

        // if (!user) {
        //     this.$router.push({ path: 'login' });
        // }
    },
    methods: {
        setAuthenticated(status) {
            this.authenticated = status;
        },
        logout() {
            this.authenticated = false;
        }
    }
};
</script>

<style>
body {
    margin: 0px;
    font-family: Arial, Helvetica, sans-serif;
}
.content {
    position: relative;
    top: 45px;
    width: 100%;
    height: calc(100% - 42px);
    z-index: 1;
}
/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>

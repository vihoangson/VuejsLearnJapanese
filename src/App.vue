<template>
    <div id="app">
        <router-view @authenticated="setAuthenticated" />
        <modals-container />
        <div class="loader"  v-if="$store.getters.get_loading_page">
            <img src="/static/img/loading.gif">
        </div>
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            authenticated: false,
        };
    },
    created() {
        let user = localStorage.getItem('user');
        if (user === null) {
            let pathname = window.location.pathname;
            if(pathname.match('forgot-password') != null || pathname.match('changepass') != null){

            }else{
                this.$router.push({ path: 'login' });
            }
        }
    },
    mounted() {},
    methods: {
        setAuthenticated(status) {
            this.authenticated = status;
        },
        logout() {
            this.authenticated = false;
        },
    }
};
</script>

<style>


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
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1;
}
</style>

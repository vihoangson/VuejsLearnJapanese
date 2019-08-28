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
            isMultiSelectEmoji: false
        };
    },
    created() {
        let user = localStorage.getItem('user');
        if (user === null) {
            let pathname = window.location.pathname;
            if (
                pathname.match('forgot-password') != null ||
                pathname.match('changepass') != null
            ) {
            } else {
                this.$router.push({ path: 'login' });
            }
        }
    },
    mounted() {
        document.addEventListener('click', function(e) {
            if (!this.isMultiSelectEmoji) {
                let popups = document.getElementsByClassName('popup');
                for (let i = 0; i < popups.length; i++)
                    popups[i].style.display = 'none';
                document.removeEventListener('keydown', function(e) {});
                document.removeEventListener('keyup', function(e) {});
            }

            if (e.target.id === 'my-account') {
                document.getElementById('menu-my-account').style.display =
                    'block';
            }
            if (e.target.id === 'create-room') {
                document.getElementById('menu-create-new-room').style.display =
                    'block';
            }
            if (e.target.id === 'icon-config-all') {
                document.getElementById('listFile').style.display = 'block';
            }

            if (e.target.id === 'showToMemberList') {
                document.getElementById('toMemberList').style.display = 'block';
            }

            if (e.target.id === 'showEmojiList') {
                document.getElementById('emojiList').style.display = 'block';
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Shift') this.isMultiSelectEmoji = true;
                });
                document.addEventListener('keyup', function(e) {
                    if (e.key === 'Shift') this.isMultiSelectEmoji = false;
                });
            }
        });
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
.popup {
    display: 'block' !important;
}
pre img.ui_emoticon {
    width: 20px;
    height: 20px;
    margin: 0 3px 3px 3px;
}
</style>

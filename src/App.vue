<template>
    <div id="app">
        <router-view @authenticated="setAuthenticated" />
        <modals-container />
        <div class="loader" v-if="$store.getters.get_loading_page">
            <img src="/static/img/loading.gif" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            authenticated: false,
            isMultiSelectEmoji: false,
            isMultiSelectToMember: false
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
            }
        }
    },
    mounted() {
        document.addEventListener('click', function(e) {
            if (!(this.isMultiSelectEmoji || this.isMultiSelectToMember)) {
                let popups = document.getElementsByClassName('popup');
                 for (let i = 0; i < popups.length; i++){
                     if (!(this.isMultiSelectEmoji || this.isMultiSelectToMember)) {
                         popups[i].style.display = 'none';
                     }
                }
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
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Control') this.isMultiSelectToMember = true;
                });
                document.addEventListener('keyup', function(e) {
                    if (e.key === 'Control') {
                        this.isMultiSelectToMember = false;
                    }
                });
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
            let popups = document.getElementsByClassName('test');
                 for (let i = 0; i < popups.length; i++){
                     if (popups[i].style.display === 'block') {
                         popups[i].style.display = 'none';
                     }
                }
        });
    },
    methods: {
        removeToListMember(){
            this.$store.dispatch('saveToListMember',"x");
        },

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
.loader img {
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

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1;
    font-family: -apple-system, BlinkMacSystemFont, '.SFNSDisplay-Regular',
        'Segoe UI', 'Helvetica Neue', 'Hiragino Sans',
        '\30D2\30E9\30AE\30CE\89D2\30B4\30B7\30C3\30AF',
        'Hiragino Kaku Gothic ProN', '\30D2\30E9\30AE\30CE\89D2\30B4   ProN W3',
        Meiryo, '\30E1\30A4\30EA\30AA', 'MS PGothic',
        '\FF2D\FF33   \FF30\30B4\30B7\30C3\30AF', sans-serif;
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

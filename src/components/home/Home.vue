<template>
    <div id="home">
        <Header></Header>
        <div class="content">
            <Room></Room>
            <Chat></Chat>
        </div>
    </div>
</template>
<style>
.content {
    position: relative;
    top: 42px;
    width: 100%;
    height: calc(100% - 42px);
    z-index: 1;
}
</style>

<script>
import Header from '../global/Header';
import Room from '../chat/RoomChat';
import Chat from '../chat/ChatBox';
export default {
    name: 'Home',
    components: {
        Header,
        Room,
        Chat
    },
    created() {
        // let user = localStorage.getItem('user');
        let user = {
            user_id: 1,
            icon_img: '',
            name: 'Hoàng Sỹ Hùng',
            token: 'gfgfdcdasdsad'
        };
        this.$store.dispatch('setCurrentUser', user);
    },
    beforeRouteUpdate(to, from, next) {
        console.log(to);
        console.log(from);
        console.log(next);
    }
};
</script>

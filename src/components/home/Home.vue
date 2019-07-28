<template>
    <div id="home">
        <Header></Header>
        <div class="content">
            <Room @changeRoomEvent="changeRoomEvent"></Room>
            <Chat ref="chat"></Chat>
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
import { AppConst } from '../../common/AppConst';
export default {
    name: 'Home',
    components: {
        Header,
        Room,
        Chat
    },
    created() {
        // let user = localStorage.getItem('user');

        // this.$store.dispatch('setCurrentUser', JSON.parse(user));
        let user = {
            user_id: 1,
            icon_img: '',
            name: 'hoàng Sỹ Hùng'
        }
        this.$store.dispatch('setCurrentUser', user);
    },
    // beforeRouteUpdate(to, from, next) {
    //     let room = this.$route.params.room_id;
    //     console.log(room);
    //     next();
    // },
    methods: {
        changeRoomEvent() {
            let chatBox = this.$refs.chat;
            chatBox.editMessage = false;
            chatBox.message.content = '';
            chatBox.message.id = 0;
            chatBox.message.type = AppConst.MESSAGE_TYPE.CREATE;
            var container = this.$el.querySelector('.timeline-message');
            container.scrollTop = container.scrollHeight;
        }
    }
};
</script>

<template>
    <div id="home">
        <Notice></Notice>
        <Header></Header>
        <AddUser></AddUser>
        <EditUser></EditUser>
        <ShowUser></ShowUser>
        <div class="content">
            <Room @changeRoomEvent="changeRoomEvent"></Room>
            <Chat ref="chat"></Chat>
        </div>
        <Rooms></Rooms>
        <Group></Group>
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
import Notice from '../global/Notice';
import Header from '../global/Header';
import Room from '../room/RoomChat';
import Chat from '../chat/ChatBox';
import Rooms from '../room/Rooms';
import Group from '../group/Group';
import AddUser from '../room/AddUser';
import EditUser from '../room/EditUser';
import ShowUser from '../room/ShowUser';
import { AppConst } from '../../common/AppConst';
export default {
    name: 'Home',
    components: {
        Header,
        Room,
        Chat,
        Rooms,
        Group,
        AddUser,
        EditUser,
        ShowUser,
        Notice
    },
    created() {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user !== null) {
            this.$store.dispatch('setCurrentUser', user);
            this.$socket.emit(
                AppConst.EVENT_MESSAGE.CHANNEL_NEW_ROOM,
                user.user_id
            );
            this.setNotification();
        }
        this.$root.$on('event-get-list-message', () => {
            this.changeRoomEvent();
        });
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
        },
        setNotification() {
            if (!window.Notification) {
                alert('Trình duyệt của bạn không hỗ trợ chức năng này.');
            } else {
                Notification.requestPermission(function(p) {
                    console.log(p);
                });
            }
        }
    }
};
</script>

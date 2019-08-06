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
            <Contact></Contact>
            <PersonalInfo></PersonalInfo>
            <EditPersonalInfo></EditPersonalInfo>
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
import Contact from '../contact/Contact';
import PersonalInfo from '../personal_info/PersonalInfo';
import EditPersonalInfo from '../personal_info/EditPersonalInfo';
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
        Notice,
        Contact,
        PersonalInfo,
        EditPersonalInfo
    },
    created() {
        let user = localStorage.getItem('user');
        if (user) {
            this.$socket.emit(
                AppConst.EVENT_MESSAGE.CHANNEL_NEW_ROOM,
                user.user_id
            );
            this.$store.dispatch('setCurrentUser', JSON.parse(user));
            this.setNotification();
        }

        let userInfo = localStorage.getItem(AppConst.LOCAL_USER_INFO);
        if (userInfo)
            this.$store.dispatch('setCurrentUserInfo', JSON.parse(userInfo));
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

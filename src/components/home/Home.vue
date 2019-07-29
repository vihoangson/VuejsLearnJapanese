<template>
    <div id="home">
        <Header></Header>
        <div class="content">
            <Room @changeRoomEvent="changeRoomEvent"></Room>
            <Chat ref="chat"></Chat>
            <Contact></Contact>
            <PersonalInfo></PersonalInfo>
            <EditPersonalInfo></EditPersonalInfo>
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
import Contact from '../contact/Contact';
import PersonalInfo from '../personal_info/PersonalInfo';
import EditPersonalInfo from '../personal_info/EditPersonalInfo';
export default {
    name: 'Home',
    components: {
        Header,
        Room,
        Chat,
        Contact,
        PersonalInfo,
        EditPersonalInfo
    },
    created() {

        let user = localStorage.getItem('user');

        this.$store.dispatch('setCurrentUser', JSON.parse(user));

        let userInfo = localStorage.getItem(AppConst.LOCAL_USER_INFO);

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
        }
    }
};
</script>

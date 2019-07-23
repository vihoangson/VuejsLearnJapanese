<template>
    <div id="home">
        <Header></Header>
        <div class="content">
            <Room></Room>
            <Chat></Chat>
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
        // let user = localStorage.getItem('user');
        // this.$store.dispatch('setCurrentUser', JSON.parse(user));
        //
        // let userInfo = localStorage.getItem('user_info');
        // this.$store.dispatch('setCurrentUserInfo', JSON.parse(userInfo));
    },

};
</script>

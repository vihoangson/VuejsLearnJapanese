<template>
    <div id="home">
        <Header></Header>
        <div class="content">
            <Room></Room>
            <Chat></Chat>
            <Contact></Contact>
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
export default {
    name: 'Home',
    components: {
        Header,
        Room,
        Chat,
        Contact
    },
    created() {
        let user = localStorage.getItem('user');

        this.$store.dispatch('setCurrentUser', JSON.parse(user));
    },
    beforeRouteUpdate(to, from, next) {
        console.log(to);
        console.log(from);
        console.log(next);
    }
};
</script>

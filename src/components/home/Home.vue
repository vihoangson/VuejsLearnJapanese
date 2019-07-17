<template>
    <div id="home">
        <Header></Header>
        <div class="content">
            <Room></Room>
            <Chat></Chat>
            <Contact></Contact>
            <PersonalInfo></PersonalInfo>
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
    import Header from '../global/Header'
    import Room from '../chat/RoomChat'
    import Chat from '../chat/ChatBox'
    import Contact from '../contact/Contact'
    import PersonalInfo from '../personal_info/PersonalInfo'

    export default {
        name: "Home",
        components: {
            Header,
            Room,
            Chat,
            Contact,
            PersonalInfo
        }
    };
</script>

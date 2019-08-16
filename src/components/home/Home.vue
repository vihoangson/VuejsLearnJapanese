<template>
    <div id="home">
        <Notice></Notice>
        <Header></Header>
        <AddUser></AddUser>
        <EditUser></EditUser>
        <ShowUser></ShowUser>
        <DeleteRoom></DeleteRoom>
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
import { API } from '../../services/api';
import { ApiConst } from '../../common/ApiConst';
import { AppConst } from '../../common/AppConst';

import Notice from '../global/Notice';
import Header from '../global/Header';
import Room from '../room/RoomChat';
import Chat from '../chat/ChatBox';
import Rooms from '../room/Rooms';
import DeleteRoom from '../room/DeleteRoom';
import Group from '../group/Group';
import AddUser from '../room/AddUser';
import EditUser from '../room/EditUser';
import ShowUser from '../room/ShowUser';
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
        DeleteRoom,
        Group,
        AddUser,
        EditUser,
        ShowUser,
        Notice,
        Contact,
        PersonalInfo,
        EditPersonalInfo,
    },
    data() {
        return {
            list_rooms: [],
            rooms: []
        };
    },
    mounted() {
        this.$root.$on('change-room', data => {
            this.changeRoom(data);
        });
    },
    created() {
        this.getListRoom();
        this.getListUser();
        let user = localStorage.getItem('user');
        if (user) {
            this.$socket.emit(
                AppConst.EVENT_MESSAGE.CHANNEL_NEW_ROOM,
                user.user_id
            );
            this.$store.dispatch('setCurrentUser', JSON.parse(user));
            this.setNotification();
        }
        this.$root.$on('event-get-list-message', () => {
            this.changeRoomEvent();
        });
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
        },
        getListRoom() {
            API.GET(ApiConst.ALL_ROOM).then(res => {
                if (res.error_code === 0) {
                    let rooms = res.data;
                    rooms.forEach(x => {
                        x.color = '';
                        this.rooms.push(x.room_id);
                    });
                    rooms.sort((a, b) => {
                        return b.is_mychat - a.is_mychat;
                    });

                    this.$socket.emit(
                        AppConst.EVENT_MESSAGE.JOIN_BY_LIST_ROOM,
                        this.rooms
                    );
                    this.$store.dispatch('setListRoom', rooms);
                    let roomId = this.$route.params.pathMatch;
                    if (roomId === undefined) {
                        roomId = rooms[0].room_id;
                        this.$router.push('/rid-' + roomId);
                        this.changeRoom(rooms[0]);
                        this.getListMessage(rooms[0]);
                    } else {
                        let room = rooms.find(function(d) {
                            return d.room_id === parseInt(roomId);
                        });
                        this.changeRoom(room);
                        this.getListMessage(room);
                    }

                }
            });
        },
        getListUser() {
            API.GET(ApiConst.GET_ALL_USER).then(res => {
                if (res.error_code === 0)
                    this.$store.dispatch('setListUser', res.data);
            });
        },
        changeRoom(room) {
            this.$store.dispatch('setCurrentRoom', room);
            this.getListMessage(room);
            room.color = '#bfbab0';
            room.not_read = 0;
            let rooms = this.$store.getters.get_list_room;
            rooms.forEach(x => {
                if (room.room_id !== x.room_id) {
                    x.color = '';
                }
            });
            this.$root.$emit('changed-info-rooms');
            let roomId = room.room_id;
            this.$router.push('/rid-' + roomId);
        },
        getListMessage(room) {
            API.POST(ApiConst.RECEIVE_MESSAGE, {
                page: 0,
                room_id: room.room_id
            }).then(res => {
                if (res.error_code === 0) room.list_message = res.data;
                setTimeout(() => {
                    this.$root.$emit('event-get-list-message');
                }, 1);
            });
        }
    }
};
</script>

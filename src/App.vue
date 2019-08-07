<template>
    <div id="app">
        <router-view @authenticated="setAuthenticated" />
        <modals-container />
    </div>
</template>

<script>
import { API } from './services/api';
import { ApiConst } from './common/ApiConst';
import { AppConst } from './common/AppConst';
export default {
    name: 'App',
    data() {
        return {
            authenticated: false,
            list_rooms: [],
            rooms: []
        };
    },
    created() {
        let user = localStorage.getItem('user');

        if (user === null) {
            this.$router.push({ path: 'login' });
        }
        this.$root.$on('change-room', data => {
            this.changeRoom(data);
        });
        this.$root.$on('get-list-rooms', ()=>{
            this.getListRoom();
        });
    },
    mounted() {},
    methods: {
        setAuthenticated(status) {
            this.authenticated = status;
        },
        logout() {
            this.authenticated = false;
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
            this.$root.$emit('changed-id-rooms');
            let roomId = room.room_id;
            this.$router.push('/rid-' + roomId)
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

<style>
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

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>

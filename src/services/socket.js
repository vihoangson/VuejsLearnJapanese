import { AppConst } from '../common/AppConst';

export const SocketService = {
    connect: function() {
        console.log('Connect socket.io successful!!');
        let rooms = this.$store.getters.get_list_room;
        if (rooms.length > 0) {
            let roomIds = [];
            rooms.forEach(x => {
                roomIds.push(x.room_id);
            });
            this.$socket.emit(
                AppConst.EVENT_MESSAGE.JOIN_BY_LIST_ROOM,
                roomIds
            );
        }
        let user = JSON.parse(localStorage.getItem('user'));
        if (user.user_id !== null && user.user_id !== undefined) {
            this.$socket.emit(
                AppConst.EVENT_MESSAGE.CHANNEL_NEW_ROOM,
                user.user_id
            );
            this.$socket.emit(
                AppConst.EVENT_MESSAGE.CHANNEL_REMOVE_ROOM,
                user.user_id
            );
            this.$socket.emit(
                AppConst.EVENT_MESSAGE.CHANNEL_CHANGE_ROOM,
                user.user_id
            );
        }
    },
    broadcast: function(e) {
        var room = this.$store.getters.get_current_room;
        if (room.room_id === e.room_id) {
            if (e.type === AppConst.MESSAGE_TYPE.CREATE) {
                this.$store.dispatch('addMessage', e);
                setTimeout(
                    () => {
                        var container = this.$el.querySelector(
                            '.timeline-message'
                        );
                        container.scrollTop = container.scrollHeight;
                    },

                    1
                );
                this.$store.dispatch('setNotification', e);
            } else if (e.type === AppConst.MESSAGE_TYPE.EDIT) {
                this.$store.dispatch('editMessage', e);
            } else if (e.type === AppConst.MESSAGE_TYPE.DELETE) {
                this.$store.dispatch('removeMessage', e);
            }
        } else {
            if (e.type === AppConst.MESSAGE_TYPE.CREATE) {
                this.$store.dispatch('notReadMessage', e);
                this.$store.dispatch('setNotification', e);
            } else {
                this.$store.dispatch('editMessage', e);
            }
        }
    },
    new_room: function(data) {
        this.$store.dispatch('addNewRoom', data);
    },
    remove_room: function(data){
        if (data !== undefined) {
            let list = this.$store.getters.get_list_room;
            for(let i in list){
                if(list[i].room_id === data.room_id){
                    this.$store.getters.get_list_room.splice(i, 1);
                }
            };
        }
    },
    change_room: function(room){
        var listRoom = this.$store.getters.get_list_room;
        for (let i in listRoom) {
            if (listRoom[i].room_id === room.room_id) {
                var userAdd = [];
                var listAdd = [];
                for (let j in room.selected) {
                    var length = listRoom[i].member_list.length;
                    if (room.selected[j] !== null && room.selected[j].id !== undefined) {
                        for (let i in this.$store.getters.get_list_user) {
                            if (this.$store.getters.get_list_user[i].id === room.selected[j].id) {
                                userAdd = this.$store.getters.get_list_user[i];
                            }
                        }
                        var roleInRoom = room.selected[j].permission;
                        listRoom[i].member_list[length] = {
                            company: userAdd.company,
                            email: userAdd.email,
                            icon_img: userAdd.icon_img,
                            id: userAdd.id,
                            name: userAdd.name,
                            role_in_room: roleInRoom
                        };
                    }
                }
            }
        }
        this.$store.dispatch('setListRoom', listRoom);
        this.$root.$emit('changed-info-rooms');
    }
};

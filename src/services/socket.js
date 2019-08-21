import { connect } from './socket/connect';
import { broadcast } from './socket/broadcast';
import { changeRoom } from './socket/changeRoom';
import { AppConst } from '../common/AppConst';

export const SocketService = {
    connect: function() {
        let rooms = this.$store.getters.get_list_room;
        connect(
            this.$socket,
            rooms
        );
    },
    broadcast: function(e) {
        broadcast(this.$store, this.$el, e);
    },
    new_room: function(data) {
        console.log(data);
        this.$store.dispatch('addNewRoom', data);
        this.$root.$emit('changed-info-rooms');
        this.$socket.emit(AppConst.EVENT_MESSAGE.JOIN_NEW_ROOM, data.room_id);
    },
    remove_room: function(data) {
        if (data !== undefined) {
            let list = this.$store.getters.get_list_room;
            for (let i in list) {
                if (list[i].room_id === data.room_id) {
                    this.$store.getters.get_list_room.splice(i, 1);
                }
            }
        }
    },
    change_room: function(e) {
        changeRoom(this.$store, e);

        this.$root.$emit('changed-info-rooms');
    }
};

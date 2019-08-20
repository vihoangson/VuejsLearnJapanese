import { connect } from './socket/connect';
import { broadcast } from './socket/broadcast';
import { changeRoom } from './socket/changeRoom';

export const SocketService = {
    connect: connect(),
    broadcast: function(e) {
        broadcast(e);
    },
    new_room: function(data) {
        this.$store.dispatch('addNewRoom', data);
        this.$root.$emit('changed-info-rooms');
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
    change_room: function(e){
        changeRoom(e);
    }
};

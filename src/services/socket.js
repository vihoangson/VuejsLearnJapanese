import { AppConst } from '../common/AppConst';
export const SocketService = {
    connect: function() {
        console.log('Connected..');
    },
    broadcast: function(e) {
        var room = this.$store.getters.get_current_room;
        if (room.room_id === e.room_id) {
            if (e.type === AppConst.MESSAGE_TYPE.CREATE)
                this.$store.dispatch('addMessage', e);
            else if (e.type === AppConst.MESSAGE_TYPE.EDIT) {
                this.$store.dispatch('editMessage', e);
            } else if (e.type === AppConst.MESSAGE_TYPE.DELETE) {
                console.log(e);
                this.$store.dispatch('removeMessage', e);
            }
        }
        else{
            if (e.type === AppConst.MESSAGE_TYPE.CREATE){
                this.$store.dispatch('notReadMessage', e);
            }
            else{
                this.$store.dispatch('editMessage', e);
            }
        }
    }
};

import { AppConst } from '../common/AppConst';

export const SocketService = {
    connect: function(socket) {
        
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
    }
};

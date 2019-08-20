import { AppConst } from '../../common/AppConst';

export function broadcast(store, el, e) {
    var room = store.getters.get_current_room;
    if (room.room_id === e.room_id) {
        if (e.type === AppConst.MESSAGE_TYPE.CREATE) {
            store.dispatch('addMessage', e);
            setTimeout(
                () => {
                    var container = el.querySelector('.timeline-message');
                    container.scrollTop = container.scrollHeight;
                },

                1
            );
            store.dispatch('setNotification', e);
        } else if (e.type === AppConst.MESSAGE_TYPE.EDIT) {
            store.dispatch('editMessage', e);
        } else if (e.type === AppConst.MESSAGE_TYPE.DELETE) {
            store.dispatch('removeMessage', e);
        }
    } else {
        if (e.type === AppConst.MESSAGE_TYPE.CREATE) {
            store.dispatch('notReadMessage', e);
            store.dispatch('setNotification', e);
        } else {
            store.dispatch('editMessage', e);
        }
    }
}

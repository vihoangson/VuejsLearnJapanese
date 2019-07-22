export default {
    add_message(state, message) {
        return state.current_room.list_message.push(message);
    },
    edit_message(state, message) {
        console.log(message);
        var msg = state.current_room.list_message.find(function(d) {
            return d.message_id === message.message_id;
        });
        if (msg !== undefined) {
            msg.message = message.message;
        }
    },
    remove_message(state, message) {
        var msg = state.current_room.list_message.find(function(d) {
            return d.message_id === message.message_id;
        });
        if (msg !== undefined) {
            var idx = state.current_room.list_message.indexOf(msg);
            if (idx > -1) state.current_room.list_message.splice(idx, 1);
        }
    },
    not_read_message(state, obj) {
        state.list_room.forEach(element => {
            if (obj.room_id === element.id) {
                element.list_message.push(obj);
                element.not_read += 1;
            }
        });
    },
    set_current_user(state, obj) {
        return (state.current_user = obj);
    },
    set_current_room(state, obj) {
        return (state.current_room = obj);
    },
    set_list_room(state, obj) {
        return (state.list_room = obj);
    }
};

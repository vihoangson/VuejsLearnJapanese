export default {
    add_message(state, message) {
        return state.current_room.list_message.push(message);
    },
    set_current_user(state, obj) {
        return (state.current_user = obj);
    },
    set_current_room(state, obj) {
        return (state.current_room = obj);
    },
    set_list_room(state, obj) {
        return (state.list_room = obj);
    },
    not_read_message(state, obj) {
        console.log(obj);
        state.list_room.forEach(element => {
            if (obj.room_id === element.id) {
                element.list_message.push(obj);
                element.not_read += 1;
            }
        });
    }
};

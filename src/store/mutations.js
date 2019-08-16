export default {
    add_message(state, message) {
        return state.current_room.list_message.push(message);
    },
    edit_message(state, message) {
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
            if (obj.room_id === element.room_id) {
                element.list_message.push(obj);
                element.not_read += 1;
            }
        });
    },
    set_current_user(state, obj) {
        return (state.current_user = obj);
    },
    set_current_room(state, obj) {
        //
        return (state.current_room = obj);
    },
    set_current_group(state, obj) {
        return (state.current_group = obj);
    },
    set_list_room(state, obj) {
        return (state.list_room = obj);
    },
    set_list_room_by_group(state, obj) {
        return (state.list_room_by_group = obj);
    },
    set_list_group(state, obj) {
        return (state.list_group = obj);
    },
    set_list_user(state, obj) {
        return (state.list_user = obj);
    },
    set_list_user_by_room_id(state, obj) {
        return (state.list_user_by_room_id = obj);
    },
    set_list_not_user_by_room_id(state, obj) {
        return (state.list_not_user_by_room_id = obj);
    },
    is_admin_room(state, obj) {
        return (state.is_admin_room = obj);
    },
    set_notification(state, obj) {
        if (state.current_user.user_id !== obj.user_info.id) {
            var notify = new Notification(
                obj.user_info.name + ' vừa nhắn tin cho bạn!',
                {
                    body: obj.message,
                    icon:
                        'https://cdn.iconscout.com/icon/free/png-256/office-mail-email-letter-message-receive-inbox-3-12654.png',
                    tag: 'https://www.chatwork.com/#!rid18156824',
                    renotify: true
                }
            );

            notify.onclick = function() {
                window.location.href = this.tag;
            };
        }
    },
    new_room(state, obj) {
        state.list_room.push(obj);
        state.list_room.sort((a, b) => {
            return b.is_mychat - a.is_mychat;
        });
    },
    set_current_user_info(state, obj) {
        return (state.current_user_info = obj);
    },
    set_list_message(state, list) {
        return (state.list_message = list);
    },
    setContactDisplay(state, style) {
        state.openContactDisplay = style;
    },
    setProfileDisplay(state, style) {
        state.openProfileDisplay = style;
    },
    setProfileEdit(state, style) {
        state.openProfileEdit = style;
    }
};

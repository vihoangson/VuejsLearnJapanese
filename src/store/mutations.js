export default {
    add_message(state, message) {
        return state.list_message.push(message)
    },
    remove_message(state, message) {
        let idx = state.list_message.indexOf(message);
        if (idx > -1)
            return state.list_message.splice(idx, 1);
    },
    setContactDisplay(state, style) {
        state.openContactDisplay = style;
    },

    setProfileDisplay(state, style) {
        state.openProfileDisplay = style;
    },
    setProfileEdit(state, style) {
        state.openProfileEdit = style;
    },


}

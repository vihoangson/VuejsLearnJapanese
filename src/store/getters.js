export default {
    get_current_user: state => {
        return state.current_user;
    },
    get_current_room: state => {
        return state.current_room;
    },
    get_list_room: state => {
        return state.list_room;
    },
    getContactDisplay: state => {
        return state.openContactDisplay
    }
};

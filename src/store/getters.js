export default {
    get_list_message: state => {
        return state.list_message;
    },
    get_current_user: state => {
        return state.current_user;
    },
    get_current_room: state => {
        return state.current_room;
    },
    get_list_room: state => {
        return state.list_room;
    },
    get_list_user: state => {
        return state.list_user;
    },
    get_list_user_by_room_id: state => {
        return state.list_user_by_room_id;
    },
    get_list_not_user_by_room_id: state => {
        return state.list_not_user_by_room_id;
    },
    get_current_user_info: state => {
        return state.current_user_info;
    },

    getContactDisplay: state => {
        return state.openContactDisplay;
    },
    getProfileDisplay: state => {
        return state.openProfileDisplay;
    },
    getProfileEdit: state => {
        return state.openProfileEdit;
	},
    get_is_admin_room: state => {
        return state.is_admin_room;
    }
};

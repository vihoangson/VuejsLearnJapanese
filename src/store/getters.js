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
    get_list_user_by_room_id: state => {
        return state.list_user_by_room_id;
    }
};

export default {
    get_to_list_member:state =>{
        return state.to_list_member;
    },
    get_all_user:state =>{
        return state.all_user;
    },
    get_data_contact:state =>{
        return state.data_contact;
    },
    get_loading_page: state => {
        return state.loading_page;
    },
    get_list_my_contact: state => {
        return state.list_my_contact;
    },
    get_list_message: state => {
        return state.list_message;
    },
    get_current_user: state => {
        return state.current_user;
    },
    get_current_room: state => {
        return state.current_room;
    },
    get_current_group: state => {
        return state.current_group;
    },
    get_list_room: state => {
        return state.list_room;
    },
    get_list_room_by_group: state => {
        return state.list_room_by_group;
    },
    get_list_group: state => {
        return state.list_group;
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
    },
    get_is_show_to_member_list: state => {
        return state.is_show_to_member_list;
    },
    getTaskDisplay: state => {
        return state.openTaskDisplay;
    },
    get_current_task_list: state => {
        return state.list_user_task;
    },
};

export default {
    setAllUser({ commit }, message) {
        commit('set_all_user', message);
    },
    setListContact({ commit }, message) {
        commit('set_list_contact', message);
    },
    setLoadingPage({ commit }, message) {
        commit('set_loading_page', message);
    },
    setMyContact({ commit }, message) {
        commit('set_my_contact', message);
    },
    addMessage({ commit }, message) {
        commit('add_message', message);
    },
    editMessage({ commit }, message) {
        commit('edit_message', message);
    },
    removeMessage({ commit }, message) {
        commit('remove_message', message);
    },
    notReadMessage({ commit }, obj) {
        commit('not_read_message', obj);
    },
    setCurrentUser({ commit }, obj) {
        commit('set_current_user', obj);
    },
    setCurrentRoom({ commit }, obj) {
        commit('set_current_room', obj);
    },
    setCurrentGroup({ commit }, obj) {
        commit('set_current_group', obj);
    },
    setListRoom({ commit }, obj) {
        commit('set_list_room', obj);
    },
    setListRoomByGroup({ commit }, obj) {
        commit('set_list_room_by_group', obj);
    },
    setListGroup({ commit }, obj) {
        commit('set_list_group', obj);
    },
    setListUser({ commit }, obj) {
        commit('set_list_user', obj);
    },
    setListUserByRoomId({ commit }, obj) {
        commit('set_list_user_by_room_id', obj);
    },
    setListNotUserByRoomId({ commit }, obj) {
        commit('set_list_not_user_by_room_id', obj);
    },
    setAdminRoom({ commit }, obj) {
        commit('is_admin_room', obj);
    },
    setNotification({ commit }, obj) {
        commit('set_notification', obj);
    },
    addNewRoom({ commit }, obj) {
        commit('new_room', obj);
    },
    setCurrentUserInfo({ commit }, obj) {
        commit('set_current_user_info', obj);
    },
    setContactDisplay({ commit }, style) {
        commit('setContactDisplay', style);
    },
    setProfileDisplay({ commit }, style) {
        commit('setProfileDisplay', style);
    },
    setProfileEdit({ commit }, style) {
        commit('setProfileEdit', style);
    },
    setIsShowToMemberList({ commit }, isShow) {
        commit('setIsShowToMemberList', isShow);
    },
    setUserIdToDelete({ commit }, id) {
        commit('setUserIdToDelete', id);
    },
};

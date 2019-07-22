export default {
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
    setListRoom({ commit }, obj) {
        commit('set_list_room', obj);
    }
};

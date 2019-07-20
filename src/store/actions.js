export default {
    addTask({ commit }, message) {
        commit("add_message", message);
    },
    setCurrentUser({ commit }, obj) {
        commit("set_current_user", obj);
    },
    setCurrentRoom({ commit }, obj) {
        commit("set_current_room", obj);
    },
    setListRoom({ commit }, obj) {
        commit("set_list_room", obj);
    },
    notReadMessage({ commit }, obj) {
        commit("not_read_message", obj);
    }
};

export default {
    addTask({ commit }, message) {
        commit('add_message', message);
    },
    removeTask({ commit }, task) {
        commit('remove_message', task);
    },
    setCurrentUser({ commit }, obj) {
        commit('set_current_user', obj);
    }
};

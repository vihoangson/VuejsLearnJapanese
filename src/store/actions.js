export default {
    setListMessage({ commit }, list){
        commit('set_list_message', list);
    },
    addTask({ commit }, message) {
        commit('add_message', message);
    },
    removeTask({ commit }, task) {
        commit('remove_message', task);
    },
    setCurrentUser({ commit }, obj) {
        commit('set_current_user', obj);
    },
    setContactDisplay({commit}, style) {
        commit('setContactDisplay', style);
    },
    setProfileDisplay({commit}, style) {
        commit('setProfileDisplay', style);
    },
    setProfileEdit({commit}, style) {
        commit('setProfileEdit', style);
    },
};

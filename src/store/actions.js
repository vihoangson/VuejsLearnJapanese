export default {
    addTask({commit}, message) {
        commit('add_message', message)
    },
    removeTask({commit}, task) {
        commit('remove_message', task)
    },
    setContactDisplay({commit}, style) {
        commit('setContactDisplay', style)
    },

    setProfileDisplay({commit}, style) {
        commit('setProfileDisplay', style)
    },

    setProfileEdit({commit}, style) {
        commit('setProfileEdit', style)
    },
}

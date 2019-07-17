export default {
    addTask({commit}, message) {
        commit('add_message', message)
    },
    removeTask({commit}, task) {
        commit('remove_message', task)
    },
    setContactDisplay({commit}, style) {
        commit('setContactDisplay', style)
    }
}
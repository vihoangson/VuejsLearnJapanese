import Vue from "vue";
import Vuex from "vuex";

import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    	current_user: {},
        current_user_info: {},
        list_message: [],
        openContactDisplay: 'none',
        openProfileDisplay: 'none',
        openProfileEdit: 'none',
        current_room: {},
        list_room: []
    },
    getters,
    mutations,
    actions
});

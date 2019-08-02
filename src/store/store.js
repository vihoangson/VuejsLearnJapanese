import Vue from "vue";
import Vuex from "vuex";

import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        current_room: {},
        current_user: {},
        list_room: [],
        list_user_by_room_id: [],
    },
    getters,
    mutations,
    actions
});

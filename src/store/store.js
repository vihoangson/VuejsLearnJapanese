import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        to_list_member:[],
        all_user: [],
        loading_page: false,
        current_user: {},
        current_user_info: {},
        list_message: [],
        openContactDisplay: 'none',
        openProfileDisplay: 'none',
        openProfileEdit: 'none',
        current_room: {},
        current_group: 0,
        list_room: [],
        list_room_by_group: [],
        list_group: [],
        list_user: [],
        list_my_contact: [],
        list_user_by_room_id: [],
        list_not_user_by_room_id: [],
        is_admin_room: false,
        data_contact: { list_contact: [1, 2, 3, 4] },
        is_show_to_member_list: false,
        openTaskDisplay: 'none',
        openTaskEditDisplay: 'none',
        list_user_task: [],
        edit_task_detail: {},
        number_waiting_accept:0,
        word:[]
    },
    getters,
    mutations,
    actions
});

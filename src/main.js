// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Moment from 'vue-moment';
import VueSocketIO from 'vue-socket.io';
import VModal from 'vue-js-modal';

import router from './router';
import store from './store/store';
import { SocketService } from './services/socket';

Vue.config.productionTip = false;

Vue.use(Moment);

Vue.use(
    new VueSocketIO({
        debug: true,
        connection: 'http://172.16.218.252:3001'
    })
);

Vue.use(VModal, { dynamic: true, dialog: true });
Vue.config.devtools = true;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    sockets: SocketService
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import App from './App';
import Moment from 'vue-moment';
import VueSocketIO from 'vue-socket.io';
import store from './store/store';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VModal from 'vue-js-modal';
import { SocketService } from './services/socket';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Moment);

Vue.use(
    new VueSocketIO({
        debug: true,
        connection: 'http://172.16.100.35:3001'
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

import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/Home';
import Login from '@/components/login/LoginPage';
import Register from '@/components/register/RegisterPage';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        { path: '*', redirect: '/' },
        {
            path: '/register',
            name: 'register',
            component: Register
        }
    ]
});

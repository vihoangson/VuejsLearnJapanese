import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/Home';
import Login from '@/components/login/LoginPage';

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
            component: {
                template:
                    '<div class="register"><router-view></router-view></div>'
            },
            children: [
                {
                    path: '',
                    name: 'register',
                    component: () =>
                        import('@/components/register/RegisterPage')
                },
                {
                    path: 'edit',
                    name: 'EditRegister',
                    component: () =>
                        import('@/components/register/EditRegisterPage'),
                    props: route => ({
                        params: {
                            parentRouteName: 'home',
                            user: localStorage.getItem('user')
                        }
                    })
                }
            ]
        }
    ]
});

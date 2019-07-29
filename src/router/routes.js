export default [
    {
        path: '/',
        name: 'home',
        component: () => import('@/components/home/Home.vue')
    },
    // {
    //     path: '/rid:room_id',
    //     name: 'home',
    //     component: () => import('@/components/home/Home.vue')
    // },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/login/LoginPage.vue')
    },
    { path: '*', redirect: '/' },

    {
        path: '/forgot-password',
        component: {
            template: `
      <div>
        <router-view></router-view>
      </div>
    `
        },
        children: [
            {
                path: '',
                name: 'ForgotPassword',
                component: () => import('@/components/forgotpass/EnterEmailPage')
            }
        ]
    },

    {
        path: '/register',
        component: {
            template: `
      <div>
        <router-view></router-view>
      </div>
    `
        },
        children: [
            {
                path: '',
                name: 'Register',
                component: () => import('@/components/register/RegisterPage')
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
];

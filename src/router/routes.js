export default [

    {
        path: '/',
        name: 'home',
        component: () => import('@/components/home/Home.vue')
    },
    {
        path: '/rid-*',
        name: 'home',
        component: () => import('@/components/home/Home.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/components/errorPage/404.vue')
    },
    {
        path: '/500',
        name: '500',
        component: () => import('@/components/errorPage/500.vue')
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
                component: () =>
                    import('@/components/forgotpass/EnterEmailPage')
            },
            {
                path: 'verify_token/:token',
                name: 'ForgotPasswordVerifyToken',
                component: () => import('@/components/forgotpass/VerifyToken')
            },
            {
                path: 'changepass',
                name: 'forgotpasschange',
                component: () =>
                    import('@/components/forgotpass/ChangePassword')
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
    },

    {
        path: '/admin',
        component: {
            template: `
              <div>
                <router-view></router-view>
              </div>
            `
        },
        children: [
            {
                path: 'status',
                name: 'status',
                component: () => import('@/components/admin/Status')
            },
        ]
    },

    {
        path: '/mail',
        name: 'mail',
        component: () => import('@/components/PMail/Mail.vue')
    },
    {
        path: '/timeline',
        name: 'timeline',
        component: () => import('@/components/timeline/Timeline.vue')
    },
    {
        path: '/socket',
        name: 'socket',
        component: () => import('@/components/timeline/Socket.vue')
    },
];

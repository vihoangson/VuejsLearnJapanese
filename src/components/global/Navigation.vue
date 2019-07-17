<template>
    <div class="navigation">
        <div class="admin">
            <ul class="menu-admin" role="navigation">
                <li class="menu-admin-item">
                    <span>
                        <svg
                            viewBox="0 0 10 10"
                            id="icon_menuTask"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.563 1.146h6.875c.23 0 .417.187.417.417v5.938H7.501v1.354h-5V7.501H1.147V1.563c0-.23.187-.417.417-.417M8.752.417h-7.5a.833.833 0 0 0-.833.833v7.5c0 .46.373.833.833.833h7.5c.46 0 .833-.373.833-.833v-7.5a.833.833 0 0 0-.833-.833m-4.43 6.866L1.681 4.642l.884-.884 1.758 1.757 3.116-3.117.884.884-4 4z"
                            />
                        </svg>
                    </span>
                </li>
                <li class="menu-admin-item">
                    <span>
                        <svg
                            viewBox="0 0 10 10"
                            id="icon_menuFile"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M.417.417v2.5h9.167v-1.25H4.167L2.917.417h-2.5zM0 3.75l.417 5.833h9.167l.417-5.833h-10zm.781.73h8.438l-.313 4.375H1.093L.78 4.48z"
                            />
                        </svg>
                    </span>
                </li>
                <li class="menu-admin-item">
                    <span @click="ShowPopUpModalContact">
                        <svg
                            viewBox="0 0 10 10"
                            id="icon_menuContact"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2.083.417v1.667H.416v.833h1.667v1.667h.834V2.917h.417v-.833h-.417V.417h-.834zM5.764 8.75c-1.64 0-2.969-.258-2.969-.833 0-.296.365-.592.919-.861.279-.136.854-.452 1.307-.704a1.242 1.242 0 0 0 .387-1.838l-.2-.246a1.998 1.998 0 0 1-.59-1.403c0-.892.513-1.615 1.146-1.615.633 0 1.146.723 1.146 1.615 0 .605-.277 1.085-.59 1.403l-.2.246a1.244 1.244 0 0 0 .386 1.838c.453.252 1.029.568 1.308.704.553.269.919.565.919.861 0 .575-1.329.833-2.969.833m1.87-2.607c-.172-.086-.32-.171-.669-.378-.322-.191-.363-.533-.144-.765.514-.543.905-1.219.905-2.138 0-1.384-.879-2.445-1.962-2.445-1.084 0-1.963 1.061-1.963 2.445 0 .919.39 1.595.904 2.138.219.232.179.574-.143.765-.348.206-.497.292-.669.378-1.084.542-1.949 1.007-1.949 1.887 0 .844 1.02 1.29 1.91 1.42.607.089 1.131.133 1.91.133.778 0 1.302-.044 1.91-.133.89-.13 1.91-.576 1.91-1.42 0-.88-.865-1.346-1.949-1.887"
                            />
                        </svg>
                    </span>
                </li>
                <li class="menu-admin-item">
                    <span>
                        <svg
                            viewBox="0 0 10 10"
                            id="icon_menuInfo"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.375 8.333h1.25V3.75h-1.25v4.583zm0-5.417h1.25v-1.25h-1.25v1.25zM5 9.27A4.27 4.27 0 1 1 5 .728 4.27 4.27 0 0 1 5 9.27M5-.001A5 5 0 1 0 5.001 10 5 5 0 0 0 5 0"
                            />
                        </svg>
                    </span>
                </li>
            </ul>
        </div>
        <div
            class="my-account"
            v-on:focus.native="onFocus"
            v-on:click="isHidden = !isHidden"
            v-bind:class="{active: !isHidden}"
        >
            <div class="avatar">
                <img :src="this.user.icon_img" alt />
            </div>
            <p class="status-name">
                <span class="name">{{this.$store.getters.get_current_user.email}}</span>
                <span class="menu-icon">
                    <svg
                        viewBox="0 0 10 10"
                        id="icon_triangleDown"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M2.5 3.125L5 6.875l2.5-3.75z" />
                    </svg>
                </span>
            </p>
        </div>
        <div class="menu" role="menu" v-if="!isHidden">
            <ul class="account-menu">
                <li class="menu-item" id="profile">
                    <a>Profile</a>
                </li>
                <li class="menu-item" id="personal">
                    <a>Personal Settings</a>
                </li>
                <li class="menu-item" id="account">
                    <a @click="ShowFormEditRegister">Account Settings</a>
                </li>
                <li class="menu-item" id="api">
                    <a>API Setting</a>
                </li>
                <li class="menu-item separate-top" id="logout">
                    <a @click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</template>
    
<script>
import BaseContact from '../contact/BaseContact.vue';
import modalMixin from '@/mixins/modal';
import { ApiConst } from '../../common/ApiConst';
import { AppConst } from '../../common/AppConst';
import { API } from '../../services/api';
export default {
    name: 'Navigation',
    mixins: [modalMixin],
    data() {
        return {
            isHidden: true,
            user: this.$store.getters.get_current_user
        };
    },
    methods: {
        logout() {

            API.POST(ApiConst.LOGOUT, null).then(res => {
                if (res.error_code === 0) {
                    localStorage.removeItem(AppConst.LOCAL_USER);
                    this.$router.push({ path: '/login' });
                }
            });
        },
        ShowPopUpModalContact() {
            this.showPageInModal(
                BaseContact,
                {},
                { pivotX: 0.5, width: '80%', resizable: true, adaptive: true },
                {}
            );
        },
        ShowFormEditRegister() {
            let routeToEditRegister = this.$router.resolve({
                path: '/register/edit'
            });
            window.open(routeToEditRegister.href, '_blank');
        }
    }
};
</script>
<style>
.navigation {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
}
.menu-admin {
    list-style: none;
    margin: 0;
    display: flex;
    align-items: center;
    height: 42px;
}
.menu-admin-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    margin: 0 8px;
    transition: background 0.2s linear 0s;
}
.menu-admin-item span {
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    padding: 4px;
    fill: #cccccc;
    cursor: pointer;
}
.menu-admin-item span svg {
    width: 24px;
    height: 24px;
}
.my-account {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    min-width: 198px;
    height: 45px;
    padding: 0 15px 0 3px;
    margin-left: 8px;
    color: #cccccc;
    fill: #cccccc;
    border: 2px solid #13202f;
    border-radius: 21px 0 0 21px;
    background-color: #13202f;
    user-select: none;
    cursor: pointer;
}
.my-account:hover {
    color: #fff;
    fill: #fff;
    border-color: #33455b;
    background-color: #33455b;
}
.my-account.active {
    color: #fff;
    fill: #fff;
    border-radius: 21px 4px 0 0;
    border-color: #33455b;
    background-color: #33455b;
}
.avatar {
    height: 32px;
    margin-right: 5px;
    vertical-align: top;
    cursor: pointer;
}
.avatar img {
    width: 32px;
    height: 32px;
    border-radius: 16px 16px 0 16px;
}
.my-account .status-name {
    vertical-align: middle;
    max-width: 120px;
    color: inherit;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.status-name .name {
    font-weight: 700;
    font-size: 1.1538em;
}
.status-name .menu-icon {
    position: absolute;
    right: 5px;
    top: 11px;
    width: 16px;
    height: 16px;
}
.account-menu {
    z-index: 10;
    box-sizing: border-box;
    position: absolute;
    min-width: 198px;
    top: 30px;
    right: 0;
    padding: 1px 0 5px;
    background-color: #33455b;
    border-radius: 0 0 0 5px;
    user-select: none;
    list-style: none;
}
.account-menu .menu-item {
    height: 30px;
    margin: 0 5px;
    line-height: 30px;
}
.menu-item a {
    display: block;
    padding-left: 40px;
    color: #fff;
    border-radius: 3px;
    text-decoration: none;
    text-align: left;
}
.menu-item a:hover {
    background: #13202f;
    text-decoration: none;
    cursor: pointer;
}
.menu-item.separate-top {
    border-top: solid 1px #13202f;
    padding-top: 8px;
    margin-top: 8px;
}
</style>

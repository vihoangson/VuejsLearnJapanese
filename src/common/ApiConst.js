export const ApiConst = {
    LOGIN: '/api/v1/user/login',
    LOGOUT: '/api/v1/user/logout',
    REGISTER: '/api/v1/user/register',
    DETAIL_REGISTER: '/api/v1/user/details',
    EDIT_REGISTER: '/api/v1/user/edit-account',
    RECEIVE_MESSAGE: '/api/v1/message/receive',
    ALL_ROOM: '/api/v1/message/get-all-rooms',
    GET_USER_INFO: 'api/v1/user/detail',

    GROUP_GET_BY_USER_ID: '/api/v1/group/get-group-by-user-id',
    GROUP_ADD: '/api/v1/group/add',
    GROUP_UPDATE: '/api/v1/group/update',
    GROUP_DELETE: '/api/v1/group/delete',
    GROUP_GET_BY_ID: '/api/v1/group/get-group-by-id',
    GROUP_GET_ROOM_BY_GROUP_ID: '/api/v1/group/get-room-by-group-id',
    GROUP_GET_ALL_ROOM: '/api/v1/room/get-all-rooms',

    ROOM_ADD: '/api/v1/room/add',
    ROOM_UPDATE: '/api/v1/room/update',
    ROOM_DELETE: '/api/v1/room/delete',
    ROOM_SETTING: '/api/v1/room/setting',
    ROOM_GET_ALL_USER: '/api/v1/user/get-all-user',
    ROOM_GET_ALL_USER_BY_ROOM: '/api/v1/user/get-all-user-by-room',
    ROOM_ADD_USER_TO_ROOM: '/api/v1/room/add-user-to-room',
    ROOM_GET_USER_BY_ROOM_ID: '/api/v1/user/get-user-by-room-id',
    ROOM_CHECK_IS_ADMIN: '/api/v1/user/check-is-admin-room',
    MY_LIST_FILE: '/api/v1/file/get-my-list-file',
    FORGOT_PASS_REQUEST: '/api/v1/user/forgot-password-request',
    FORGOT_PASS_CHECK_TOKEN: '/api/v1/user/forgot-password-check-token',
    FORGOT_PASS_CHANGE_PASS: '/api/v1/user/forgot-password-change-pass',


};

export const AppConst = {
    LOCAL_USER: 'user',
    LOCAL_USER_INFO: 'user_info',
    MESSAGE_TYPE: {
        CREATE: 0,
        EDIT: 1,
        DELETE: 2
    },
    ACCEPTED_FILES: '.jpg,.png',
    MAX_FILE_SIZE: 100,
    MAX_FILE: 10,
    EVENT_MESSAGE: {
        SEND: 'send_message',
        JOIN_BY_LIST_ROOM: 'join_by_list_rooms',
        JOIN_NEW_ROOM: 'join_by_new_room',
        CHANNEL_NEW_ROOM: 'channel_new_room',
        ADD_NEW_ROOM: 'add_new_room',
        REMOVE_ROOM: 'remove_room',
        CHANNEL_REMOVE_ROOM: 'channel_remove_room',
        CHANGE_ROOM: 'change_room',
        CHANNEL_CHANGE_ROOM: 'channel_change_room'
    },
    SOCKET_ADDRESS: 'http://127.0.0.1:3000'
};

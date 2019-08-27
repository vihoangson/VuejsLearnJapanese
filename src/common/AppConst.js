export const AppConst = {
    SOCKET_ADDRESS: 'http://172.16.100.35:3001',
    LOCAL_USER: 'user',
    LOCAL_USER_INFO: 'user_info',
    LOCAL_MESSAGE_BY_ROOM: 'message_by_room',
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
        CHANNEL_CHANGE_ROOM: 'channel_change_room',
        LEAVE_ROOM: 'leave_room'
    },
    REGULAR: {
        TO_ALL: /(\[toall])/g,
        TO: /(\[to:([0-9])+])/g,
        REPY: /(\[reply mid:([0-9]+) to:([0-9]+)\])/g,
        REPLY_TO_ID: /(?<=to:)([0-9]+)/g,
        TAG_INFO: /(?<=\[info\])(.|\n)*?(?=\[\/info\])/g,
        TAG_CODE: /(?<=\[code\])(.|\n)*?(?=\[\/code\])/g,
        TAG_TITLE: /(?<=\[title\])(.|\n)*?(?=\[\/title\])/g,
        ALL_TAG: /(\[\/?\w+)(.*?\])/g,
        PREVIEW: /(\[preview:([0-9])+])/g,
        TAG_SCRIPT: /(<script)|(<\/script>)/g
    }
};

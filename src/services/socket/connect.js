import { AppConst } from '../../common/AppConst';

export function connect(socket, rooms) {
    console.log('Connect socket.io successful!!');

    if (rooms.length > 0) {
        let roomIds = [];
        rooms.forEach(x => {
            roomIds.push(x.room_id);
        });
        socket.emit(AppConst.EVENT_MESSAGE.JOIN_BY_LIST_ROOM, roomIds);
    }
    let user = JSON.parse(localStorage.getItem('user'));
    if (user !== null && user.user_id !== null && user.user_id !== undefined) {
        socket.emit(
            AppConst.EVENT_MESSAGE.CHANNEL_NEW_ROOM,
            user.user_id
        );
        socket.emit(
            AppConst.EVENT_MESSAGE.CHANNEL_REMOVE_ROOM,
            user.user_id
        );
        socket.emit(
            AppConst.EVENT_MESSAGE.CHANNEL_CHANGE_ROOM,
            user.user_id
        );
    }
}

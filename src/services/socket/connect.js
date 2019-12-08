import { AppConst } from '../../common/AppConst';

export function connect(socket, rooms) {
    console.log('Connect socket.io successful!!');

    if (rooms.length > 0) {
        let roomIds = [];
        rooms.forEach(x => {
            roomIds.push(x.room_id);
        });

    }
}

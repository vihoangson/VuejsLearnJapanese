export function changeRoom(socket, store, room) {
    var listRoom = store.getters.get_list_room;
    switch (room.option) {
        case 0: // Add
            for (let i in listRoom) {
                if (listRoom[i].room_id === room.room_id) {
                    var memberList = listRoom[i].member_list;
                    var memberUpdate = [];
                    var isRoom = false;
                    for (let key in room.selected) {
                        if (
                            room.selected[key] !== null &&
                            room.selected[key] !== 'empty'
                        ) {
                            if (
                                room.selected[key].id ===
                                store.getters.get_current_user_info.id
                            ) {
                                isRoom = true;
                            }
                        }
                    }
                    if (isRoom) {
                        for (let key in memberList) {
                            for (let i in room.selected) {
                                if (
                                    room.selected[i] !== null &&
                                    room.selected[i] !== 'empty'
                                ) {
                                    if (
                                        memberList[key].id ===
                                        room.selected[i].id
                                    ) {
                                        memberList[key].role_in_room =
                                            room.selected[i].permission;
                                        memberUpdate.push(memberList[key]);
                                    }
                                }
                            }
                        }

                        listRoom[i].member_list = memberUpdate;
                    } else {
                        listRoom.splice(i, 1);
                    }
                }
            }
            break;
        case 1: // Update
            for (let i in listRoom) {
                if (listRoom[i].room_id === room.room_id) {
                    var userAdd = [];
                    for (let j in room.selected) {
                        let length = listRoom[i].member_list.length;
                        if (
                            room.selected[j] !== null &&
                            room.selected[j].id !== undefined
                        ) {
                            for (let i in store.getters.get_list_user) {
                                if (
                                    store.getters.get_list_user[i].id ===
                                    room.selected[j].id
                                ) {
                                    userAdd = store.getters.get_list_user[i];
                                }
                            }
                            var roleInRoom = room.selected[j].permission;
                            listRoom[i].member_list[length] = {
                                company: userAdd.company,
                                email: userAdd.email,
                                icon_img: userAdd.icon_img,
                                id: userAdd.id,
                                name: userAdd.name,
                                role_in_room: roleInRoom
                            };
                        }
                    }
                }
            }
            break;
        case 2: // Leave
            for (let i in listRoom) {
                if (listRoom[i].room_id === room.room_id) {
                    if (listRoom[i].member_list !== undefined) {
                        for (let key in listRoom[i].member_list) {
                            if (
                                listRoom[i].member_list[key].id ===
                                room.selected.id
                            ) {
                                if (
                                    room.selected.id ===
                                    store.getters.get_current_user_info.id
                                ) {
                                    listRoom.splice(i, 1);
                                    store.dispatch(
                                        'setCurrentRoom',
                                        listRoom[0]
                                    );
                                } else {
                                    // TODO
                                    
                                    
                                }

                                break;
                            }
                        }
                    }
                }
            }
            break;
        default:
            break;
    }
    store.dispatch('setListRoom', listRoom);
}

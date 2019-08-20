export function changeRoom(store, room) {
    var listRoom = store.getters.get_list_room;
    switch (room.option) {
        case 0:
            for (let i in listRoom) {
                if (listRoom[i].room_id === room.room_id) {
                    var member_list = listRoom[i].member_list;
                    var member_update = [];
                    var check_is_room = false;
                    for (let key in room.selected) {
                        if (
                            room.selected[key] !== null &&
                            room.selected[key] !== 'empty'
                        ) {
                            if (
                                room.selected[key].id ===
                                store.getters.get_current_user_info.id
                            ) {
                                check_is_room = true;
                            }
                        }
                    }
                    if (check_is_room) {
                        for (let key in member_list) {
                            for (let i in room.selected) {
                                if (
                                    room.selected[i] !== null &&
                                    room.selected[i] !== 'empty'
                                ) {
                                    if (
                                        member_list[key].id ===
                                        room.selected[i].id
                                    ) {
                                        member_list[key].role_in_room =
                                            room.selected[i].permission;
                                        member_update.push(member_list[key]);
                                    }
                                }
                            }
                        }

                        listRoom[i].member_list = member_update;
                    } else {
                        listRoom.splice(i, 1);
                    }
                }
            }
            break;
        case 1:
            for (let i in listRoom) {
                if (listRoom[i].room_id === room.room_id) {
                    var userAdd = [];
                    for (let j in room.selected) {
                        var length = listRoom[i].member_list.length;
                        if (
                            room.selected[j] !== null &&
                            room.selected[j].id !== undefined
                        ) {
                            for (let i in store.getters.get_list_user) {
                                if (
                                    store.getters.get_list_user[i].id ===
                                    room.selected[j].id
                                ) {
                                    userAdd = this.$store.getters.get_list_user[
                                        i
                                    ];
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
        case 2:
            for (let i in listRoom) {
                if (listRoom[i].room_id === room.room_id) {
                    if (listRoom[i].member_list !== undefined) {
                        var length = listRoom[i].member_list.length;
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
                                } else {
                                    this.$root.$emit('push-notice', {
                                        message:
                                            room.selected.name + ' has left',
                                        alert: 'alert-success'
                                    });
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

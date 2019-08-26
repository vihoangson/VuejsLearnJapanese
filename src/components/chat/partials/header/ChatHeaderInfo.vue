<template>
    <div class="chat-room-header">
        <div class="info-container">
            <div class="list_user">
                <div
                    class="icon-list-contain"
                    v-if="this.$store.getters.get_current_room.can_add_user === 1"
                >
                    <span
                        class="icon_img"
                        v-for="(item, index) in this.$store.getters.get_current_room.member_list"
                        v-if="index < 5"
                        :key="`item-${index}`"
                    >
                        <img
                            :src="item.icon_img"
                            alt
                            class="avatar"
                            v-b-tooltip.hover
                            v-bind:title="item.name"
                        />
                    </span>
                </div>
                <span
                    class="btn-more"
                    @click="openModalShowUserRoom()"
                    v-if="!this.$store.getters.get_is_admin_room && this.$store.getters.get_list_user_by_room_id.length > 5"
                >+{{this.$store.getters.get_list_user_by_room_id.length - 5}}</span>
                <span
                    class="btn-persion"
                    v-if="this.$store.getters.get_is_admin_room && (this.$store.getters.get_current_room.can_add_user === 1)"
                    @click="openModalShowUserRoom()"
                >
                    <svg
                        viewBox="0 0 10 10"
                        id="icon_memberDetail"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M6.25 2.5h3.13v.94H6.25zm0 2.03h3.13v.94H6.25z" />
                        <path
                            d="M3.75 1.25a1.82 1.82 0 0 1 1.61 2A2.46 2.46 0 0 1 4.62 5a.39.39 0 0 0 .11.63l.55.3c.89.45 1.6.83 1.59 1.55S6 8.53 5.31 8.64a10.11 10.11 0 0 1-1.56.11 10.11 10.11 0 0 1-1.56-.11C1.46 8.53.62 8.17.62 7.48s.71-1.1 1.6-1.55l.55-.3A.39.39 0 0 0 2.88 5a2.46 2.46 0 0 1-.74-1.75 1.82 1.82 0 0 1 1.61-2zM7.2 6.56a1.58 1.58 0 0 1 .3.92h1.88v-.92z"
                        />
                    </svg>
                </span>
                <span
                    class="btn-plus"
                    v-if="this.$store.getters.get_is_admin_room && (this.$store.getters.get_current_room.can_add_user === 1)"
                    @click="updateGroupChat"
                >
                    <svg
                        viewBox="0 0 10 10"
                        class="chatRoomHeaderMemberList__editIcon"
                        width="16"
                        height="16"
                    >
                        <use fill-rule="evenodd" xlink:href="#icon_plus" />
                    </svg>
                </span>
            </div>
            <div class="room-action">
                <list-file-in-room></list-file-in-room>
                <span
                    class="icon-config-all"
                    v-bind:class="{ active: isActive, 'setting-room': true }"
                    @click="toggleOption"
                    ref="toggleOption"
                >
                    <svg viewBox="0 0 10 10" id="icon_setting" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.075 5.497a3.096 3.096 0 0 1-.548 1.327l.477.902-.277.277-.902-.477a3.102 3.102 0 0 1-1.327.548l-.301.977-.196.01-.196-.01-.302-.977a3.093 3.093 0 0 1-1.328-.548l-.902.477-.277-.277.478-.902a3.102 3.102 0 0 1-.548-1.327l-.977-.301L.939 5l.01-.196.977-.302c.079-.491.269-.941.548-1.328l-.478-.902.277-.277.902.478c.386-.28.837-.469 1.328-.548l.302-.977.196-.01.196.01.301.977c.491.079.941.268 1.327.548l.902-.478.277.277-.477.902a3.1 3.1 0 0 1 .548 1.328l.977.302.01.196-.01.196-.977.301zm1.856.3c.042-.26.069-.525.069-.798 0-.272-.027-.537-.069-.797l-1.014-.266a4.063 4.063 0 0 0-.394-.954l.529-.905A5.005 5.005 0 0 0 7.924.95l-.904.528a4.005 4.005 0 0 0-.955-.394L5.799.07a5.114 5.114 0 0 0-.798-.069 5.1 5.1 0 0 0-.797.069l-.266 1.014a4.021 4.021 0 0 0-.954.394L2.079.95A5.021 5.021 0 0 0 .952 2.077l.528.905c-.17.297-.302.616-.394.954l-1.014.266c-.042.26-.069.526-.069.797 0 .272.027.538.069.798l1.013.266c.092.338.225.657.395.954l-.528.905c.314.434.694.814 1.127 1.128l.905-.529c.296.171.617.303.954.394l.266 1.014c.261.042.526.069.797.069.272 0 .537-.027.798-.069l.266-1.014c.337-.091.658-.224.955-.394l.904.529a5.03 5.03 0 0 0 1.128-1.128l-.529-.905c.17-.297.303-.616.395-.954l1.013-.266zM5 6.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5m0-3.438a2.188 2.188 0 1 0 0 4.376 2.188 2.188 0 0 0 0-4.376"
                        />
                    </svg>
                    <div class="group-option">
                        <span class="disable-mark"><span>Group Chat Setting</span></span>
                        <span @click="leaveRooms">Leave this group chat</span>
                        <span
                            @click="deleteRooms"
                            v-if="this.$store.getters.get_is_admin_room"
                        >Delete this group chat</span>
                    </div>
                </span>
            </div>
            <div class="dropdown-content" v-if="showListFile">
                <div v-for="(file, index) in listMyFile" :key="`file-${index}`" class="item-file">
                    {{ file.file_name }}
                    <div class="action-file"></div>
                    <div class="action-icon" @click="downloadFile(file.id)">
                        <span>download</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-name">
            <div class="room-logo">
                <img :src="this.$store.getters.get_current_room.icon_img" alt />
            </div>
            <h1 class="title">
                <span>{{this.$store.getters.get_current_room.room_name}}</span>
            </h1>
        </div>
    </div>
</template>

<script>
import { API } from '../../../../services/api';
import { ApiConst } from '../../../../common/ApiConst';
import { AppConst } from '../../../../common/AppConst';
import ListFileInRoom from '../../../../files/ListFileInRoom';

export default {
    name: 'ChatHeaderInfo',
    data() {
        return {
            isActive: false,
            isActiveSelect: false
        };
    },
    created: function() {
        document.addEventListener('click', this.documentClick);
    },
    destroyed() {
        document.removeEventListener('click', this.documentClick);
    },
    components: {
        ListFileInRoom
    },
    methods: {
        documentClick(e) {
            let el2 = this.$refs.toggleOption;
            let target = e.target;
            if (el2 !== target && !el2.contains(target)) {
                this.isActive = false;
            }
        },
        openModalShowUserRoom() {
            this.$root.$emit('open-modal-show-user');
            this.$bvModal.show('modal-prevent-show-user');
        },
        openModalEditUserRoom() {
            this.$root.$emit('open-modal-edit-user');
            this.$bvModal.show('modal-prevent-edit-user');
        },
        updateGroupChat() {
            this.$root.$emit('open-modal-add-user', 0);
            this.$bvModal.show('modal-prevent-add-user');
        },
        toggleOption: function() {
            if (this.isActive) {
                this.isActive = false;
            } else {
                this.isActive = true;
            }
            this.isActiveSelect = false;
        },
        settingRooms() {
            this.$root.$emit('open-modal-setting-group');
            this.$bvModal.show('modal-prevent-setting-group');
        },
        leaveRooms() {
            this.$bvModal
                .msgBoxConfirm(
                    'If you leave the group chat, your tasks will be deleted, and there is a case where your files will be deleted.  (About file retention)',
                    {
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'success',
                        centered: true
                    }
                )
                .then(value => {
                    if (value) {
                        // Step1: Push message leave room
                        this.pushMessageBeforeLeave();
                        // Step2: Do leave room
                        this.requestLeaveRoom();
                    }
                });
        },
        deleteRooms() {
            this.$root.$emit('open-modal-delete-room');
            this.$bvModal.show('modal-prevent-delete-room');
        },
        pushMessageBeforeLeave() {
            let room = this.$store.getters.get_current_room;
            let user = this.$store.getters.get_current_user_info;
            let msg = {
                room_id: room.room_id,
                message: '[info]' + user.name + ' has left the chat![/info]',
                type: AppConst.MESSAGE_TYPE.CREATE,
                token: this.$store.getters.get_current_user.token,
                user_id: user.id
            };

            this.$socket.emit(AppConst.EVENT_MESSAGE.LEAVE_ROOM, room.room_id);
            this.$socket.emit(AppConst.EVENT_MESSAGE.SEND, msg);
            let listRoom = this.$store.getters.get_list_room;
            let roomId = listRoom[0].room_id;
            this.$router.push('/rid-' + roomId);
        },
        requestLeaveRoom() {
            let data = {
                room_id: this.$store.getters.get_current_room.room_id,
                user_id: this.$store.getters.get_current_user_info.id,
                only_token: true
            };
            API.POST(ApiConst.DELETE_USER_OF_ROOM, data).then(response => {
                if (response !== undefined) {
                    switch (response.error_code) {
                        case 0:
                            var room = this.$store.getters.get_current_room;
                            room.selected = this.$store.getters.get_current_user_info;
                            room.option = 2;
                            this.$root.$emit('change-list-room', room);
                            break;
                        default:
                            this.$root.$emit('push-notice', {
                                message: response.data,
                                alert: 'alert-danger'
                            });
                            break;
                    }
                }
            });
        }
    }
};
</script>

<style>
.setting-room .group-option {
    position: absolute;
    width: 250px;
    top: 40px;
    right: 5px;
    padding-right: 30px;
    font-size: 13px;
    padding: 0;
    display: none;
}
.setting-room .group-option span {
    height: 35px;
    border-radius: 4px;
    color: #222;
    border: 1px #ccc solid;
    text-align: center;
    display: inline-block;
    width: 100%;
    line-height: 30px;
    background: #f8f9fa;
}
.setting-room.active .group-option {
    display: inline-block;
}
.group-option span:hover {
    background: #0084b2;
    color: #fff;
    transition: 0.5s;
    border: 1px #0084b2 solid;
}

.chat-room-header {
    box-sizing: border-box;
    height: 41px;
    padding-right: 8px;
    padding-left: 8px;
    border-left: 1px solid #b3b3b3;
    border-bottom: 1px solid #cccccc;
    background-color: #fff;
}
.list_user .icon_img {
    margin-right: 5px;
}
.list_user .icon_img img {
    width: 25px;
    border-radius: 50%;
    border: 1px #eee solid;
    height: 25px;
    margin: 0;
}
.action-icon {
    text-align: center;
    width: 30%;
    height: 70%;
    opacity: 1;
    position: absolute;
    padding-top: 12px;
    z-index: 4;
    top: 0;
    right: 0;
    background-color: greenyellow;
    display: none;
}
.item-file {
    position: relative;
}
.item-file:hover .action-file {
    display: block;
}
.item-file:hover .action-icon {
    display: block;
}
.action-file {
    height: 100%;
    width: 60vh;
    top: 0;
    left: 0;
    position: absolute;
    background-color: greenyellow;
    z-index: 2;
    opacity: 0.5;
    display: none;
}
.info-container {
    float: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 350px;
    height: 100%;
}

.dropdown-content {
    max-height: 80vh;
    min-height: 30vh;
    width: 60vh;
    overflow: scroll;
    right: 0px;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown-content div.item-file {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}
.icon-close {
    float: right;
}
.room-action {
    display: flex;
    align-items: center;
    margin-left: 16px;
    height: 24px;
}
.icon-file-all,
.icon-config-all {
    box-sizing: border-box;
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 2px;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    width: 24px;
    height: 24px;
    padding: 0;
    border-color: transparent;
    background-color: transparent;
    color: #1a1a1a;
    fill: #1a1a1a;
}
.icon-file-all:hover,
.icon-config-all:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-color: transparent;
    color: #1a1a1a;
    fill: #1a1a1a;
}
.icon-file-all svg,
.icon-config-all svg {
    width: 16px;
}
.icon-config-all {
    margin-left: 10px;
}
.list_user {
    display: flex;
    align-items: center;
    padding-right: 8px;
    border-right: 1px solid #cccccc;
}
.list_user .btn-more {
    height: 25px;
    padding: 0 4px;
    background: #aaa;
    display: inline-block;
    border-radius: 20px;
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 24px;
    position: relative;
    top: 1px;
}
.list_user .btn-persion {
    cursor: pointer;
    height: 25px;
    padding: 0 4px;
    width: 30px;
    background: #aaa;
    display: inline-block;
    border-radius: 20px;
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    position: relative;
    top: 1px;
}
.list_user .btn-persion svg {
    width: 15px;
    fill: #fff;
}
.list_user .btn-more svg {
    width: 16px;
    fill: #fff;
}
.list_user .btn-plus {
    cursor: pointer;
    float: right;
    margin-left: 5px;
    height: 30px;
    width: 30px;
    background: #006a9c;
    display: block;
    border-radius: 100%;
    color: #fff;
    text-align: center;
    font-size: 16px;
    line-height: 25px;
    position: relative;
    top: 1px;
}
.list_user .btn-plus svg {
    width: 15px;
    fill: #fff;
}
</style>

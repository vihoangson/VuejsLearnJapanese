<template>
    <div id="chat-box" @dragover="showDropzoneForm">
        <div class="chat-box-header">
            <div class="header-name">
                <div class="room-logo">
                    <img :src="this.$store.getters.get_current_room.icon_img" alt />
                </div>
                <h1 class="title">
                    <span>{{this.$store.getters.get_current_room.room_name}}</span>
                </h1>
                <div class="list_user">
                    <span
                        class="icon_img"
                        v-for="(item, index) in list_user_room"
                        :key="`item-${index}`"
                    >
                        <img :src="item.icon_img" alt class="avatar" />
                    </span>
                    <span
                        class="btn-more"
                        @click="openModalShowUserRoom()"
                        v-if="!is_admin_room"
                    >+{{room_length}}</span>
                    <span
                        class="btn-more"
                        v-if="is_admin_room"
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
                    <span class="btn-plus" v-if="is_admin_room" @click="updateGroupChat">
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
            </div>
            <div class="dropdown">
                <div class="emoji" @click="showMyListFile">
                    <span class="icon-container">
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
                </div>
                <div class="dropdown-content" v-if="showListFile">
                    <div
                        v-for="(file, index) in listMyFile"
                        :key="`file-${index}`"
                        class="item-file"
                    >
                        {{ file.file_name }}
                        <div class="action-file"></div>
                        <div class="action-icon" @click="downloadFile(file.id)">
                            <span>download</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="chat-box-content" id="chat-box-content" :style="{'height': `${myStyles}px`}">
            <div class="timeline">
                <div
                    class="timeline-message"
                    :style="{'height': `${timelineMessage}px`, 'overflow': 'hidden', 'overflow-y': 'scroll'}"
                >
                    <div
                        class="timeline-message-body"
                        v-for="item in this.$store.getters.get_current_room.list_message"
                        :key="item.message_id"
                    >
                        <div class="timeline-avatar">
                            <img :src="item.user_info.icon_img" alt class="avatar" />
                        </div>
                        <div class="timeline-content">
                            <div class="timeline-content-header">
                                <p class="timeline-content-header-username">{{item.user_info.name}}</p>
                                <p
                                    class="timeline-content-header-organization"
                                >{{item.organization}}</p>
                            </div>
                            <div class="timeline-content-message">
                                <ChatMessage :message-object="item" :message_content="item.message"></ChatMessage>
                            </div>
                            <ChatAction
                                :message="item"
                                @reply="onReply"
                                @edit="onEdit"
                                @delete="onDelete"
                            ></ChatAction>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-input">
                <div class="chat-tool">
                    <picker
                        v-show="showEmojiPicker"
                        title="Pick your emoji..."
                        emoji="point_up"
                        @select="addEmoji"
                    />
                    <div>
                        <ul class="send-tool">
                            <li class="emoji" @click="toggleEmojiPicker">
                                <span class="icon-container">
                                    <svg
                                        viewBox="0 0 10 10"
                                        id="icon_emoticon"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5 9.063A4.063 4.063 0 1 1 5 .937a4.063 4.063 0 0 1 0 8.126M5 0a5 5 0 1 0 .001 10.001A5 5 0 0 0 5 0m0 7.188a2.49 2.49 0 0 1-2.153-1.25h-.708a3.121 3.121 0 0 0 5.722 0h-.708A2.49 2.49 0 0 1 5 7.188M6.406 5c.431 0 .781-.357.781-.875s-.417-1.065-.906-1c-.428.057-.656.482-.656 1s.35.875.781.875m-2.813.003c.431 0 .781-.357.781-.875s-.228-.943-.656-1c-.489-.065-.906.482-.906 1s.35.875.781.875"
                                        />
                                    </svg>
                                </span>
                            </li>
                            <li class="emoji">
                                <span class="icon-container">
                                    <svg
                                        viewBox="0 0 10 10"
                                        id="icon_mention"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.875 7.188c-1.329 0-2.188-.979-2.188-2.188 0-1.208.859-2.188 2.188-2.188 1.329 0 2.188.979 2.188 2.188 0 1.208-.859 2.188-2.188 2.188m0-5.313C4.977 1.875 3.75 3.274 3.75 5s1.227 3.125 3.125 3.125S10 6.726 10 5 8.773 1.875 6.875 1.875M0 1.875v.937h1.563v5.313h.938V2.812h1.563v-.937H.001z"
                                        />
                                    </svg>
                                </span>
                            </li>
                            <li class="emoji">
                                <span class="icon-container">
                                    <svg
                                        viewBox="0 0 10 10"
                                        id="icon_sendfile"
                                        xmlns="http://www.w3.org/2000/svg"
                                        @click="showDropzoneForm"
                                    >
                                        <path
                                            d="M8.534 5.884l.001-.001a3.126 3.126 0 0 0-4.42-4.418L.816 4.764A2.21 2.21 0 0 0 3.942 7.89l3.299-3.299a1.367 1.367 0 0 0-1.932-1.932L2.342 5.626a.469.469 0 0 0 .663.663l2.968-2.967v-.001a.43.43 0 0 1 .606.606h-.001L3.28 7.226a1.273 1.273 0 0 1-1.8-1.799h.001l3.298-3.299a2.188 2.188 0 0 1 3.094 3.093L4.574 8.52a.469.469 0 0 0 .663.663l3.299-3.299z"
                                        />
                                    </svg>
                                </span>
                            </li>
                            <li class="emoji">
                                <span class="icon-container">
                                    <svg
                                        viewBox="0 0 10 10"
                                        id="icon_live"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5.313 6.719c0 .259-.21.469-.469.469H1.406a.469.469 0 0 1-.469-.469V3.281c0-.259.21-.469.469-.469h3.438c.259 0 .469.21.469.469v3.438zm0-4.844H.938A.937.937 0 0 0 0 2.813v4.375c0 .518.42.938.938.938h4.375a.937.937 0 0 0 .938-.938V2.813a.938.938 0 0 0-.938-.938zm3.906 4.55l-.735-.276a.312.312 0 0 1-.203-.292V4.142c0-.13.081-.247.203-.293l.735-.276v2.851zm.148-3.687l-1.563.586a.47.47 0 0 0-.304.439v2.476c0 .196.121.37.304.439l1.563.586a.47.47 0 0 0 .634-.439V3.177a.469.469 0 0 0-.634-.439z"
                                        />
                                    </svg>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="submit-container">
                        <span class="enter-action">
                            <input type="checkbox" id="chkenter" v-model="enterToSendMessage" />
                        </span>
                        <label for="chkenter">
                            <span class="txt-enter-action">Press Enter to send</span>
                        </label>
                        <div
                            id="_sendButton"
                            class="chatInput__submit _cwBN button"
                            role="button"
                            tabindex="2"
                            aria-disabled="false"
                            @click="onSend()"
                        >Send</div>
                    </div>
                </div>
                <div class="chat-textarea">
                    <ChatEdit v-if="this.editMessage" @cancelEdit="onCanCelEdit"></ChatEdit>
                    <textarea
                        id="chat-text"
                        ref="textarea"
                        cols="30"
                        rows="7"
                        placeholder="Enter your message here
(Press Shift + Enter for line break)"
                        v-model="message.content"
                        v-if="this.enterToSendMessage"
                        @keydown.enter.exact.prevent
                        @keyup.enter.exact="pressEnterToSendMessage($event)"
                    ></textarea>
                    <textarea
                        id="chat-text2"
                        ref="textarea"
                        cols="30"
                        rows="7"
                        placeholder="Enter your message here
(Press Shift + Enter for send)"
                        v-model="message.content"
                        v-if="!this.enterToSendMessage"
                        @keydown.enter.shift.prevent
                        @keydown.enter.shift.exact="sendMessage()"
                    ></textarea>
                </div>
            </div>
            <div class="sideContentResizeCtrlArea cwResizeHandleCol"></div>
        </div>
    </div>
</template>

<script>
import { Picker } from 'emoji-mart-vue';
import TextareaEmojiPicker from '../global/TextareaEmojiPicker';
import { API } from '../../services/api';
import { AppConst } from '../../common/AppConst';
import { ApiConst } from '../../common/ApiConst';
import ChatAction from './partials/ChatAction';
import ChatEdit from './partials/ChatEdit';
import modalMixin from '@/mixins/modal';
import SendFile from './SendFile';
import ChatMessage from './partials/ChatMessage';

export default {
    name: 'ChatBox',
    mixins: [modalMixin],
    components: {
        Picker,
        TextareaEmojiPicker,
        ChatAction,
        ChatEdit,
        ChatMessage
    },
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            enterToSendMessage: true,
            showListFile: false,
            height: 0,
            message: {
                id: 0,
                content: '',
                type: AppConst.MESSAGE_TYPE.CREATE
            },
            message_id: 0,
            errors: null,
            user: this.$store.getters.get_current_user,
            editMessage: false,
            listMyFile: [],
            list_user_room: [],
            is_admin_room: false,
            room_length: 0
        };
    },
    mounted() {
        this.$root.$on('changed-id-rooms', data => {
            this.getUserByRoomId();
        });
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        let obj = {
            page: 1,
            room_id: 1
        };
        API.POST(ApiConst.RECEIVE_MESSAGE, obj).then(res => {
            if (res.error_code === 0)
                this.$store.dispatch('setListMessage', res.data);
        });
        this.getUserByRoomId();
    },
    methods: {
        handleResize() {
            this.height = window.innerHeight - 45;
        },
        createObjMessage() {
            let msg = {
                room_id: this.$store.getters.get_current_room.room_id,
                message: this.message.content.trim(),
                type: this.message.type,
                token: this.user.token
            };
            if (msg.type === AppConst.MESSAGE_TYPE.CREATE) {
                msg.user_id = this.user.user_id;
            } else if (
                msg.type === AppConst.MESSAGE_TYPE.EDIT ||
                msg.type === AppConst.MESSAGE_TYPE.DELETE
            ) {
                msg.message_id = this.message.id;
            }
            return msg;
        },
        sendMessage() {
            let msg = this.createObjMessage();
            if (msg.message !== '')
                this.$socket.emit(AppConst.EVENT_MESSAGE.SEND, msg);
            var container = this.$el.querySelector('.timeline-message');
            container.scrollTop = container.scrollHeight;

            this.message.content = '';
            this.message.id = 0;
            this.message.type = AppConst.MESSAGE_TYPE.CREATE;
            this.editMessage = false;
        },
        toggleEmojiPicker() {
            this.showEmojiPicker = !this.showEmojiPicker;
        },
        addEmoji(emoji) {
            const textarea = this.$refs.textarea;
            const cursorPosition = textarea.selectionEnd;
            const start = this.message.content.substring(
                0,
                textarea.selectionStart
            );
            const end = this.message.content.substring(textarea.selectionEnd);
            const text = start + emoji.native + end;
            this.$emit('input', text);
            this.message += text;
            textarea.focus();
            this.$nextTick(() => {
                textarea.selectionEnd = cursorPosition + emoji.native.length;
            });
            this.showEmojiPicker = false;
        },
        showDropzoneForm() {
            if (!this.showDropzone) {
                this.showPageInModal(
                    SendFile,
                    {},
                    {
                        pivotX: 0.5,
                        width: '80%',
                        resizable: true,
                        adaptive: true
                    },
                    {}
                );
            }
        },
        hideDropzone() {
            this.$refs['myVueDropzone'].removeAllFiles();
            this.$emit('close');
        },
        pressEnterToSendMessage() {
            if (this.message.content !== '') {
                if (this.enterToSendMessage) {
                    this.sendMessage();
                }
            }
        },
        check: function(e) {
            this.enterToSendMessage = e.target.value;
        },
        onReply(value) {
            this.message.content =
                '[Reply mid:' +
                value.message_id +
                ' to:' +
                value.user_info.id +
                '] ' +
                value.user_info.name;
            this.message.content += '\n';
            this.$refs.textarea.focus();
        },
        onSend() {
            this.message.type = AppConst.MESSAGE_TYPE.CREATE;
            this.sendMessage();
        },
        onEdit(value) {
            this.message.id = value.message_id;
            this.message.content = value.message;
            this.message.type = AppConst.MESSAGE_TYPE.EDIT;

            this.editMessage = true;
            this.$refs.textarea.focus();

            let roomId = this.$store.getters.get_current_room.room_id;
            localStorage.setItem('id', value.message_id);
            localStorage.setItem('content', value.message);
            localStorage.setItem('type', AppConst.MESSAGE_TYPE.EDIT);
            localStorage.setItem('roomId', roomId);
        },
        onDelete(value) {
            let con = confirm('Do you want to delete it!?');
            if (con) {
                this.message.id = value.message_id;
                this.message.content = value.message;
                this.message.type = AppConst.MESSAGE_TYPE.DELETE;
                this.sendMessage();
            }
        },
        onCanCelEdit() {
            this.message.content = '';
            this.message.id = 0;
            this.message.type = AppConst.MESSAGE_TYPE.CREATE;

            this.editMessage = false;
        },
        showMyListFile() {
            this.showListFile = !this.showListFile;
            if (this.showListFile) {
                API.GET(ApiConst.MY_LIST_FILE).then(res => {
                    this.listMyFile = res.data;
                });
            }
        },
        downloadFile(id) {
            API.GET('/api/v1/file/download-file/' + id).then(res => {
                window.open(
                    'http://api.sns-tool.vn/api/v1/download-file/' +
                        id +
                        '/' +
                        res.token_file +
                        '/' +
                        res.user_id
                );
            });
        },
        updateGroupChat() {
            this.$root.$emit('open-modal-add-user', 0);
            this.$bvModal.show('modal-prevent-add-user');
        },
        getUserByRoomId() {
            this.list_user_room = [];
            this.room_length = 0;
            this.is_admin_room = false;
            let roomId = this.$store.getters.get_current_room.room_id;
            if (roomId !== undefined) {
                API.GET(ApiConst.ROOM_CHECK_IS_ADMIN + '/' + roomId).then(
                    response => {
                        if (
                            response !== undefined &&
                            response.error_code === 0
                        ) {
                            this.is_admin_room = response.data;
                        }
                    }
                );

                API.GET(ApiConst.ROOM_GET_USER_BY_ROOM_ID + '/' + roomId).then(
                    response => {
                        if (
                            response !== undefined &&
                            response.error_code === 0
                        ) {
                            this.$store.dispatch(
                                'setListUserByRoomId',
                                response.data
                            );
                            this.list_user_room = this.$store.getters.get_list_user_by_room_id;
                        }
                    }
                );

                API.POST(ApiConst.ROOM_GET_ALL_USER_BY_ROOM, {
                    room_id: this.$store.getters.get_current_room.room_id,
                    is_added: 0
                }).then(response => {
                    if (response !== undefined && response.error_code === 0) {
                        this.room_length = response.data.length;
                        this.$store.dispatch(
                            'setListNotUserByRoomId',
                            response.data
                        );
                    }
                });
            }
        },
        openModalShowUserRoom() {
            this.$root.$emit('open-modal-show-user');
            this.$bvModal.show('modal-prevent-show-user');
        },
        openModalEditUserRoom() {
            this.$root.$emit('open-modal-edit-user');
            this.$bvModal.show('modal-prevent-edit-user');
        }
    },
    computed: {
        myStyles() {
            return this.height - 45;
        },
        timelineMessage() {
            return this.height - 245;
        }
    }
};
</script>

<style>
.list_user .btn-more {
    height: 25px;
    width: 25px;
    background: #ccc;
    display: inline-block;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 24px;
}
.list_user .btn-more svg {
    width: 18px;
}
.list_user .btn-plus {
    float: right;
    margin-left: 5px;
    height: 25px;
    width: 25px;
    background: #b8daff;
    display: block;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    font-size: 16px;
    line-height: 24px;
}
.list_user {
    float: right;
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
.dropdown {
    float: right;
    position: relative;
    display: block;
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
.box-chat-nd {
    margin-left: 25%;
    margin-top: 8%;
    width: 50%;
    background-color: white;
    opacity: 1;
    overflow: auto;
}
.dropzone-main-chat {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1111;
    top: 0px;
    left: 0px;
    display: block;
    background-color: #393630;
    opacity: 0.9;
    overflow: visible;
}
.dropzone-main-chat-input {
    overflow: scroll;
    height: 280px;
}
#chat-box {
    position: absolute;
    top: 0;
    right: 0;
    left: 256px;
    height: 100%;
    min-width: 700px;
    z-index: 1;
}
.chat-box-header {
    box-sizing: border-box;
    height: 41px;
    padding-right: 8px;
    padding-left: 8px;
    border-left: 1px solid #b3b3b3;
    border-bottom: 1px solid #cccccc;
    background-color: #fff;
}
.chat-box-header .header-name {
    display: inline-block;
    margin-top: 8px;
    width: calc(100% - 300px);
}
.room-logo {
    display: block;
    float: left;
}
.room-logo img {
    width: 25px;
    border-radius: 50%;
}
.chat-box-header .title {
    display: inline-block;
    font-size: 16px;
    margin-top: 3px;
    padding-left: 10px;
}
.title span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    box-sizing: border-box;
    max-width: 100%;
    padding-right: 24px;
}
.chat-box-content {
    position: absolute;
    right: 300px;
    left: 0;
    min-width: 400px;
    background: #fff;
    border-right: 1px solid #b3b3b3;
    border-left: 1px solid #cccccc;
    z-index: -1;
}
.titmeline-message {
    position: relative;
    transition: 0.1s linear;
    zoom: 1;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    margin-bottom: 10px;
}
.timeline-message-body:hover {
    border-top: 1px solid #b1d6ed;
    border-bottom: 1px solid #b1d6ed;
    background-color: #f8fbff;
}
.timeline-message-body:hover .actionArea {
    display: block;
}
.timeline-message-body {
    padding: 8px 16px;
    position: relative;
    border: 1px solid transparent;
    margin: 15px 0px;
}

.timeline-avatar {
    float: left;
}
.timeline-content {
    zoom: 1;
    padding-left: 40px;
    padding-right: 40px;
}
.timeline-content-header {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 95%;
}
.timeline-content-header-username {
    display: inline;
    font-weight: 700;
    cursor: pointer;
    color: #0084b2;
}
.timeline-content-header-organization {
    display: inline;
    margin-left: 4px;
    color: #666666;
    font-size: 11px;
}
.timeline-avatar img {
    border: solid 1px transparent;
    border-radius: 50% 50% 0 50%;
    background-color: #fff;
}
.sideContentResizeCtrlArea {
    position: absolute;
    background: rgba(0, 0, 0, 0.2);
    width: 3px;
    top: 0;
    bottom: 0;
    opacity: 0;
    z-index: 2;
    left: 0;
    border-left: 1px solid #b3b3b3;
}
.chat-input {
    width: 97%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    text-align: center;
    margin: 0 auto;
}
.chat-textarea {
    border: 1px solid #b3b3b3;
}
.chat-input textarea {
    border-radius: 0;
    box-shadow: none;
    box-sizing: border-box;
    width: 100%;
    outline: 0;
    margin: 0;
    padding: 5px;
    border: none;
    background: #fffde3;
    overflow-y: hidden;
    min-height: 50px;
    font-size: 14px;
    resize: none;
}
textarea:focus:-webkit-placeholder {
    color: transparent;
}
.chat-tool {
    position: relative;
    display: flex;
    align-items: center;
    background: #fff;
    height: 34px;
    padding: 0 8px;
    border: 1px solid #b3b3b3;
    border-bottom: 1px solid #b3b3b3;
    justify-content: space-between;
}
.send-tool {
    display: flex;
    align-items: center;
    list-style: none;
    padding-left: 0px;
}
.emoji {
    border-color: transparent;
    background-color: transparent;
    color: #1a1a1a;
    fill: #1a1a1a;
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    padding: 4px;
    margin-right: 8px;
    border-radius: 2px;
    cursor: pointer;
}
.emoji:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
.icon-container {
    width: 16px;
    height: 16px;
}
.chatInput__submit {
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
    padding: 0 12px;
    min-width: 26px;
    min-height: 26px;
    line-height: 26px;
    font-size: 13px;
    border-color: #216493;
    background-color: #216493;
    color: #fff;
    fill: #fff;
    vertical-align: middle;
    text-align: center;
}
.chatInput__submit:hover {
    border-color: #006a9c;
    background-color: #006a9c;
    color: #fff;
    fill: #fff;
}
.txt-enter-action {
    margin-right: 5px;
    cursor: pointer;
}
.emoji-mart {
    position: absolute;
    left: 10px;
}

.emoji-trigger {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    height: 20px;
}

.emoji-trigger path {
    transition: 0.1s all;
}

.emoji-trigger:hover path {
    fill: #000000;
}

.emoji-trigger.triggered path {
    fill: darken(#fec84a, 15%);
}
.timeline-content-message pre {
    font-size: 14px;
    font-family: arial;
    margin-top: 3px;
    margin-bottom: 0px;
}
</style>

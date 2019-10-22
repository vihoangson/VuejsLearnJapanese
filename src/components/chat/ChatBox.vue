<template>
    <div id="chat-box" @dragover="showDropzoneForm" @dragend="hideDropzoneForm">
        <div class="chat-box-header">
            <ChatHeaderInfo></ChatHeaderInfo>
        </div>
        <div class="chat-box-content" id="chat-box-content" :style="{'height': `${myStyles}px`}">
            <div class="timeline">
                <div
                    class="timeline-message"
                    :style="{'height': `${timelineMessage}px`, 'overflow': 'hidden', 'overflow-y': 'scroll'}"
                >
                    <div
                        class="timeline-message-body"
                        v-bind:class="getClass(item.message)"
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
                                >{{item.user_info.company}}</p>
                            </div>
                            <div class="timeline-content-message">
                                <ChatMessage :message-object="item" :message_content="item.message"></ChatMessage>
                            </div>
                            <ChatAction
                                :message="item"
                                @reply="onReply"
                                @edit="onEdit"
                                @delete="onDelete"
                                @quoute="onQuoute"
                            ></ChatAction>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-input">
                <div class="chat-tool">
                    <div>
                        <ul class="send-tool">
                            <li class="emoji">
                                <span id="showEmojiList" class="icon-container">
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
                                <Emoji class="popup"></Emoji>
                            </li>
                            <li
                                class="emoji"
                                v-if="this.$store.getters.get_current_room.is_mychat !== 1"
                            >
                                <span id="showToMemberList" class="icon-container" @click="removeToList()">
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
                                <ListTo class="popup"></ListTo>
                            </li>
                            <li class="emoji">
                                <span class="icon-container" @click="showDropzoneForm">
                                    <svg
                                        viewBox="0 0 10 10"
                                        id="icon_sendfile"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.534 5.884l.001-.001a3.126 3.126 0 0 0-4.42-4.418L.816 4.764A2.21 2.21 0 0 0 3.942 7.89l3.299-3.299a1.367 1.367 0 0 0-1.932-1.932L2.342 5.626a.469.469 0 0 0 .663.663l2.968-2.967v-.001a.43.43 0 0 1 .606.606h-.001L3.28 7.226a1.273 1.273 0 0 1-1.8-1.799h.001l3.298-3.299a2.188 2.188 0 0 1 3.094 3.093L4.574 8.52a.469.469 0 0 0 .663.663l3.299-3.299z"
                                        />
                                    </svg>
                                </span>
                            </li>
                            <li class="emoji">
                                <span class="icon-container disable-mark">
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
                            <li
                                class="emoji"
                                style="width:45px;"
                                @click="addMessageTypeToContent('info')"
                            >
                                <span class="icon-container">
                                    <strong>[info]</strong>
                                </span>
                            </li>
                            <li
                                class="emoji"
                                style="width:45px;"
                                @click="addMessageTypeToContent('title')"
                            >
                                <span class="icon-container">
                                    <strong>[title]</strong>
                                </span>
                            </li>
                            <li
                                class="emoji"
                                style="width:45px;"
                                @click="addMessageTypeToContent('code')"
                            >
                                <span class="icon-container">
                                    <strong>[code]</strong>
                                </span>
                            </li>
                            <li
                                class="button-to"
                                style=""
                                v-for="(list_to, index) in $store.getters.get_current_room.list_to"
                            >
                                <span class="icon-container" @click="inserToList(list_to.content)">
                                    <strong><div class="to-list btn btn-default">{{list_to.name}} </div> </strong>
                                </span>
                                <i class="fa fa-times hidden" @click="removeToList(list_to.name)"></i>
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
                            class="chatInput__submit _cwBN"
                            role="button"
                            tabindex="2"
                            aria-disabled="false"
                            @click="sendMessage()"
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
                        @blur="onBlurChatBoxMessage"
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
                        @blur="onBlurChatBoxMessage"
                    ></textarea>
                </div>
            </div>
            <div class="sideContentResizeCtrlArea cwResizeHandleCol"></div>
        </div>
        <div class="chat-box-detail">
            <div v-if="true">
                <h2>Description</h2>
                <pre><span v-if="$store.getters.get_current_room.room_description===''|| $store.getters.get_current_room.room_description===null">No description</span><div v-else>{{$store.getters.get_current_room.room_description?$store.getters.get_current_room.room_description:''}}</div></pre>


                <div v-for="(user, index) in $store.getters.get_all_user.list_user" :key="index" v-if="false">
                    <div>{{user.name}}</div>
                    <div>{{user.email}}</div>
                    <div>{{user.contact_status}}</div>
                    <br>
                    <hr>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { API } from '../../services/api';
import { AppConst } from '../../common/AppConst';
import { ApiConst } from '../../common/ApiConst';
import ChatAction from './partials/ChatAction';
import ChatEdit from './partials/ChatEdit';
import modalMixin from '@/mixins/modal';
import SendFile from './SendFile';
import ChatMessage from './partials/ChatMessage';
import ChatHeaderInfo from './partials/header/ChatHeaderInfo';
import ListTo from './partials/ListTo';
import Emoji from './partials/Emoji';
import { setTimeout } from 'timers';

export default {
    name: 'ChatBox',
    mixins: [modalMixin],
    components: {
        ChatAction,
        ChatEdit,
        ChatMessage,
        ChatHeaderInfo,
        ListTo,
        Emoji
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
            showFileDetail: false,
            is_show_to_member_list: false,
            codeReviewPhoto: '',
            roomId: null,
            fileDetailInfo: {
                id: '',
                name: '',
                size: '',
                uploadDate: '',
                owner: '',
                content: ''
            },
            reviewPhotoStore: [],
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
            is_admin_room: false,
            room_length: 0
        };
    },
    mounted() {
        this.$root.$on('changed-info-rooms', data => {
            this.getUserByRoomId();
        });
        this.$root.$on('changed-group', data => {
            this.getDataGroup();
        });
        this.$root.$on('changed-list-user', data => {
            this.getListUser();
        });
        this.$root.$on('add-new-room-from-socket', data => {
            this.pushNewRoom(data);
        });
        this.$root.$on('push-list-room', data => {
            this.$socket.emit(AppConst.EVENT_MESSAGE.ADD_NEW_ROOM, data);
        });
        this.$root.$on('change-list-room', data => {
            this.$socket.emit(AppConst.EVENT_MESSAGE.CHANGE_ROOM, data);
        });
        this.$root.$on('remove-list-room', data => {
            this.$socket.emit(AppConst.EVENT_MESSAGE.REMOVE_ROOM, data);
        });
        this.$root.$on('set-content-message', data => {

            this.message.type = AppConst.MESSAGE_TYPE.CREATE;

            const textarea = this.$refs.textarea;
            const cursorPosition = textarea.selectionEnd;
            const start = this.message.content.substring(
                0,
                textarea.selectionStart
            );
            const end = this.message.content.substring(textarea.selectionEnd);
            const text = start + data + end;
            this.message.content = text;
            textarea.focus();
            this.$nextTick(() => {
                textarea.selectionEnd = cursorPosition + data.length;
            });
        })
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
    },
    methods: {
        removeToList(){
            this.$store.dispatch('saveToListMember', '');
        },
        inserToList(content){
            const textarea = this.$refs.textarea;
            const cursorPosition = textarea.selectionEnd;
            const start = this.message.content.substring(
                0,
                textarea.selectionStart
            );
            const end = this.message.content.substring(textarea.selectionEnd);
            const text = start + content + end;
            this.message.content = text;
            textarea.focus();
        },
        getClass(content) {
            let toall = content.match(AppConst.REGULAR.TO_ALL);
            if (toall) return 'mention';
            let toId = content.match(AppConst.REGULAR.REPLY_TO_ID);
            if (toId) {
                if (parseInt(toId[0]) === this.user.user_id) {
                    return 'mention';
                }
            }
        },
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
        hideDropzoneForm() {
            this.$modal.hide('SendFile');
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
        onQuoute(value) {
            this.message.content =
                '[Quote uid:' +
                value.message_id +
                ' time:' +
                value.timestamp +
                ']' +
                value.message +
                '[/Quote]';
            this.message.content += '\n';
            this.$refs.textarea.focus();
        },
        showMyListFile() {
            this.showListFile = !this.showListFile;
            if (!this.showListFile) {
                this.showFileDetail = false;
            }
            if (this.showListFile) {
                if (
                    this.roomId !== this.$store.getters.get_current_room.room_id
                ) {
                    this.listMyFile = [];
                    this.codeReviewPhoto = '';
                    this.fileDetailInfo.content = '';
                    this.fileDetailInfo.name = '';
                    this.fileDetailInfo.size = '';
                    this.fileDetailInfo.owner = '';
                    this.fileDetailInfo.uploadDate = '';
                    this.fileDetailInfo.id = '';
                }
                API.GET(
                    ApiConst.MY_LIST_FILE +
                        '/' +
                        this.$store.getters.get_current_room.room_id
                ).then(res => {
                    if (res.data === 0) {
                        this.showListFile = false;
                        this.showFileDetail = false;
                        alert('There are no files!');
                    }
                    this.listMyFile = res.data;
                });
            }
        },
        downloadFile(id) {
            API.GET(ApiConst.GET_LINK_DOWNLOAD_FILE + '/' + id).then(res => {
                window.open(
                    process.env.ROOT_API +
                        ApiConst.DOWNLOAD_FILE +
                        '/' +
                        id +
                        '/' +
                        res.data.token_file +
                        '/' +
                        res.data.user_id
                );
            });
        },
        deleteFile(id) {
            this.$bvModal
                .msgBoxConfirm('Do you really want to delete file ?', {
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    centered: true
                })
                .then(value => {
                    let obj = {
                        delete_id: id
                    };
                    API.POST(ApiConst.DELETE_FILE, obj).then(res => {
                        this.showListFile = !this.showListFile;
                        this.showMyListFile();
                    });
                })
                .catch(err => {
                    if (err) console.log(err);
                    this.$root.$emit('push-notice', {
                        message: 'Open model error',
                        alert: 'alert-danger'
                    });
                });
        },
        getReviewPhoto(id) {
            this.showFileDetail = true;
            if (typeof this.reviewPhotoStore[id] === 'undefined') {
                API.GET(ApiConst.GET_FILE_PREVIEW_MID + '/' + id).then(res => {
                    this.codeReviewPhoto =
                        'data:image/png;base64, ' + res.data.base_64;
                    this.fileDetailInfo.content = res.data.content;
                    this.fileDetailInfo.name = res.data[0].file_name;
                    this.fileDetailInfo.size = res.data[0].file_size
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    this.fileDetailInfo.owner = res.data[0].name;
                    this.fileDetailInfo.uploadDate = res.data[0].created_at;
                    this.fileDetailInfo.id = res.data[0].id;
                    this.reviewPhotoStore[id] = res.data;
                });
            } else {
                this.codeReviewPhoto =
                    'data:image/png;base64, ' +
                    this.reviewPhotoStore[id].base_64;
                this.fileDetailInfo.content = this.reviewPhotoStore[id].content;
                this.fileDetailInfo.name = this.reviewPhotoStore[
                    id
                ][0].file_name;
                this.fileDetailInfo.size = this.reviewPhotoStore[
                    id
                ][0].file_size
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                this.fileDetailInfo.owner = this.reviewPhotoStore[id][0].name;
                this.fileDetailInfo.uploadDate = this.reviewPhotoStore[
                    id
                ][0].created_at;
                this.fileDetailInfo.id = this.reviewPhotoStore[id][0].id;
            }
        },
        getLinkDetailImage(id) {
            API.POST(ApiConst.GET_TOKEN_IMAGE_DETAIL + '/' + id).then(res => {
                window.open(
                    process.env.ROOT_API +
                        ApiConst.DETAIL_IMAGE +
                        '/' +
                        id +
                        '/' +
                        res.data.token +
                        '/' +
                        res.data.user_id
                );
            });
        },
        getUserByRoomId() {
            var listNotExists = [];
            let roomId = this.$store.getters.get_current_room.room_id;
            this.$store.dispatch('setAdminRoom', false);
            this.$store.dispatch('setListUserByRoomId', []);
            this.$store.dispatch('setListNotUserByRoomId', []);
            if (roomId !== undefined) {
                for (let i in this.$store.getters.get_list_room) {
                    if (
                        this.$store.getters.get_list_room[i].room_id === roomId
                    ) {
                        this.$store.dispatch(
                            'setListUserByRoomId',
                            this.$store.getters.get_list_room[i].member_list
                        );
                    }
                }
                for (let i in this.$store.getters.get_list_user_by_room_id) {
                    if (
                        this.$store.getters.get_list_user_by_room_id[i] !==
                            undefined &&
                        this.$store.getters.get_list_user_by_room_id[i]
                            .role_in_room === 1 &&
                        this.$store.getters.get_list_user_by_room_id[i].id ===
                            this.$store.getters.get_current_user_info.id
                    ) {
                        this.$store.dispatch('setAdminRoom', true);
                    }
                }
                for (let i in this.$store.getters.get_list_user) {
                    var has = false;
                    for (let j in this.$store.getters
                        .get_list_user_by_room_id) {
                        if (
                            this.$store.getters.get_list_user_by_room_id[j] !==
                                undefined &&
                            this.$store.getters.get_list_user_by_room_id[j]
                                .id === this.$store.getters.get_list_user[i].id
                        ) {
                            has = true;
                        }
                    }
                    if (!has) {
                        listNotExists.push(
                            this.$store.getters.get_list_user[i]
                        );
                    }
                }
                this.$store.dispatch('setListNotUserByRoomId', listNotExists);
                this.getDataGroup();
            }
        },

        getDataGroup() {
            let listGroup = this.$store.getters.get_list_group;
            let listRoom = this.$store.getters.get_list_room;
            let currentGroupId = this.$store.getters.get_current_group;

            let listRoomByGroup = [];
            if (currentGroupId === 0) {
                this.$store.dispatch(
                    'setListRoomByGroup',
                    this.$store.getters.get_list_room
                );
            } else {
                listGroup.forEach(X => {
                    if (X.id === currentGroupId) {
                        X.room_list.forEach(Y => {
                            for (let i in listRoom) {
                                if (listRoom[i].room_id === Y.id) {
                                    listRoomByGroup.push(listRoom[i]);
                                    break;
                                }
                            }
                        });
                    }
                });
                this.$store.dispatch('setListRoomByGroup', listRoomByGroup);
            }
        },
        addMessageTypeToContent(type) {
            let contentType = [];
            let cursorContentPositon = 0;
            switch (type) {
                case 'info':
                    contentType = ['[info]','[/info]'];
                    cursorContentPositon = 6;
                    break;
                case 'title':
                    contentType = ['[title]','[/title]'];
                    cursorContentPositon = 7;
                    break;
                case 'code':
                    contentType = ['[code]','[/code]'];
                    cursorContentPositon = 6;
                    break;
            }
            const textarea = this.$refs.textarea;
            const cursorPosition = textarea.selectionEnd;
            const start = this.message.content.substring(
                0,
                textarea.selectionStart
            );
            const middle = this.message.content.substring(
                textarea.selectionStart,
                textarea.selectionEnd
            );
            const end = this.message.content.substring(textarea.selectionEnd);

            const text = start + contentType[0] + middle + contentType[1] +end;
            this.$emit('input', text);
            this.message.content = text;
            textarea.focus();
            this.$nextTick(() => {
                textarea.selectionEnd = cursorPosition + cursorContentPositon;
            });
        },
        showListToMember() {
            document.getElementById('toMemberList').style.display = 'block';
            setTimeout(function(){
                document.getElementById('searchListUser').focus();
            }, 1000)
        },
        onBlurChatBoxMessage() {
            let localMessageByRooms = localStorage.getItem(
                AppConst.LOCAL_MESSAGE_BY_ROOM
            );
            let currentRoom = this.$store.getters.get_current_room;
            if (localMessageByRooms) {
                localMessageByRooms = JSON.parse(localMessageByRooms);
            } else localMessageByRooms = [];
            let room = localMessageByRooms.find(x => {
                return x.id === currentRoom.id;
            });

            if (room === undefined) {
                room = {
                    message: {
                        content: this.message.content,
                        type: this.message.type
                    },
                    room_id: currentRoom.room_id
                };

                localMessageByRooms.push(room);
            } else {
                room.message.content = this.message.content;
                room.message.type = this.message.type;
                room.room_id = currentRoom.id;
            }

            localStorage.setItem(
                AppConst.LOCAL_MESSAGE_BY_ROOM,
                JSON.stringify(localMessageByRooms)
            );
        }
    },
    computed: {
        myStyles() {
            return this.height - 45;
        },
        timelineMessage() {
            return this.height - 225;
        }
    }
};
</script>

<style>
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

.file-emoji {
    display: inline-block;
}
.detail-info-file {
    background-color: #cccccc;
}
.content-file {
    height: 80%;
    overflow-y: scroll;
}
.content-image {
    height: 80%;
}
.file-name {
    white-space: nowrap;
    overflow: hidden;
}

.file-detail {
    height: 60vh;
    width: 65vh;
    opacity: 1;
    position: absolute;
    z-index: 5;
    top: 23px;
    right: 60vh;
    background-color: darkgrey;
}
.content-image img {
    cursor: pointer;
    display: block;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
}
.action-icon {
    text-align: center;
    width: 30%;
    height: 100%;
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
    white-space: nowrap;
    overflow: hidden;
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
    display: inline-block;
}

.dropdown-content {
    max-height: 80vh;
    min-height: 30vh;
    width: 60vh;
    overflow-y: scroll;
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

#chat-box {
    position: absolute;
    top: 0;
    right: 0;
    left: 256px;
    height: 100%;
    min-width: 700px;
    z-index: 1;
}
.chat-box-header .header-name {
    display: inline-block;
    margin-top: 8px;
    width: calc(100% - 400px);
}
.room-logo {
    display: block;
    float: left;
}
.room-logo img {
    width: 25px;
    height: 25px;
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
.chat-box-detail {
    position: absolute;
    right: 0px;
    min-width: 300px;
    width: 300px;
    border-right: 1px solid #b3b3b3;
    border-left: 1px solid #cccccc;
    z-index: -1;
}
.chat-box-detail span{
    color:#909090;
}
.chat-box-detail h2 {
    padding: 7px;
    background: #ccc;
    font-weight: bold;
    color: #7b7b7b;
    font-size: 100%;
    margin:0px;

}
.chat-box-detail pre{
    padding: 7px;
    font-size: 100%;
    line-height: normal;
    margin:0px;
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
.timeline-message-body.mention {
    border-top: 1px solid #ddebd7;
    border-bottom: 1px solid #ddebd7;
    background-color: #ddebd7;
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
}
.timeline-message-body:last-child{
    margin-bottom: 20px;
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
    margin-bottom: 7px;
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
    position: relative;
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
    margin-top: 3px;
    margin-bottom: 0px;
}
    .button-to{
        cursor: pointer;
        padding-top:9px;
    }
.to-list.btn.btn-default {
    background: #e2e2e2;
    border: 1px solid #a8a8a8;
    padding: 1px 11px;
    margin-left: 9px;
}
    .hidden{
        display:none;
    }
</style>

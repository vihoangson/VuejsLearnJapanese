<template>
    <div @mouseleave="hideDropzoneCheck" @mouseup="hideDropzoneCheck" class="dropzone-main-chat">
        <div class="box-chat-nd">
            <div>
                <span>File Upload</span>
                <span class="icon-close" @click="hideDropzone">X</span>
            </div>
            <div>
                <vue-dropzone
                    class="dropzone-main-chat-input"
                    id="dropzone"
                    ref="myVueDropzone"
                    :options="dropzoneOptions"
                    @vdropzone-file-added="getFile"
                    @vdropzone-success="catchResponse"
                    @vdropzone-sending="addSending"
                    @vdropzone-error="showErrorMessage"
                ></vue-dropzone>
            </div>
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
                    </ul>
                </div>
            </div>
            <div class="chat-textarea">
                <textarea
                    ref="textarea"
                    rows="5"
                    placeholder="Enter your message here"
                    v-model="message"
                    @input="$emit('input', $event.target.value)"
                ></textarea>
            </div>
            <div class="submit-container">
                <div
                    class="chatInput__submit _cwBN button"
                    role="button"
                    tabindex="2"
                    aria-disabled="false"
                    @click="sendMessageFile"
                >Send</div>
                <div
                    @click="hideDropzone"
                    class="chatInput__submit _cwBN button"
                    role="button"
                    tabindex="2"
                    aria-disabled="false"
                >Cancel</div>
            </div>
        </div>
    </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import { authHeader } from '../../helpers/auth-header';
import { ApiConst } from '../../common/ApiConst';

export default {
    name: 'SendFile',
    components: { vueDropzone: vue2Dropzone },
    mixins: [],
    props: {},
    data() {
        return {
            selectedComponent: '',
            dropzoneOptions: {
                url: process.env.ROOT_API + ApiConst.MESSAGE_UPLOAD_FILE,
                // thumbnailWidth: 150,
                maxFilesize: 100,
                headers: {
                    Accept: 'application/json',
                    Authorization: authHeader()
                },
                maxFiles: 10,
                uploadMultiple: true,
                parallelUploads: 1,
                acceptedFiles:
                    'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv,.xls,.xlsx,.jpg,.gif,.png,.jpeg,.txt,.xml,.php,.js,.vue,.rar,.zip,.sql,.gz',
                autoProcessQueue: false,
                addRemoveLinks: true,
                dictDefaultMessage:
                    '<i class="fa fa-5x fa-cloud-upload"></i><div>' + 'Click or drop the file here</div>'
            },
            message: ''
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        toggleEmojiPicker(){},
        addEmoji(){},
        getFile(file) {
        },
        successImport(file) {
        },
        showErrorMessage(file) {
            this.$refs['myVueDropzone'].removeFile(file);
        },
        catchResponse(file, response) {
            this.message = '';
            if (response.error_code === 0) {
                alert('Upload thành công');
            }
            this.$refs['myVueDropzone'].removeFile(file);
            if (this.$refs['myVueDropzone'].getAcceptedFiles().length === 0) {
                this.hideDropzone();
            }
        },
        hideDropzoneCheck() {
            // if (this.$refs['myVueDropzone'].getAcceptedFiles().length === 0) {
            //     this.hideDropzone();
            // }
        },
        hideDropzone() {
            this.$refs['myVueDropzone'].removeAllFiles();
            this.$emit('close');
        },
        sendMessageFile() {
            this.$refs.myVueDropzone.processQueue();
            this.message = '';
        },
        addSending(file, xhr, formData) {
            formData.append('message', this.message ? this.message : '');
            formData.append('room_id', this.$store.getters.get_current_room.room_id);
        }
    }
};
</script>

<style scoped>
.dropzone-main-chat-input {
    overflow-y: scroll;
    height: 280px;
}
.icon-close {
    float: right;
}
textarea {
    width: 100%;
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
</style>

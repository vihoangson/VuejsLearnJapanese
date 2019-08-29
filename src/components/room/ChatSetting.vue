<template>
    <div class="modal-group">
        <b-modal
            id="modal-prevent-setting-group"
            ref="modal"
            size="lg"
            title="Group Chat Setting"
            @show="resetModal"
            @hidden="hiddenModal"
            @ok="handleOk"
        >
            <div class="row">
                <div class="col-md-12">
                        <b-tabs content-class="mt-3">
                            <b-tab title="Group Chat Setting" active>
                                <form @submit="btnSaveSetting" id="saveSetting">
                                    <fieldset class="avatar-room">
                                        <div>
                                            <img width="200" height="200" id="output" :src="$store.getters.get_current_room.icon_img">
                                            <div @click="$refs.file.click()">Change</div>
                                        </div>
                                        <input type="file"  ref="file" @change="selectImg" style="display: none">


                                    </fieldset>
                                    <fieldset class="info-room">
                                        <div class="container">
                                            <div class="row">

                                                <div class="col-md-12">
                                                    <span>Group Chat Name:</span>
                                                    <span class="roomName">
                                                        <input v-model="roomName"  required>
                                                    </span>
                                                </div>
                                                <div v-if="error_msgs.room_name.length" v-for="err in error_msgs.room_name" class="alert-danger">
                                                    <div>{{err}}</div>
                                                </div>
                                            </div>
                                            <div class="row">

                                                <div class="col-md-12">
                                                    <span>Description:</span>
                                                    <span class="roomName">
                                                        <textarea placeholder="Add multiple lines" v-model="roomDescription"></textarea>
                                                    </span>
                                                </div>
                                                <div v-if="error_msgs.room_description.length" v-for="err in error_msgs.room_description" class="alert-danger">
                                                    <div>{{err}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </b-tab>
                            <b-tab title="Mute" >
                                <form id="">
                                    <fieldset>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <span class="roomText">
                                                        Mute
                                                    </span>
                                                    <a href="https://chatworken.zendesk.com/hc/en-us/articles/115002982686" >
                                                        <svg class="roomMute" viewBox="0 0 10 10" width="16" height="16">
                                                            <use fill-rule="evenodd" xlink:href="#icon_help"></use>
                                                        </svg>
                                                    </a>
                                                    <span class="roomSeparator">:</span>
                                                </div>
                                                <div class="col-md-10">
                                                    <span><input type="checkbox" /></span>
                                                    <span class="roomDescription">
                                                        Muting prevents all unread indicators and notifications from appearing unless you are mentioned.<br>All group chats you muted will be listed in [Muted Chats] under the category.
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </b-tab>
                        </b-tabs>
                </div>
            </div>
            <div slot="modal-footer" class="w-100">
                <b-button variant="outline-secondary" size="md" @click="handleSubmit" >Save</b-button>
                <b-button variant="outline-secondary" size="md" @click="btnCancel"> Cancel </b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import { API } from '../../services/api';
    import { ApiConst } from '../../common/ApiConst';
    import { AppConst } from '../../common/AppConst';

export default {
    name: 'ChatSetting',
    data() {
        return {
            roomId : 0,
            items : [],
            listAdmin : [],
            listMember : [],
            listReadOnly : [],
            error_msgs:{
                room_name:"",
                room_description:""
            },
            roomName: this.$store.getters.get_current_room.name
        };
    },
    mounted() {
        this.$root.$on('open-modal-setting-group', () => {
        });
    },
    created: function() {
    },
    computed: {
    },

    methods: {
        hiddenModal(){
        },
        resetModal(){
            this.roomName = this.$store.getters.get_current_room.room_name;
            this.roomDescription = this.$store.getters.get_current_room.room_description;
            this.roomIconImg = this.$store.getters.get_current_room.room_description;

        },
        selectImg(event){

                var input = event.target;

                var reader = new FileReader();
                let fileName = input.files[0].name
                var extension = fileName.match(/\.[0-9a-z]+$/i);

                let acceptedfile = AppConst.ACCEPTED_IMG_FILES.split(',');

                if(!acceptedfile.includes(extension[0])){
                    this.$root.$emit('push-notice', {
                        message: 'Can\'t choose this file',
                        alert: 'alert-danger'
                    });
                    return;
                }


                reader.onload = function(){
                    var dataURL = reader.result;
                    var output = document.getElementById('output');
                    output.src = dataURL;
                };
                reader.readAsDataURL(input.files[0]);

        },
        handleSubmit(){
            this.$store.dispatch('setLoadingPage',true);
            this.error_msgs.room_name = '';
            let data = {
                room_name : this.roomName,
                room_description : this.roomDescription,
                room_icon_img : this.roomIconImg,
                room_id : this.$store.getters.get_current_room.room_id,
            }

            let canUploadImg = true;
            if(canUploadImg){
                this.inputfile = this.$refs.file.files[0];
                let dataImg = new FormData();
                let i=0;
                dataImg.append('file[' + i + ']',this.inputfile);
                dataImg.append('room_id',this.$store.getters.get_current_room.room_id);
                API.POSTFILE(ApiConst.ROOM_UPLOAD_ICON_IMG,dataImg).then(response=>{
                    if(response.error_code === 0){
                        let prmCurrentRoom = this.$store.getters.get_current_room;
                        prmCurrentRoom.icon_img = response.data.icon_img;
                        this.$store.dispatch("setCurrentRoom",prmCurrentRoom);
                    }
                })
            }


            API.POST(ApiConst.ROOM_SETTING, data).then(response => {
                this.$store.dispatch('setLoadingPage',false);

                switch (response.error_code) {
                    case 0:
                        let prmCurrentRoom = this.$store.getters.get_current_room;
                        prmCurrentRoom.room_name = response.data.name;
                        prmCurrentRoom.room_description = response.data.description;
                        prmCurrentRoom.icon_img = response.data.icon_img;
                        this.$store.dispatch("setCurrentRoom",prmCurrentRoom);
                        this.$root.$emit('push-notice', {
                            message: 'insert success',
                            alert: 'alert-success'
                        });
                        this.roomName = '';
                        this.roomDescription = null;
                        this.$refs.modal.hide();

                        break;
                    case 1:
                        this.error_msgs = response.error_msg;
                        break;
                }
            });
        },
        btnSaveSetting(e) {
            e.preventDefault();
            this.handleSubmit();
        },
        btnCancel() {
            this.$refs.modal.hide();
        },
    }
};
</script>

<style>
    fieldset.info-room span {
        font-weight: 500;
        color: #888;
        margin-top: 6px;
        display: block;
    }
    .info-room input, .info-room textarea {
        width: 100%;
        PADDING: 5PX;
    }
    .info-room textarea{
        height:200px;
    }
    .avatar-room > div{
        position:relative;
    }
    .avatar-room > div:hover div{
        display: block;
    }
    .avatar-room div div {
        display: none;
        background: #4c4c4c;
        position: absolute;
        bottom: -10px;
        color: white;
        width: 100%;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
    }
.list-icon img {
    width: 30px;
    border-radius: 50%;
    border: 1px #eee solid;
    height: 30px;
    margin-right: 5px;
}
.list-icon{
    width: 100%;
    display: inline-block;
    margin: 15px 0;
    margin-bottom: 30px;
}
.icon_edit svg{
    height: 15px;
    width: 15px;
}
    #saveSetting>fieldset:nth-child(1) {
        float: left;
        width: 20%;
        MARGIN-TOP: 12PX;
    }
#saveSetting>fieldset:nth-child(1) img{
    width: 100%;
    height: auto;
}
#saveSetting>fieldset:nth-child(2){
    float:left;
    width:80%;
}
</style>

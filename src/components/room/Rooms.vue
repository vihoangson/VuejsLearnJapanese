<template>
    <div class="modal-group">
        <b-modal
            id="modal-prevent-rooms"
            ref="modal"
            size= "lg"
            title="Create a new Room Chat"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk">
            <form ref="form" class="form-rooms">
                <div class="row">
                    <div class="col-md-3">
                        <div class="roomInfo">
                            <img id="roomInfoImage" class="roomInfoImage" v-bind:src="roomImage" alt="">
                            <div id="roomIconChange" class="roomIconChange">Change</div>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="form-group">
                            <label>Room Chat Name:</label><div class="error">{{roomNameError}}</div>
                            <input type="text" name="roomName" v-model="roomName" class="form-control" placeholder="Group name">
                        </div>
                        <div class="form-group">
                            <label>Room Description:</label> <div class="error">{{roomDescriptionError}}</div>
                            <textarea name="description" v-model="description" id="Description" class="form-control" placeholder="Add chat description, notes, or links here."></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 clearfix">
                        <div class="searchRoom">
                            <span class="icSearch">
                                <svg viewBox="0 0 10 10" class="icSearch" width="16" height="16">
                                    <use fill-rule="evenodd" xlink:href="#icon_search"></use>
                                </svg>
                            </span>
                            <span class="icCancel" style="display:none">
                                <svg viewBox="0 0 10 10" class="icSearchCancel" width="16" height="16">
                                  <use fill-rule="evenodd" xlink:href="#icon_cancel"></use>
                                </svg>
                            </span>
                            <span class="inputSearch">
                                <input type="text" id="ContactFilter" class="form-control"  v-model="search" placeholder="Search by name">
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="MemberSelect">
                            <div id="SelectAllBtn" class="memberTableCheckAll" >
                                <input id="checkAll" name="checkAll" type="checkbox"  v-model="selectAll" @click="select">
                                <label for="checkAll" class="linkStatus" >Check All</label>
                            </div>
                            <ul id="OrganizationFilter" class="roomMemberSelect" role="radiogroup">
                                <li class="roomMemberSelect">
                                    <input type="radio" id="InfoOrganizeFilter" value="all" name="org_filter">
                                    <label for="InfoOrganizeFilter"> Show all </label>
                                </li>
                                <li class="roomMemberSelect">
                                    <input type="radio" id="InfoOrganized" value="organized" name="org_filter">
                                    <label for="InfoOrganized">Show only within organization</label>
                                </li>
                            </ul>
                            <div class="roomMemberSelect__commonRoleContainer">
                                <div id="roomInfoSelectRole" class="selectCommonRole">
                                    <div v-bind:class="{active: isActive, cwTextUnselectable: true}" @click="selectBoxClick">
                                        <div class="selectboxDefault">
                                              <span class="selectbox"> {{ selectItem }} </span>
                                              <span class="icon">
                                                <svg viewBox="0 0 10 10" width="16" height="16" >
                                                  <use fill-rule="evenodd" xlink:href="#icon_triangleDown"></use>
                                                </svg>
                                              </span>
                                        </div>
                                        <ul role="list" class="selectboxContent">
                                            <li @click="selectDefault"> Edit all permissions </li>
                                            <li v-for="(s, index) in subscriptions"
                                                :class="{ 'active': activeIndex === index}" :key="s.id"
                                                @click="setActive(s.id, s.name)">
                                                {{ s.name }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="table-scroll" >
                                <table class="table table-group">
                                    <tr v-for="(item, index) in filteredItems" :key="index">
                                        <td><input type="checkbox" v-model="selected[item.id]" @change="updateCheck(item.id)"></td>
                                        <td class="avatar">
                                            <img width="10" v-bind:src="item.icon_img">
                                        </td>
                                        <td class="persion">
                                            <p class="member">
                                                <span class="name">{{item.name}}</span>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <span class="company">{{item.company}}</span>
                                                <span class="selectRole" @click="itemRoleRoomClick($event)">
                                                    <div class="selectDefault" v-if="selected[item.id]">
                                                        <span class="selectbox">
                                                            <span v-if="selected[item.id]['name']">
                                                                  {{selected[item.id]['name']}}
                                                            </span>
                                                            <span v-else>
                                                                 {{subscriptions[1]['name']}}
                                                            </span>
                                                        </span>
                                                        <span class="icon">
                                                            <svg viewBox="0 0 10 10" width="16" height="16" >
                                                                <use fill-rule="evenodd" xlink:href="#icon_triangleDown"></use>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <ul role="list" class="selectContent">
                                                        <li v-for="(s, index) in subscriptions"
                                                            :class="{ 'active': activeIndex === index}" :key="s.id"
                                                            @click="setActiveItem(item.id, s.id, s.name)">
                                                            {{ s.name }}
                                                        </li>
                                                    </ul>
                                                </span>
                                            </p>
                                        </td>
                                        <td></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="error">
                            {{roomselectedError}}
                        </div>
                    </div>
                </div>
            </form>
            <div slot="modal-footer" class="w-100">
                <b-button variant="outline-secondary"
                :disabled="disableButton"
                size="md" @click="btnCreateRoom">{{buttonName}}</b-button>
                <b-button variant="outline-secondary" size="md" @click="btnCancel"> Cancel </b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import { API } from '../../services/api';
    import { ApiConst } from '../../common/ApiConst';
    export default {
        name: "Group",
        data() {
            return {
                name: '',
                nameState: null,
                submittedNames: [],
                items: [],
                search: "",
                isActive : false,
                activeIndex: undefined,
                selectItem: "Edit all permissions",
                subscriptions: [{id:1,name:'Admin'},{id:0,name:'Member'},{id:2,name:'Readonly'}],
                selected: [],
                selectAll: false,
                roomId: 0,
                roomName: "",
                roomImage: "",
                description: "",
                buttonName:"",
                disableButton: false,
                roomDescriptionError: "",
                roomNameError: "",
                roomselectedError: "",
            }
        },
        mounted() {
            this.$root.$on('open-modal-room', id => {
                this.roomId = id;
                this.roomName = '';
                this.description = '';
                this.roomImage = 'https://appdata.chatwork.com/avatar/3094/3094762.rsz.gif';
                this.selected = [];
                this.buttonName = "Create";
                var listNotAdmin = [];
                for(let i in this.$store.getters.get_list_user){
                    if(this.$store.getters.get_list_user[i].id !== this.$store.getters.get_current_user_info.id){
                        listNotAdmin.push(this.$store.getters.get_list_user[i]);
                    }
                }
                this.items = listNotAdmin;
            });
        },
        created: function(){
        },
        computed: {
            filteredItems() {
                if(this.items.length > 0){
                    return this.items.filter(item => {
                        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                    });
                }
                return [];
            }
        },
        methods: {
            select() {
                this.selected = [];
                if (!this.selectAll) {
                    for (let i in this.items) {
                        var id = this.items[i].id;
                        var selectRole = {id: id, permission : 0, name : this.subscriptions[1].name}
                        this.selected[id] = selectRole;
                    }
                }
            },
            itemRoleRoomClick(event){
                event.currentTarget.classList.toggle('active');
            },
            selectBoxClick(){
                if(this.isActive){
                    this.isActive = false;
                }else{
                    this.isActive = true;
                }
            },
            setActive(index, criptions) {
                var tamp = this.selected;
                this.activeIndex = index;
                this.selectItem = criptions;
                this.selected = [];

                for (let i in tamp) {
                    var id = tamp[i].id;
                    var selectRole = {id: id, permission : index, name : criptions}
                    this.selected[id] = selectRole;
                }
            },
            selectDefault(){
                this.selectItem = "Edit all permissions";
            },
            setActiveItem(id, index, name){
                var tamp = this.selected;
                this.selected = [];
                var selectRole = {id: id, permission : index, name : name}
                tamp[id] = selectRole;
                this.selected = tamp;
            },
            updateCheck(id){
                var tamp = this.selected;
                this.selected = [];
                for (let i in tamp) {
                    if(tamp[i] === true){
                        var selectRole = {id: id, permission : 0, name : this.subscriptions[1].name}
                        tamp[i] = selectRole;
                    }
                }
                this.selected = tamp;
            },
            checkFormValidity() {
                if(this.roomName === '' || this.roomName.length >= 50){
                    this.roomNameError = "Room Name not empty and may not be greater than 50 characters";
                    return false
                }
                if(this.description.length >= 255){
                    this.roomDescriptionError = "descriptiom may not be greater than 255 characters";
                    return false
                }
                return true;
            },
            resetModal() {
                this.name = ''
                this.nameState = null
            },
            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault()
                this.handleSubmit()
            },
            btnCancel(){
                this.$refs.modal.hide();
            },
            getUserbyId(id) {
                for (let i in this.$store.getters.get_list_user) {
                    if (this.$store.getters.get_list_user[i].id === id) {
                        return this.$store.getters.get_list_user[i];
                    }
                }
            },
            btnCreateRoom() {
                this.roomDescriptionError = "";
                this.roomNameError = "";
                this.roomselectedError= "";
                this.disableButton = true;
                this.selectAll = false;
                if(this.roomName === ''){
                    this.roomName = this.$store.getters.get_current_user_info.name
                }

                if (!this.checkFormValidity()) {
                    this.disableButton = false;
                    return
                }

                let data = {
                    room_name: this.roomName,
                    description: this.description,
                    icon_img: this.roomImage,
                    member_list: [],
                    only_token: true,
                    not_read: 0,
                    list_message: [],
                    can_add_user: 1
                }

                this.selected.forEach(x=>{
                    if(x !== false){
                        //data.member_list.push(x);
                        let userAdd = this.getUserbyId(x.id);
                        var roleInRoom = x.permission;
                        this.listAdd = {
                            company: userAdd.company,
                            email: userAdd.email,
                            icon_img: userAdd.icon_img,
                            id: userAdd.id,
                            name: userAdd.name,
                            role_in_room: roleInRoom,
                        };
                    }
                    data.member_list.push(this.listAdd);
                });

                API.POST(ApiConst.ROOM_ADD,data).then(response => {
                    if(response.error_code === 0){
                        switch(response.error_code){
                            case 0:
                                data.room_id = response.data;
                                this.$refs.modal.hide();

                                let admin_user = {
                                    company: this.$store.getters.get_current_user_info.company,
                                    email: this.$store.getters.get_current_user_info.email,
                                    icon_img: this.$store.getters.get_current_user_info.icon_img,
                                    id: this.$store.getters.get_current_user_info.id,
                                    name: this.$store.getters.get_current_user_info.name,
                                    role_in_room: 1,
                                };

                                data.member_list.push(admin_user);
                                this.$root.$emit('changed-list-room', data);
                                this.$root.$emit('changed-id-rooms');
                                this.$root.$emit('changed-group');
                                this.$root.$emit('push-notice', {message:'insert success', alert: 'alert-success'});
                                break;
                            case 1:
                                this.roomNameError = response.data;
                                break;
                            case 2:
                                this.roomDescriptionError = response.data;
                                break;
                            default:
                                this.$refs.modal.hide();
                                this.$root.$emit('push-notice', {
                                    message: response.data,
                                    alert: 'alert-danger'
                                });
                                break;
                        }
                    }
                    this.disableButton = false;
                });
            }
        },

    }
</script>

<style>
    .selectRole .selectContent li:hover{
        background: #0a8abd;
        color: #fff;
    }
    .selectRole{
        float: right;
        position: relative;
        display: block;
        width: 150px;
    }
    .selectRole .selectDefault{
        border: 1px #ccc solid;
        display: inline-block;
        width: 100%;
    }
    .selectRole .selectDefault .selectbox{
        width: 100%;
        display: inline-block;
        padding: 2px 10px;
    }
    .selectRole .selectDefault .icon{
        position: absolute;
        right: 5px;
        top: 1px;
    }
    .selectRole .selectContent{
        position: absolute;
        background: #fff;
        width: 100%;
        border: 1px #ccc solid;
        padding: 0;
        list-style: none;
        top: 22px;
        z-index: 10;
        display: none;
    }
    .selectRole.active .selectContent{
        display: block;
    }
    .selectRole .selectContent li{
        padding: 2px;
        padding-left: 6px;
        font-size: 13px;
    }
    .modal-title{
        font-weight: 600;
    }
    .modal-content{
        background: #F7f7f7;
    }
    .form-group{
        margin-bottom: 10px;;
    }
    .form-group label{
        font-size: 13px;
        font-weight: normal;
        line-height: 18px;
        color: #666666;
    }

    .form-rooms .roomInfo{
        border-radius: 5px;
        position: relative;
        -ms-flex-negative: 0;
        flex-shrink: 0;
    }
    .form-rooms .roomInfoImage{
        width: 100%;
        border-radius: 5px;
        max-width: 175px;
    }
    .form-rooms .roomIconChange{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30px;
        color: #fff;
        border-radius: 0 0 5px 5px;
        background: rgba(0, 0, 0, 0.8);
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        max-width: 175px;
    }
    .form-rooms .form-group label {
        vertical-align: top;
        margin-right: 10px;
    }
    .form-rooms .searchRoom{
        position: relative;
    }
    .form-rooms .searchRoom .icSearch{
        position: absolute;
        top: 5px;
        left: 4px;
    }
    .form-rooms .searchRoom .inputSearch input{
        padding-left: 30px;
        padding-top: 8px;
        margin: 5px 0;
    }
    .form-rooms .form-control {
        font-size: 14px;
    }
    .form-rooms .memberTableCheckAll{
        align-items: center;
        justify-content: center;
        border-style: solid;
        border-width: 1px;
        border-radius: 2px;
        border-color: #b3b3b3;
        text-decoration: none;
        cursor: pointer;
        padding: 5px 15px;
        line-height: 26px;
        font-size: 13px;
        background-color: #f5f5f4;
        margin-right: 10px;
        display: inline-block;
        height: 35px;
        width: 120px;
    }
    .form-rooms #checkAll{
        position: relative;
        top: 2px;
        height: 15px;
        width: 15px;
    }
    .form-rooms input[type="radio"], input[type="checkbox"] {
        position: relative;
        top: 2px;
        height: 15px;
        width: 15px;
    }
    .form-rooms .MemberSelect{
        padding: 10px;
        background: #fff;
        border: 1px #b3b3b3 solid;
        border-radius: 2px;

        position: relative;
    }
    .form-rooms .roomMemberSelect{
        display: inline-block;
        padding: 0;
        margin-bottom: 5px;
    }

    .form-rooms .roomMemberSelect li{
        display: inline-block;
        padding-left: 15px;
        font-size: 14px;
    }
    .form-rooms .roomMemberSelect input{
        position: relative;
        top: 3px;
        margin-right: 3px;
        height: 15px;
        width: 15px;
    }
    .form-rooms .selectboxDefault{
        position: absolute;
        right: 20px;
        top: 15px;
        align-items: center;
        justify-content: center;
        border-style: solid;
        border-width: 1px;
        border-radius: 2px;
        text-decoration: none;
        cursor: pointer;
        user-select: none;
        padding: 0px 12px;
        line-height: 26px;
        font-size: 13px;
        border-color: #b3b3b3;
        background-color: #fff;
        width: 200px;
    }
    .form-rooms .selectboxDefault .icon {
        top: 0;
        width: 10px;
        display: inline-block;
        position: absolute;
        right: 15px;
    }
    .form-rooms .selectboxContent{
        display: none;
        position: absolute;
        right: 0;
        top: 42px;
        z-index: 10;
        right: 20px;
        font-size: 13px;
        width: 200px;
        list-style: none;
        border: 1px #b6b6b6 solid;
        padding: 0;
        background: #fff;
        -webkit-box-shadow: 1px 2px 5px -3px rgba(0,0,0,0.75);
        -moz-box-shadow: 1px 2px 5px -3px rgba(0,0,0,0.75);
        box-shadow: 1px 2px 5px -3px rgba(0,0,0,0.75);
        cursor: pointer;
    }
    .form-rooms .active .selectboxContent{
        display: inline-block;
    }
    .form-rooms .selectboxContent li:hover{
        background: #0a8abd;
        color: #fff;
        transition: .5s;
    }
    .form-rooms .selectboxContent li{
        padding: 3px;
        padding-left: 12px;
    }
    .form-rooms .table-scroll{
        height: 210px;
        overflow-y: scroll;
        display: block;
        width: 100%;
        font-size: 14px;
    }
    .form-rooms .table-group tr{
        width: 100%;
    }
    .table-group tr td{
        padding: 10px;
        padding-bottom: 0;
        padding-top: 15px;
    }
    .table-group .avatar{
        width: 40px;
    }
    .table-group .avatar img{
        width: 100%;
        height: auto;
        position: relative;
        top: -3px;
    }
    .form-rooms .form-group textarea, .form-rooms .form-group input{
        width: 100%;
        display: inline-block;
    }
    .form-rooms .form-group textarea{
        height: 80px;
    }
    .form-rooms .error {
        display: block;
        font-size: 12px;
        color: red;
        float: right;
    }
</style>

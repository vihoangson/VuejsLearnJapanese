<template>
    <div class="modal-group">
        <b-modal
            id="modal-prevent-update-rooms"
            ref="modal"
            size= "lg"
            title="Add user to room"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk">
            <form ref="form" class="form-rooms">
                <div class="row">
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
                :disabled="!(selected.length > 0) || disableButton"
                size="md" @click="btnUpdateRoom">{{buttonName}}</b-button>
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
                buttonName:"",
                disableButton: false,
                roomselectedError: "",
                userId: 0,
            }
        },
        mounted() {
            this.$root.$on('open-modal-update-room', id => {
                this.roomId = this.$store.getters.get_current_room.room_id;
                this.items = [];
                this.selected = [];
                this.buttonName = "Add";
                this.getAllUser().then(response => {
                    this.items = response.data;
                });
            });
        },
        created: function(){
            let user = JSON.parse(localStorage.getItem(AppConst.LOCAL_USER));
            this.userId = user.user_id;
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
                if(this.selected.length === 0){
                    this.roomselectedError = "The selected field is required";
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
            getAllUser(){
                return API.POST(ApiConst.ROOM_GET_ALL_USER_BY_ROOM ,{
                    'room_id': this.$store.getters.get_current_room.room_id,
                    'is_added': 0
                }).then(response => {
                    return response;
                })
            },
            btnCancel(){
                this.$refs.modal.hide();
            },
            btnUpdateRoom() {
                this.roomselectedError= "";
                this.disableButton = true;
                this.selectAll = false;

                if (!this.checkFormValidity()) {
                    this.disableButton = false;
                    return
                }

                let data = {
                    room_id : this.roomId,
                    selected: this.selected,
                    only_token: true,
                }

                API.POST(ApiConst.ROOM_ADD_USER_TO_ROOM, data).then(response => {
                    if(response.error_code === 0){
                        switch(response.error_code){
                            case 0:
                                this.$refs.modal.hide();
                                this.$root.$emit('push-notice', {message:'insert success', alert: 'alert-success'});
                                this.$root.$emit('changed-id-rooms');
                            break;
                            case 1:
                                this.roomselectedError = response.data;
                                break;
                            default:
                            break
                        }
                    }
                    this.disableButton = false;
                });
            }
        }
    }
</script>

<style>
</style>

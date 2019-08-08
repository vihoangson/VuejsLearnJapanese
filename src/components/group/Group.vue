<template>
    <div class="modal-group">
        <b-modal
            id="modal-prevent-group"
            ref="modal"
            size="lg"
            title="Create a new Group Chat"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <form ref="form" class="form-groups">
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="label-left">Category name:</label>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="form-group">
                            <input
                                type="hidden"
                                name="userId"
                                v-model="userId"
                                class="form-control"
                            />
                            <input
                                type="text"
                                name="groupName"
                                v-model="groupName"
                                class="form-control"
                                placeholder="Category name"
                            />
                            <div class="error">{{groupNameError}}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="label-left">Choose chat:</label>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="form-group searchRoom">
                            <span class="icSearch">
                                <svg viewBox="0 0 10 10" class="icSearch" width="16" height="16">
                                    <use fill-rule="evenodd" xlink:href="#icon_search" />
                                </svg>
                            </span>
                            <span class="inputSearch">
                                <input
                                    type="text"
                                    id="ContactFilter"
                                    class="form-control"
                                    v-model="search"
                                    placeholder="Search by name"
                                />
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-9">
                        <div class="form-group">
                            <div class="MemberSelect">
                                <div id="SelectAllBtn" class="memberTableCheckAll">
                                    <input
                                        id="checkAll"
                                        name="checkAll"
                                        type="checkbox"
                                        v-model="selectAll"
                                        @click="select"
                                    />
                                    <label for="checkAll" class="linkStatus">
                                        Number of selected chats:
                                        <b>{{selected.length}}</b>
                                    </label>
                                </div>
                                <div class="table-scroll">
                                    <table class="table table-group">
                                        <tr v-for="(item, index) in filteredItems" :key="index">
                                            <td width="5%">
                                                <input
                                                    type="checkbox"
                                                    :value="item.room_id"
                                                    v-model="selected"
                                                />
                                            </td>
                                            <td width="10%" class="avatar">
                                                <img v-bind:src="item.icon_img" />
                                            </td>
                                            <td width="90%" class="persion">
                                                <p class="member">
                                                    <span class="name">{{item.room_name}}</span>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="error">{{selectedError}}</div>
                        </div>
                    </div>
                </div>
            </form>
            <div slot="modal-footer" class="w-100">
                <b-button
                    variant="outline-secondary"
                    :disabled="!(selected.length > 0) || (groupName.length == 0) || disableButton"
                    size="md"
                    @click="btnCreate"
                >{{buttonName}}</b-button>
                <b-button variant="outline-secondary" size="md" @click="btnCancel">Cancel</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { API } from '../../services/api';
import { ApiConst } from '../../common/ApiConst';
import { AppConst } from '../../common/AppConst';
export default {
    name: 'Group',
    mounted() {
        this.$root.$on('open-modal-group', groupId => {
            this.groupId = groupId;
            this.items = this.$store.getters.get_list_room;
            this.groupName = '';
            this.selected = [];
            if (groupId !== 0) {
                this.buttonName = 'Update';
                this.$store.getters.get_list_group.forEach(data =>{ 
                    this.items = this.$store.getters.get_list_room;
                    if(data.id === groupId){
                        this.groupName = data.name;
                        var items = this.items;
                        for (var i = 0; i < items.length; i++) {
                            for (var j = 0; j < data.room_list.length; j++) {
                                if (items[i].room_id === data.room_list[j].id) {
                                    this.selected.push(items[i].room_id);
                                    break;
                                }
                            }
                        }
                        this.selectAll =
                            this.selected.length === this.items.length;
                    }
                });
            } else {
                this.buttonName = 'Create';
                this.items = this.$store.getters.get_list_room;
            }
        });
    },
    data() {
        return {
            name: '',
            nameState: null,
            submittedNames: [],
            isActive: false,
            selectItem: 'Edit all permissions',
            subscriptions: [
                { id: 1, name: 'Admin' },
                { id: 2, name: 'Member' },
                { id: 3, name: 'Readonly' }
            ],
            activeIndex: undefined,
            search: '',
            items: [],
            selected: [],
            selectAll: false,
            groupName: '',
            userId: 0,
            description: '',
            groupId: 0,
            groupNameError: '',
            selectedError: '',
            buttonName: 'Create',
            disableButton: false
        };
    },
    created: function() {
        this.userId = this.$store.getters.get_current_user_info.id;
    },
    computed: {
        filteredItems() {
            if (this.items.length > 0) {
                return this.items.filter(item => {
                    return (
                        item.room_name
                            .toLowerCase()
                            .indexOf(this.search.toLowerCase()) > -1
                    );
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
                    this.selected.push(this.items[i].room_id);
                }
            }
        },

        setActive(index, criptions) {
            this.activeIndex = index;
            this.selectItem = criptions;
        },

        btnCancel() {
            this.$refs.modal.hide();
        },

        checkFormValidity() {
            if (this.groupName === '' || this.groupName.length >= 50) {
                this.groupNameError =
                    'The group name may not be greater than 50 characters';
                return false;
            }
            if (this.selected.length === 0) {
                this.selectedError = 'The selected field is required';
                return false;
            }

            return true;
        },

        getRoomByGroupId(id){
            this.$store.getters.get_list_group.forEach(x =>{
                let list_room = [];
                if(x !== null && x.id === id){
                    x.list_room.forEach( y=>{
                        if(y !== null){
                            list_room.push(y);
                        }
                    })
                }
                return list_room;
            })
        },

        // getRoomByRoomId(id){
        //     this.$store.getters.get_list_room.forEach(x =>{
        //         if(x !== null && x.room_id === id){
        //             console.log(x);
        //             return x;
        //         }
        //     })
        // },

        getRoomByRoomId(id) {
            for (let i in this.$store.getters.get_list_room) {
                if ( this.$store.getters.get_list_room[i].room_id === id) {
                    return this.$store.getters.get_list_room[i];
                }
            }
        },

        btnCreate() {
            this.disableButton = true;
            this.groupNameError = '';
            this.selectedError = '';
            if (this.groupId === 0) {
                this.selectAll = false;
                if (!this.checkFormValidity()) {
                    this.disableButton = false;
                    return;
                }

                let addData = {
                    group_name: this.groupName,
                    user_id: this.userId,
                    selected: this.selected,
                    only_token: true
                }

                API.POST(ApiConst.GROUP_ADD, addData).then(response => {
                    if (response !== undefined) {
                        switch (parseInt(response.error_code)) {
                            case 0:
                                this.$refs.modal.hide();
                                this.$root.$emit('push-notice', {
                                    message: 'insert success',
                                    alert: 'alert-success'
                                });

                                let pushData = {
                                    id: response.data,
                                    name: this.groupName,
                                    room_list: [],
                                    user_id: this.userId
                                }

                                this.selected.forEach(x=>{
                                    if(x !== null && x !== undefined){
                                        let data = this.getRoomByRoomId(x);
                                        let roomData = {
                                            id: data.room_id,
                                            icon_img: data.icon_img,
                                            name: data.room_name
                                        }
                                        pushData.room_list.push(roomData);
                                    }
                                });

                                let list_add = this.$store.getters.get_list_group;
                                list_add.push(pushData);
                                this.$store.dispatch('setListGroup', list_add);

                                break;
                            case 1:
                                this.groupNameError = response.data;
                                break;
                            case 2:
                                this.selectedError = response.data;
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
            } else {
                if (!this.checkFormValidity()) {
                    return;
                }

                API.POST(ApiConst.GROUP_UPDATE, {
                    id: this.groupId,
                    group_name: this.groupName,
                    user_id: this.userId,
                    selected: this.selected,
                    only_token: true
                }).then(response => {
                    switch (parseInt(response.error_code)) {
                        case 0:
                            this.$refs.modal.hide();
                            this.$root.$emit('push-notice', {
                                message: 'Update success',
                                alert: 'alert-success'
                            });

                            let room_list = [];

                            this.selected.forEach( x =>{
                                if(x !== null && x !== undefined){
                                    let data = this.getRoomByRoomId(x);
                                    let roomData = {
                                        id: data.room_id,
                                        icon_img: data.icon_img,
                                        name: data.room_name
                                    }
                                    room_list.push(roomData);
                                }
                            });

                            let list_update = this.$store.getters.get_list_group;
                            for (let i in list_update) {
                                if(list_update[i].id == this.groupId){
                                    list_update[i].name = this.groupName;
                                    list_update[i].room_list = room_list;
                                }
                            }

                            this.$store.dispatch('setListGroup', list_update);

                            break;
                        case 1:
                            this.groupNameError = response.data.error_msg;
                            break;
                        case 2:
                            this.selectedError = response.data.error_msg;
                            break;
                        default:
                            this.$refs.modal.hide();
                            this.$root.$emit('push-notice', {
                                message: response.data,
                                alert: 'alert-danger'
                            });
                            break;
                    }

                    this.disableButton = false;
                });
            }
        },

        resetModal() {
            this.name = '';
            this.nameState = null;
        },

        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.handleSubmit();
        }
    }
};
</script>

<style>
.modal-title {
    font-weight: 600;
}
.modal-content {
    background: #f7f7f7;
}
.form-group {
    margin-bottom: 10px;
}
.form-group input {
    width: 50%;
    display: inline-block;
}
.form-group label {
    font-size: 13px;
    font-weight: normal;
    line-height: 18px;
    color: #666666;
}
.form-groups .searchRoom {
    position: relative;
}
.form-groups .searchRoom .icSearch {
    position: absolute;
    top: 5px;
    left: 3px;
}
.searchRoom .inputSearch input {
    padding-left: 30px;
}
.form-control {
    font-size: 14px;
}
.form-group .error {
    display: inline-block;
    font-size: 12px;
    color: red;
}
.form-group input[type='checkbox'] {
    position: relative;
    top: 1px;
    width: 15px;
    height: 15px;
}
.memberTableCheckAll {
    justify-content: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 2px;
    border-color: #b3b3b3;
    text-decoration: none;
    cursor: pointer;
    padding: 5px 10px;
    font-size: 13px;
    background-color: #f5f5f4;
    margin-right: 10px;
    display: inline-block;
    height: 30px;
    width: 90%;
}
#checkAll {
    position: relative;
    top: 1px;
}
.memberTableCheckAll label {
    margin-left: 3px;
    position: relative;
    top: -1px;
}
.table-scroll {
    height: 300px;
    overflow-y: scroll;
    display: block;
    border: 1px #b3b3b3 solid;
    width: 90%;
}
.table-group tr {
    width: 100%;
}
.table-group tr td {
    padding-top: 10px;
    padding-bottom: 10px;
}
.table-group .avatar {
    width: 40px;
}
.table-group .avatar img {
    width: 20px;
    height: auto;
    position: relative;
    top: -3px;
}
.modal-header {
    padding: 10px 15px;
}
.modal-footer {
    text-align: center;
    padding: 10px 15px;
}
.form-group .label-left {
    font-weight: bold;
    position: relative;
    top: 5px;
    font-size: 16px;
}
</style>
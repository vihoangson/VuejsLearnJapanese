<template>
    <div class="modal-group">
        <b-modal
            id="modal-prevent-edit-user"
            ref="modal"
            size="lg"
            title="Update user to room"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <form ref="form" class="form-rooms">
                <div class="row">
                    <div class="col-md-12 clearfix">
                        <div class="searchRoom">
                            <span class="icSearch">
                                <svg viewBox="0 0 10 10" class="icSearch" width="16" height="16">
                                    <use fill-rule="evenodd" xlink:href="#icon_search" />
                                </svg>
                            </span>
                            <span class="icCancel" style="display:none">
                                <svg
                                    viewBox="0 0 10 10"
                                    class="icSearchCancel"
                                    width="16"
                                    height="16"
                                >
                                    <use fill-rule="evenodd" xlink:href="#icon_cancel" />
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
                    <div class="col-md-12">
                        <div class="MemberSelect">
                            <div class="table-scroll">
                                <table class="table table-group">
                                    <tr v-for="(item, index) in filteredItems" :key="index">
                                        <td class="avatar" width="10%">
                                            <img width="10" v-bind:src="item.icon_img" />
                                        </td>
                                        <td class="persion" width="10%">
                                            <p class="member">
                                                <span class="name">{{item.name}}</span>
                                            </p>
                                        </td>
                                        <td width="65%">
                                            <p>
                                                <span class="company">{{item.company}}</span>
                                                <span
                                                    class="selectRole"
                                                    @click="itemRoleRoomClick($event)"
                                                >
                                                    <div
                                                        class="selectDefault"
                                                        v-if="selected[item.id]"
                                                    >
                                                        <span class="selectbox">
                                                            <span
                                                                v-if="selected[item.id]['name']"
                                                            >{{selected[item.id]['name']}}</span>
                                                            <span
                                                                v-else
                                                            >{{subscriptions[1]['name']}}</span>
                                                        </span>
                                                        <span class="icon">
                                                            <svg
                                                                viewBox="0 0 10 10"
                                                                width="16"
                                                                height="16"
                                                            >
                                                                <use
                                                                    fill-rule="evenodd"
                                                                    xlink:href="#icon_triangleDown"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <ul role="list" class="selectContent">
                                                        <li
                                                            v-for="(s, index) in subscriptions"
                                                            :class="{ 'active': activeIndex === index}"
                                                            :key="s.id"
                                                            @click="setActiveItem(item.id, s.id, s.name)"
                                                        >{{ s.name }}</li>
                                                    </ul>
                                                </span>
                                            </p>
                                        </td>
                                        <td width="5%">
                                            <span
                                                class="icon-delete"
                                                @click="deleteUserOfRoom(item.id)"
                                            >
                                                <svg
                                                    viewBox="0 0 10 10"
                                                    id="icon_cancel"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M6.831 2.5L4.997 4.335 3.163 2.5l-.663.663 1.834 1.834L2.5 6.831l.663.663L4.997 5.66l1.834 1.834.663-.663-1.835-1.834 1.835-1.834z"
                                                    />
                                                </svg>
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <span class="icon_add_user" v-if="this.$store.getters.get_is_admin_room" @click="openModalAddUserRoom()" >
                                <svg viewBox="0 0 10 10" id="icon_plus" xmlns="http://www.w3.org/2000/svg"><path d="M4.375.625v3.75H.625v1.25h3.75v3.75h1.25v-3.75h3.75v-1.25h-3.75V.625z"></path></svg> Add Member
                            </span>
                        </div>
                        <div class="error">{{roomselectedError}}</div>
                    </div>
                </div>
            </form>
            <div slot="modal-footer" class="w-100">
                <b-button
                    variant="outline-secondary"
                    :disabled="!(selected.length > 0) || disableButton"
                    size="md"
                    @click="btnSaveRoom"
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
    data() {
        return {
            name: '',
            nameState: null,
            submittedNames: [],
            items: [],
            search: '',
            isActive: false,
            activeIndex: undefined,
            selectItem: 'Edit all permissions',
            subscriptions: [
                { id: 0, name: 'Member' },
                { id: 1, name: 'Admin' },
                { id: 2, name: 'Readonly' }
            ],
            selected: [],
            selectAll: false,
            roomId: 0,
            buttonName: '',
            disableButton: false,
            roomselectedError: '',
            userId: 0
        };
    },
    mounted() {
        this.$root.$on('open-modal-edit-user', data => {
            this.buttonName = 'Save';
            this.roomId = this.$store.getters.get_current_room.room_id;
            this.items = this.$store.getters.get_list_user_by_room_id;
            var selectTamp = [];
            for (let i in this.items) {
                var id = this.items[i].id;
                var selectRole = {
                    id: id,
                    permission: this.items[i].role_in_room,
                    name: this.subscriptions[this.items[i].role_in_room].name
                };
                selectTamp[id] = selectRole;
            }
            this.selected = selectTamp;
        });
    },
    created: function() {    },
    computed: {
        filteredItems() {
            if (this.$store.getters.get_list_user_by_room_id.length > 0) {
                return this.items.filter(item => {
                    return (
                        item.name
                            .toLowerCase()
                            .indexOf(this.search.toLowerCase()) > -1
                    );
                });
            }
            return [];
        }
    },
    methods: {
        itemRoleRoomClick(event) {
            event.currentTarget.classList.toggle('active');
        },
        selectBoxClick() {
            if (this.isActive) {
                this.isActive = false;
            } else {
                this.isActive = true;
            }
        },
        setActiveItem(id, index, name) {
            var tamp = this.selected;
            this.selected = [];
            var selectRole = { id: id, permission: index, name: name };
            tamp[id] = selectRole;
            this.selected = tamp;
        },
        resetModal() {
            this.name = '';
            this.nameState = null;
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.handleSubmit();
        },
        btnCancel() {
            this.$refs.modal.hide();
        },
        deleteUserOfRoom(id) {
            var itemsTamp = [];
            for (let i in this.items) {
                if (id !== this.items[i].id) {
                    itemsTamp[i] = this.items[i];
                }
            }
            for (let i in this.selected) {
                if (id === this.selected[i].id) {
                    this.selected[i] = 'empty';
                }
            }

            this.items = itemsTamp;
        },
        btnSaveRoom() {
            let data = {
                room_id: this.roomId,
                selected: this.selected,
                only_token: true
            };

            API.POST(ApiConst.ROOM_UPDATE, data).then(response => {
                if(response !== undefined){
                    switch (response.error_code) {
                        case 0:
                            this.$refs.modal.hide();
                            this.$root.$emit('push-notice', {
                                message: 'Save success',
                                alert: 'alert-success'
                            });
                            var listRoom = this.$store.getters.get_list_room;
                            for (let i in listRoom) {
                                if (listRoom[i].room_id === this.roomId) {
                                    listRoom[i].selected = this.selected;
                                    listRoom[i].option = 0;
                                    this.$root.$emit('change-list-room', listRoom[i]);
                                    break;
                                }
                            }
                            break;
                        case 1:
                            this.roomselectedError = response.data;
                            break;
                        case 6:
                            this.$bvModal
                            .msgBoxOk( response.data, {
                                size: 'sm',
                                buttonSize: 'sm',
                                okVariant: 'success',
                                centered: true
                            });
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
            });
        },
        openModalAddUserRoom(){
            this.$refs.modal.hide();
            this.$root.$emit('open-modal-add-user');
            this.$bvModal.show('modal-prevent-add-user');
        }
    }
};
</script>

<style>
.table-scroll .icon-delete svg {
    height: 16px;
    width: 16px;
}
.icon_add_user{
    margin-top: 10px;
    display: inline-block;
}
.icon_add_user svg{
    height: 15px;
    width: 15px;
    position: relative;
    top: -2px;
}
</style>

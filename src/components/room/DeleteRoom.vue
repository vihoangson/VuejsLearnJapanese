<template>
    <div class="modal-group">
        <b-modal
            id="modal-prevent-delete-room"
            ref="modal"
            size="lg"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <div slot="modal-header">
                <p class="">
                     Do you really want to delete "room1"?
                </p>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="dialogRoomConfirmDelete">
                        <p class="">
                            Please check the followings prior to deleting group chats.
                        </p>
                        <ul class="">
                            <li class="">
                                <label>
                                  <span class="checkbox"><input type="checkbox" v-model="checkedOne"/></span> 
                                  This will not only delete from your list, but will be applied for everyone else participating in the group chat.
                                </label>
                            </li>
                            <li class="">
                                <label>
                                  <span class="checkbox"><input type="checkbox" v-model="checkedTwo"/></span> All messages, tasks, and files will be deleted.
                                </label>
                            </li>
                            <li class="">
                                <label>
                                  <span class="checkbox"><input type="checkbox" v-model="checkedThree"/></span> All deleted data will never be restored.
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div slot="modal-footer" class="w-100">
                <b-button variant="outline-secondary" size="md" @click="btnCancel">Cancel</b-button>
                <b-button variant="outline-secondary" :disabled="!checkedOne || !checkedTwo || !checkedThree" size="md" @click="btnOk"> Delete(I have confirmed) </b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { API } from '../../services/api';
import { ApiConst } from '../../common/ApiConst';
export default {
    name: 'Group',
    data() {
        return {
            checkedOne: false,
            checkedTwo: false,
            checkedThree: false,
        };
    },
    methods: {
        btnOk(bvModalEvt) {
            let data = {
                id: this.$store.getters.get_current_room.room_id
            };
            API.POST(ApiConst.ROOM_DELETE, data).then(response => {
                if (response !== undefined) {
                    switch (parseInt(response.error_code)) {
                        case 0:
                            this.$root.$emit('push-notice', {
                                message: 'Delete success',
                                alert: 'alert-success'
                            });
                            let room = this.$store.getters.get_list_room.find(
                                d => {
                                    return d.room_id === data.id;
                                }
                            );
                            if (room !== undefined) {
                                let idx = this.$store.getters.get_list_room.indexOf(
                                    room
                                );
                                this.$store.getters.get_list_room.splice(
                                    idx,
                                    1
                                );
                            }
                            this.$root.$emit('changed-group');
                            this.$refs.modal.hide();
                            break;
                        default:
                            this.$root.$emit('push-notice', {
                                message: response.data,
                                alert: 'alert-danger'
                            });
                            this.$refs.modal.hide();
                            break;
                    }
                }
            });
        },
        btnCancel() {
            this.$refs.modal.hide();
        },
    }
};
</script>

<style>

</style>

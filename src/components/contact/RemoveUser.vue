<template>
    <div class="modal-group">
        <b-modal
            id="modal-prevent-remove-user"
            ref="modal"
            size="lg"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <div slot="modal-header">
                <p class="">
                     Do you really want to delete this user ?
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
    mounted(){
        this.$root.$on('open-modal-delete-room', id => {
            this.checkedOne = false;
            this.checkedTwo = false;
            this.checkedThree = false;
        });
    },
    methods: {
        btnOk(bvModalEvt) {

            let data = {
                contact_user_id: this.$store.state.UserIdToDelete
            };

            if(true){
                API.POST(ApiConst.DELETE_CONTACT, data).then(response => {
                    if (response !== undefined) {
                        switch (parseInt(response.error_code)) {
                            case 0:
                                this.$root.$emit('push-notice', {
                                    message: 'Delete success',
                                    alert: 'alert-success'
                                });

                                this.$root.$emit('EVENT_BUTTON_'+this.$store.state.UserIdToDelete, {id:123});

                                let roomID = response.data.roomID;
                                this.$store.dispatch('removeRoomById',roomID);

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
            }
        },
        btnCancel() {
            this.$refs.modal.hide();
        },
    }
};
</script>

<style>

</style>

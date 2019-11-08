<template>
    <div id="_contactElementButtonAdd" class="button-contact" style="">
        <button v-if="status === null" class="btn btn-sm btn-primary" @click="addContact">Add contact</button>
        <button v-if="status === 0" class="btn btn-sm btn-warning" @click="removeContact">Cancel request</button>
        <button v-if="status === 2" class="btn btn-sm btn-success" @click="Approve">Approve</button>
        <button v-if="status === 1" class="btn btn-sm btn-default">View info user</button>
        <button v-if="status === 1" class="btn btn-sm btn-danger" @click="deleteContact">Delete contact</button>
    </div>
</template>

<script>
    import {API} from '../../../services/api';
    import {ApiConst} from '../../../common/ApiConst';
    import {AppConst} from '../../../common/AppConst';


    export default {
        name: "ButtonAddContact.vue",
        props:['status','email','id'],
        created(){
            this.$root.$on('EVENT_BUTTON_'+this.id,data => {
                this.$parent.isActive = false;
            })
        },
        methods:{
            // ACTION APPROVE
            Approve(){

                let requestData = {
                    contact_user_id: this.id
                };
                API.POST(ApiConst.APPROVE_CONTACT, requestData).then(response => {
                    if(response.error_code ===0){
                        this.status = 1;
                        // this.$parent.isActive = false;


                        // todo: send me
                        let data = {
                            room_name: response.data.partner.name,
                            description: response.data.room_info.description,
                            room_id: response.data.room_info.id,
                            icon_img: response.data.partner.icon_img,
                            member_list: [response.data.me],
                            only_token: true,
                            not_read: 0,
                            list_message: [],
                            can_add_user: 0
                        }

                        this.$store.dispatch('addNewRoom', data);
                        this.$root.$emit('changed-info-rooms');
                        this.$socket.emit(AppConst.EVENT_MESSAGE.JOIN_NEW_ROOM, data.room_id);

                        // todo: send partner
                        let data2 = {
                            room_name: response.data.me.name,
                            description: response.data.room_info.description,
                            icon_img: response.data.me.icon_img,
                            room_id: response.data.room_info.id,
                            member_list: [response.data.partner],
                            only_token: true,
                            not_read: 0,
                            list_message: [],
                            can_add_user: 0
                        }
                        this.$socket.emit(AppConst.EVENT_MESSAGE.ADD_NEW_ROOM, data2);

                        this.$parent.$parent.$parent.contactTabs.find((e)=>{return e.id === '_contactWindowTabWaitForAccept'}).subtext  = '';
                        this.$store.dispatch('getWaitingAccept');

                    }
                    console.log(response);
                })
            },

            // ACTION ADD CONTECT
            addContact(){
                let requestData = {
                    emails: [this.email],
                    message: 'Add contact'
                };
                API.POST(ApiConst.INVITE_BY_EMAILS, requestData).then(response => {
                    if(response.error_code ===0){
                        this.status = 0;
                        // this.$parent.isActive = false;
                    }
                    console.log(response);
                })
            },
            deleteContact(){
                this.$root.$emit('open-modal-delete-room');
                this.$store.dispatch('setUserIdToDelete',this.id);
                this.$bvModal.show('modal-prevent-remove-user');

            },
            // ACTION REMOVE
            removeContact(){
                let requestData = {
                    id: this.id
                };
                API.POST(ApiConst.CANCEL_REQUEST_CONTACT, requestData).then(response => {

                    if(response.error_code ===0){
                        this.status = null;
                        // this.$parent.isActive = false;
                    }
                })
            }
        }
    }
</script>

<style scoped>
.btn-default{
    background: #ccc;
}
    .button-contact{
        text-align: center;
    }

</style>

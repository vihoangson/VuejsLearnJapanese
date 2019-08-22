<template>
    <div id="_contactElementButtonAdd" class="button-contact" style="">
        <button v-if="status === null" class="btn btn-sm btn-primary" @click="addContact">Add contact</button>
        <button v-if="status === 0" class="btn btn-sm btn-warning" @click="removeContact">Cancel request</button>
        <button v-if="status === 2" class="btn btn-sm btn-success" @click="Approve">Approve</button>
        <button v-if="status === 1" class="btn btn-sm btn-default">View info user</button>
    </div>
</template>

<script>
    import {API} from '../../../services/api';
    import {ApiConst} from '../../../common/ApiConst';

    export default {
        name: "ButtonAddContact.vue",
        props:['status','email','id'],
        methods:{
            Approve(){
                let requestData = {
                    contact_user_id: this.id
                };
                API.POST(ApiConst.APPROVE_CONTACT, requestData).then(response => {
                    if(response.error_code ===0){
                        this.status = 1;
                    }
                    console.log(response);
                })
            },
            addContact(){
                let requestData = {
                    emails: [this.email],
                    message: 'Add contact'
                };
                API.POST(ApiConst.INVITE_BY_EMAILS, requestData).then(response => {
                    if(response.error_code ===0){
                        this.status = 0;
                    }
                    console.log(response);
                })
            },
            removeContact(){
                let requestData = {
                    id: this.id
                };
                API.POST(ApiConst.CANCEL_REQUEST_CONTACT, requestData).then(response => {
                    if(response.error_code ===0){
                        this.status = null;
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
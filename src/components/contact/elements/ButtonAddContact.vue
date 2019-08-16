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
                    console.log(response);
                    /**
                     * Check data response
                     */
                    if( 1 === 0 ){
                        this.showResultData.display = 'block';
                        this.buttons.send.display = 'none';
                        this.buttons.inviteMore.display = 'inline-block';
                        this.contentInviteMailNew.display = 'none';

                        if (response.error_code === 0) {
                            this.contactInviteMailSection[0].display = 'block';
                            this.contactInviteMailSection[1].display = 'none';
                            this.contentInviteMailFinished.push({
                                key: 'SentEmails',
                                id: '_contactInviteMailSentEmails',
                                text: 'Invitation sent',
                                display: 'block',
                                class: 'contactInviteMailResult',
                                classChild: 'contactInviteMailResultTitle mailResultTitleSuccess',
                                data: response.data.emails
                            });
                        } else {
                            this.contactInviteMailSection[1].display = 'block';
                            this.contactInviteMailSection[0].display = 'none';
                            var arr = Object.keys(response.data);
                            var errList = [];
                            arr.forEach(function (key, index) {
                                var temp = key.split('.');
                                console.log(response.data[key]);
                                var tempData = response.data[key];
                                tempData.forEach(function (k, index) {
                                    tempData[index] = tempData[index].replace(key, emails[temp[1]]);
                                });
                                let error = {
                                    key: 'UnreachableEmailAddresses',
                                    id: '_contactInviteMailUnreachableEmailAddresses',
                                    text: emails[temp[1]],
                                    display: 'block',
                                    class: 'contactInviteMailResult',
                                    classChild: 'contactInviteMailResultTitle mailResultTitleFailed',
                                    data: tempData
                                };
                                errList.push(error);
                            });
                            this.appendToErrList(errList);
                        }
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
<template>
    <div>

        <div>
            <b-button v-b-modal.modal-1 class="btn btn-compose">Compose</b-button>
            <b-modal id="modal-1" title="Compose" @hidden="resetModal">
                <template v-slot:modal-header="{ close }" v-if="false">
                    <!-- Emulate built in modal header close button action -->
                    <b-button size="sm" variant="outline-danger" @click="close()">
                        Close Modal
                    </b-button>
                    <h5>Modal Header</h5>
                </template>
                <template v-slot:modal-footer="{ ok, cancel, hide }">
                    .
                </template>

                <form @submit="$event.preventDefault()">
                    <label>Name</label>
                    <input class="form-control m-2" v-model="subject">
                    <label>Email</label>
                    <input class="form-control m-2" v-model="email">
                    <label>Content</label>
                    <textarea class="form-control m-2" v-model="content"></textarea>
                    <button @click="sendMessage" class="btn btn-primary m-2">Send</button>
                </form>
            </b-modal>
        </div>


    </div>
</template>


<script>
    import Messages from "./Messages";
    import {eventBusEmail} from '../../../main';
    import moment from 'moment';

    export default {
        name: 'Compose',
        props: {
            data: {
                type: Object
            }
        },
        methods: {
            sendMessage() {
                eventBusEmail.$emit('sendMessage', {
                    message: {
                        subject: this.subject,
                        email: this.email,
                        content: this.content,
                        isDeleted: false,
                        type: 'outgoing',
                        date: moment(),
                        from: {
                            name: 'alsdkfj',
                            email: this.email
                        },
                        attachments: []
                    }
                });
                this.$bvModal.hide('modal-1');


            }
        },
        computed: {
            incomingMessages: function () {
                return this.data.filter(e => {
                    return e.type === 'outgoing' && e.isDeleted === false;
                });
            }
        },
        components: {
            'appMessages': Messages,
        }
    }
</script>

<template>
    <div class="inbox-body">
        <button class="btn btn-primary" @click="eventBack"><i class="fas fa-arrow-left"></i> Back</button>
        <button class="btn btn-danger" @click="deleteMessage" :disabled="data.message.isDeleted"><i class="fas fa-trash"></i> Delete</button>
        <hr>
        <p><strong>Date:</strong> {{ data.message.date.fromNow() }}</p>
        <p><strong>From:</strong> {{ data.message.from.name }} <{{ data.message.from.email }}></p>
        <hr>

        <div v-html="data.message.content" class="message"></div>

        <div v-if="data.message.attachments.length > 0" class="attachments">
            <h4>Attachments</h4>

            <ul>
                <li v-for="attachment in data.message.attachments">
                    <i class="fa fa-paperclip"></i> {{ attachment.fileName }} ({{ attachment.size | formatBytes }})
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {eventBusEmail} from "../../../main";

    export default {
        props: {
            data: {
                type: Object,
                required: true,
            }
        },
        activated() {
            console.log(this.data.message);
            if (typeof this.data.message.isRead === 'undefined' || this.data.message.isRead === false) {
                this.data.message.isRead = true;
            }
        },
        filters: {
            formatBytes(bytes) {
                if (bytes === 0) {
                    return '0 Bytes';
                }

                let decimals = 2;
                let k = 1000;
                let dm = decimals + 1 || 3;
                let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                let i = Math.floor(Math.log(bytes) / Math.log(k));

                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            }
        },
        methods: {
            eventBack () {
                let backpage = this.$parent.previousView;
                eventBusEmail.$emit('changeView',{
                    tag: backpage.tag,
                    title: backpage.title,
                    data: backpage.data,
                })
            },
            deleteMessage(){
                this.data.message.isDeleted = true;
            }

        }

    }
</script>



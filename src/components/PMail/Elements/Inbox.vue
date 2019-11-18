<template>
    <div>
        <h3>Inbox</h3>
        <div class="btn-group">
            <a class="btn" @click="refreshBtn"><i class="fas fa-refresh"></i> Refresh</a>
        </div>
        <app-messages :messages="incomingMessages" :key="i"></app-messages>
        {{i}}
    </div>
</template>


<script>
    import Messages from "./Messages";
    import {eventBusEmail} from "../../../main";

    export default {
        data(){
            return {
                i :0
            }
        },
        props: {
            data: {
                type: Object
            }
        },
        computed: {
            incomingMessages: function () {
                return this.data.filter(e => {
                    return e.type === 'incoming' && e.isDeleted === false;
                });
            }
        },
        components: {
            'appMessages': Messages,
        },
        methods:{
            refreshBtn (){
                eventBusEmail.$emit('refeshMessage')
                this.i = this.i+1;
            }
        }

    }
</script>



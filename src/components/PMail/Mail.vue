<template>
    <div>
        <div class="container">
            <div class="mail-box">
                <app-sidebar :messages="messages"></app-sidebar>
                <app-content :messages="messages"></app-content>
            </div>

        </div>
    </div>
</template>


<script>
    import Sidebar from "./Elements/Sidebar";
    import Content from "./Elements/Content";
    import data from "./data/data";
    import dataRandom from "./data/dataRandom";
    import {eventBusEmail} from '../../main';
    export default {

        data() {
            return {
                messages: data,
            }
        },

        created(){
            eventBusEmail.$on('sendMessage',(data) => {
                let temp = [data.message]
                this.messages = temp.concat(this.messages.slice(0));
            });
            eventBusEmail.$on('refeshMessage',() => {
                let randomIndex = Math.floor(Math.random()*dataRandom.length);
                let temp = [dataRandom[randomIndex]];
                this.messages = temp.concat(this.messages.slice(0));
            })
        },

        components: {
            'appSidebar': Sidebar,
            'appContent': Content,
        },
    }
</script>



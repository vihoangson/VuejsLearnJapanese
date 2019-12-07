<template>
    <div>
        <div>
            <div class="container text-center p-3">
                <div class="row">
                    <div class="col-6">
                        <b-button @click="joinChannelAll">Join Channel All</b-button>
                        <hr>
                        <b-button @click="doSocket">Socket</b-button>
                        <hr>

                    </div>
                    <div class="col-6">

                        <span>Channel Name</span>
                        <input v-model="channelName" class="form-control">
                        <b-button @click="joinChannelManual">Join Channel Manual {{channelName}}</b-button>
                        <hr>
                        <span>Channel Name Listen</span>
                        <input v-model="nameChannelListen" class="form-control">
                        <b-button @click="doSocketManual">doSocketManual</b-button>
                        <hr>

                    </div>
                </div>


            </div>
        </div>

    </div>
</template>


<script>

    import 'vue-slider-component/theme/antd.css'

    export default {
        name: "Socket",
        created(){
            this.$socket.emit('joinChannel',{nameChannel :'all'})
        },
        data() {
            return {
                channelName:'all',
                nameChannelListen:'',
            }
        },
        components: {
        },
        methods:{
            joinChannelManual(){
                this.$socket.emit('joinChannel',{nameChannel :this.channelName})
                this.$bvToast.toast('Add to channel: '+this.channelName, {
                    title: 'Notice',
                    autoHideDelay: 1000,
                    toaster: 'b-toaster-bottom-right',
                    appendToast: true
                });
            },
            joinChannelAll(){
                this.$socket.emit('joinChannel',{nameChannel :'all'})
                this.$bvToast.toast('Add to channel: All', {
                    title: 'Notice',
                    autoHideDelay: 1000,
                    toaster: 'b-toaster-bottom-right',
                    appendToast: true
                });
            },

            doSocketManual(){
                this.$socket.emit('demoSocketManual',{nameChannelListen:this.nameChannelListen})
                this.$bvToast.toast('doSocketManual: '+this.channelName, {
                    title: 'Notice',
                    autoHideDelay: 1000,
                    toaster: 'b-toaster-bottom-right',
                    appendToast: true
                });

            },
            doSocket(){
                this.$socket.emit('demoSocket',{Ok:true})
                this.$bvToast.toast('doSocketManual: all', {
                    title: 'Notice',
                    autoHideDelay: 1000,
                    toaster: 'b-toaster-bottom-right',
                    appendToast: true
                });

            },
        },

    };
</script>

<style>

</style>

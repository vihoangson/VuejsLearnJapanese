<template>
    <div>
        <div>
            <div class="container text-center p-3">

                <b-button @click="broadcasts">broadcasts</b-button>
                <div class="row">
                    <div class="col-6">
                        <h2>ALL SOCKET</h2>
                        <b-button @click="joinChannelAll">Join Channel All</b-button>
                        <hr>
                        <b-button @click="doSocket">Socket</b-button>
                        <hr>

                    </div>
                    <div class="col-6">
                        <h2>MANUAL SOCKET</h2>
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
                <div class="row">
                    <div class="col-6">
                        <h2>List room</h2>
                        <button class="btn btn-block btn-dark" @click="getListRoom">Get list room</button>
                    </div>
                    <div class="col-6">
                        <div v-for="(item,key) in  $store.getters.get_list_room_socket  ">
                            <h3>{{key}}</h3>
                            {{item.sockets}}
                        </div>
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
            broadcasts(){

            },
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
                this.$bvToast.toast('doSocketManual: '+this.nameChannelListen, {
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
            getListRoom(){
                this.$socket.emit('demoSocket',{Ok:true})
                this.$socket.emit('getListRoom',{Ok:true})

                this.$bvToast.toast('getListRoom', {
                    title: 'Notice',
                    autoHideDelay: 1000,
                    toaster: 'b-toaster-bottom-right',
                    appendToast: true
                });
            }
        },

    };
</script>

<style>

</style>

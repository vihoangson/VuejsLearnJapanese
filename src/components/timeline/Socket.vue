<template>
    <div>
        <div>
            <div class="container text-center p-3">
<!--                <b-button @click="joinChannelAll">Join Channel All</b-button>-->

                <b-button @click="doSocket">Socket</b-button>

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
            }
        },
        components: {
        },
        methods:{
            doSocket(){
                this.$socket.emit('demoSocket',{Ok:true})
            },
        },

    };
</script>

<style>

</style>

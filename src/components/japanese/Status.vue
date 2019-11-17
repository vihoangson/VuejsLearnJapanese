<template>
    <div class="container mt-5 p-4" id="status-component">
        <button class="btn btn-primary" @click="changeName"><i class="fa fa-bar-chart" aria-hidden="true"></i> Change name</button>

        <div class="m-3 alert alert-dark">{{name}}</div>

        <div v-if="false" v-for="c in ListCharactor" id="list-word">
            <status-message :text="c"></status-message>
        </div>
        <div class="row mt-2">
            <div class="col-lg-6">
                <log-message :name="name" @resetName="name = $event" :resetFn = "changeName"></log-message>
            </div>
            <div class="col-lg-6">
                <backup-message></backup-message>
            </div>
        </div>
        <hr>

        <button @click.prevent="activeView='Demo2'; bindText=ListCharactor" class="btn btn-primary">Demo2</button>
        <button @click.prevent="activeView='BackupMessage'; bindText=ListCharactor" class="btn btn-primary">BackupMessage</button>

        <keep-alive>
            <component :is="activeView" :text = "bindText" ></component>
        </keep-alive>



    </div>
</template>

<script>

    import StatusMessage from "./admin-block/StatusMessage";
    import LogMessage from "./admin-block/LogMessage";
    import BackupMessage from "./admin-block/BackupMessage";
import Demo2 from "./admin-block/Demo2";
    export default {
        name: 'AdminStatus',
        data(){
            return {
                bindText:'textDefault',
                activeView:'BackupMessage',
                name:"Max"
            }
        },

        mixins: [],
        computed: {
            ListCharactor() {
                this.$store.dispatch("setWord");
                return this.$store.getters.get_word;
            }
        },
        created() {
            this.$store.dispatch('getWaitingAccept');
        },
        methods:{
            changeName(){
                if(this.name === "Min1"){
                    this.name="Max1";
                }else{
                    this.name="Min1";
                }

            }
        },
        components: {
            Demo2,
            StatusMessage,
            LogMessage,
            BackupMessage
        },


    };
</script>
<style scoped>
#list-word > div{
    float: left;
    margin: 10px;
    padding: 10px;
    background: #ccc;
    width: 109px;
    border-radius: 11px;
    text-align: center;
    font-size: 22px;
}
    #status-component{
        background: #daf0ff;
    }
</style>



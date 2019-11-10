<template>
    <div>
        <div id="log-message">Log</div>
    </div>
</template>

<script>

    export default {
        name: 'BackupMessage',
        mixins: [],
        components: {},
        props:['text'],
        methods:{
            handleClick(text){
                alert(text);
            }
        },
        data() {
        },

    };
</script>
<style scoped>
    #log-message{
        background: #66a300;
        width:100%;
        min-height: 300px;
    }
</style>

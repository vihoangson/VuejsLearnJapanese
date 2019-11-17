<template>
    <div>
        <div id="2">Log2222222222222</div>
        {{text}}

    </div>
</template>

<script>

    export default {
        name: 'Demo2',
        mixins: [],
        components: {},
        props:['text'],
        activated(){
            console.log('activated');
        },
        deactivated(){
            console.log('deactived');
        },
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
        background: #222222;
        width:100%;
        min-height: 300px;
    }
</style>

<template>
    <div>
        <div id="log-message">
            <div class="m-4">{{name}}</div>
            <div class="m-4">{{handleName()}}</div>

        </div>
    </div>
</template>

<script>

    export default {
        name: 'Log',
        mixins: [],
        components: {},
        props:['name'],
        methods:{
            handleName(){
                return this.name.split("").reverse().join("");
            },
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
        background: #1c6989;
        width:100px;
        height:100px;
    }
</style>

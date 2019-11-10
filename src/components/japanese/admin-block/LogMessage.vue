<template>
    <div>
        <div id="log-message">

            <button class="btn btn-danger m-2" @click="resetFn()">Change name in child component</button>
            <button class="btn btn-danger m-2" @click="changName">Change name in child component</button>
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
        props:['name','resetFn'],
        methods:{
            changName(){
                this.$emit('resetName','Reseted !');
            },
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
        width:100%;
        min-height: 300px;
    }
</style>

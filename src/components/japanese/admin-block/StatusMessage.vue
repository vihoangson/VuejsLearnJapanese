<template>
    <div>
        <div @click="handleClick(text.k3)">
            {{text.k2}}
        </div>
    </div>
</template>

<script>

    export default {
        name: 'ChatBox',
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


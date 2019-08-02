<template>
    <div id="base-contact1">

        <Notice></Notice>
        <Header></Header>
        <div>404</div>

    </div>
</template>

<script>
    // import axios from 'axios'

    import Header from "../global/Header";
    import Notice from "../global/Notice";

    export default {
        name: '404',
        component: {
            Header,
            // Room,
            // Chat,
            // Rooms,
            // Group,
            Notice
        },

        data() {
            return {};
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    };
</script>

<style scoped>
</style>

<template>
    <div>
        <status-message></status-message>
    </div>
</template>

<script>

    import StatusMessage from "./admin-block/StatusMessage";

    export default {
        name: 'AdminStatus',
        mixins: [],
        created(){
            this.$store.dispatch('getWaitingAccept');
        },
        components: {
            StatusMessage
        },
        data() {

        },

    };
</script>


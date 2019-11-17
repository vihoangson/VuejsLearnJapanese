<template>
    <div>
        <h3>Send</h3>
        <app-messages :messages="incomingMessages"></app-messages>
    </div>
</template>


<script>
    import Messages from "./Messages";

    export default {
        props: {
            data: {
                type: Object
            }
        },
        computed: {
            incomingMessages: function () {
                return this.data.filter(e => {
                    return e.type === 'outgoing' && e.isDeleted === false;
                });
            }
        },
        components: {
            'appMessages': Messages,
        }

    }
</script>



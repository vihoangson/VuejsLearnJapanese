<template>
    <div>
        <h3>Inbox</h3>
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
                    return e.type === 'incoming' && e.isDeleted === false;
                });
            }
        },
        components: {
            'appMessages': Messages,
        }

    }
</script>



<template>
    <div v-bind:class="getClass()">
        <pre>
            <div class="message">
                <DynamicType
    :data="item.data"
    v-for="(item, index) in this.list_content_message"
    :key="index"
></DynamicType>
<img class="message-badge-avatar" :src="this.messageObject.user_info.icon_img" />
            </div>
        </pre>
    </div>
</template>
<script>
import DynamicType from './message/DynamicType';
export default {
    name: 'ChatMessage',
    components: {
        DynamicType
    },
    props: {
        messageObject: Object,
        message_content: String
    },
    data() {
        return {
            user: this.$store.getters.get_current_user,
            list_content_message: []
        };
    },
    create() {
        this.formatMessage();
    },
    methods: {
        // formatMessage() {
        //     let msg = this.messageObject.message;

        //     if (msg.match(/(\[To:([0-9])+])/g)) {
        //         this.type = 'To';
        //     } else if (msg.match(/(\[Reply mid:([0-9]+) to:([0-9]+)\])/g)) {
        //         this.type = 'Reply';
        //     }

        //     let messagePath = msg.substring(0, msg.indexOf('\n') + 1);
        //     this.to_name = messagePath;
        //     this.to_name = this.to_name.replace(
        //         /(\[To:([0-9])+])|(\[Reply mid:([0-9]+) to:([0-9]+)\])/g,
        //         ''
        //     );

        //     this.content = msg.substring(msg.indexOf('\n') + 1, msg.length - 1);
        // },
        getClass(to) {
            if (to === this.user.id) return 'mention';
        },
        formatMessage() {
            let msg = this.messageObject.message;
            let listContentLineBreak = msg.split('\n');
            listContentLineBreak.forEach(x => {
                let item = {
                    data: '',
                    type: ''
                };
                // if (x.match(/(\[To:([0-9])+])/g)) {
                //     item.type = 'To';
                //     item.data = x.replace(/(\[To:([0-9])+])/g, '');
                // } else if (x.match(/(\[Reply mid:([0-9]+) to:([0-9]+)\])/g)) {
                //     item.type = 'Reply';
                //     item.data = x.replace(
                //         /(\[Reply mid:([0-9]+) to:([0-9]+)\])/g,
                //         ''
                //     );
                // } else {
                //     item.type = 'Default';
                //     item.data = x;
                // }
                item.data = x;
                this.list_content_message.push(item);
            });
            console.log(this.list_content_message)
        }
    },
    mounted() {
        this.formatMessage();
    },
    watch: {
        message_content: function(val) {
            this.formatMessage();
        }
    }
};
</script>
<style scoped>
.message-badge {
    display: inline-flex;
    margin: 2px 2px 0 0;
    vertical-align: top;
}
.message-badge-avatar {
    box-sizing: border-box;
    width: 18px;
    height: 18px;
    margin: 0;
    border: 1px solid #66a300;
    border-radius: 0 2px 2px 0;
    cursor: pointer;
    vertical-align: middle;
}
.mention {
    background-color: read;
}
</style>

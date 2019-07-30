<template>
    <div>
        <div v-if="this.type !== ''" class="message">
            <div class="message-badge">
                <component :is="this.type" :msg="this.content"></component>
                <img class="message-badge-avatar" :src="this.messageObject.user_info.icon_img" />
            </div>
            {{this.to_name}}
        </div>
        <pre>{{this.content}}</pre>
    </div>
</template>
<script>
import Reply from './message/Reply';
import To from './message/To';
export default {
    name: 'ChatMessage',
    components: {
        Reply,
        To
    },
    props: ['messageObject'],
    data() {
        return {
            type: '',
            to_name: '',
            content: '',
            msg: 'To'
        };
    },
    created() {
        this.content = this.messageObject.message;
        if (this.content.match(/(\[To:([0-9])+])/g)) {
            this.type = 'To';
        } else if (
            this.content.match(/(\[Reply mid:([0-9]+) to:([0-9]+)\])/g)
        ) {
            this.type = 'Reply';
        }
        let messagePath = this.content.split('\n');
        console.log(messagePath);
        if (messagePath.length > 1) {
            this.to_name = messagePath[0];
            this.to_name = this.to_name.replace(
                /(\[To:([0-9])+])|(\[Reply mid:([0-9]+) to:([0-9]+)\])/g,
                ''
            );
            this.content = messagePath[1];
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
</style>

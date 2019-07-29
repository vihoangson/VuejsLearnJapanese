<template>
    <div>
        <div v-if="this.type > 0" class="message">
            <div class="message-badge">
                <To v-if="this.type === 1"></To>
                <Reply v-if="this.type === 2"></Reply>
                <img class="message-badge-avatar" :src="this.messageObject.user_info.icon_img" />
            </div>
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
            type: 0,
            content: ''
        };
    },
    created() {
        console.log(this.messageObject);
        this.content = this.messageObject.message;
        if (this.content.match(/(\[To\s+)/g)) {
            this.type = 1;
            this.content = this.content.replace(/(\[To\s+)/g, '');
        } else if (this.content.match(/(\[Reply\s+)/g)) {
            this.type = 2;
            this.content = this.content.replace(/(\[Reply\s+)/g, '');
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

<template>
    <div v-bind:class="getClass()">
        <div class="message">
            <Dynamic :string="content" />
        </div>
    </div>
</template>
<script>
import Dynamic from './message/DynamicType';

export default {
    name: 'ChatMessage',
    components: {
        Dynamic
    },
    props: {
        messageObject: Object,
        message_content: Object
    },
    data() {
        return {
            user: this.$store.getters.get_current_user,
            content: '',
            listContent: [],
            reply: `<div class="message-badge"><div class="reply-message"> <span class="reply-message-icon"> <svg viewBox="0 0 10 10" id="icon_chatTimeLineReplyBadge" xmlns="http://www.w3.org/2000/svg" > <path d="M6.67 3.336H3.192l1.818-1.819a.415.415 0 0 0 0-.589L4.42.34a.415.415 0 0 0-.589 0L.297 3.874a.416.416 0 0 0 0 .59L3.832 8a.415.415 0 0 0 .59 0l.589-.589a.415.415 0 0 0 0-.59L3.192 5.003H6.67c.92 0 1.667.746 1.667 1.667v2.083c0 .23.186.417.416.417h.834c.23 0 .416-.187.416-.417V6.67A3.333 3.333 0 0 0 6.67 3.336"/> </svg> </span> <span class="reply-message-txticon">RE</span> </div><img class="message-badge-avatar" data-aid="2647483" src="https://appdata.chatwork.com/icon/ico_group.png"> </div>`,
            to: `<div class="message-badge"> <div class="to-message"> <span class="to-message-txticon">TO</span> </div><img class="message-badge-avatar" src="https://appdata.chatwork.com/icon/ico_group.png"/> </div>`
        };
    },
    create() {
        this.formatMessage();
    },
    methods: {
        getClass(to) {
            if (to === this.user.id) return 'mention';
        },
        formatMessage() {
            this.content = this.messageObject.message;

            let regExpTo = /(\[To:([0-9])+])/g;
            let regExpReply = /(\[Reply mid:([0-9]+) to:([0-9]+)\])/g;
            this.content = this.content.replace(regExpTo, this.to);
            this.content = this.content.replace(regExpReply, this.reply);
        }
    },
    mounted() {
        this.formatMessage();
    },
    watch: {
        message_content: function(val) {
            console.log(val);
            this.formatMessage();
        }
    }
};
</script>
<style>
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
.reply-message {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 18px;
    background-color: #66a300;
    border-radius: 2px 0 0 2px;
    padding: 2px 4px 2px 3px;
    cursor: pointer;
}
.reply-message:hover {
    background-color: #598f00;
}
.reply-message-icon {
    width: 12px;
    height: 16px;
    fill: #ffffff;
    margin-right: 3px;
    position: relative;
}
.reply-message-icon svg{
    position: absolute;
    left: 0px;
    top: 1px;
}
svg:not(:root) {
    overflow: hidden;
}
.reply-message-txticon {
    color: #ffffff;
    font-weight: 750;
    font-size: 12px;
}
.to-message {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 18px;
    background-color: #66a300;
    border-radius: 2px 0 0 2px;
    padding: 4px 4px 2px 3px;
    cursor: pointer;
}
.to-message:hover {
    background-color: #598f00;
}
.to-message-icon {
    width: 12px;
    height: 16px;
    fill: #ffffff;
    margin-right: 3px;
}
svg:not(:root) {
    overflow: hidden;
}
.to-message-txticon {
    color: #ffffff;
    font-weight: 750;
    font-size: 12px;
}
pre {
    display: block;
    font-family: monospace;
    white-space: pre;
    margin: 1em 0px;
}
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}
</style>

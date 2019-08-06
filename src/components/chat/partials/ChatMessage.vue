<template>
    <div v-bind:class="getClass()">
        <div class="message">
            <pre><template v-for="(item, index) in this.listContent">{{item.content}}<component :key="index" v-if="item.type !== ''" :is="item.type" :msg="item.data"></component></template></pre>
        </div>
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
    props: {
        messageObject: Object,
        message_content: Object
    },
    data() {
        return {
            user: this.$store.getters.get_current_user,
            content: '',
            listContent: []
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
            this.listContent = [];
            this.content = this.messageObject.message;

            let regExp = /(\[To:([0-9])+])|(\[Reply mid:([0-9]+) to:([0-9]+)\])/g;
            let m;
            let mIndex = 0;
            if (!this.content.match(regExp))
                this.listContent.push({
                    type: '',
                    content: this.content
                });
            else {
                while ((m = regExp.exec(this.content))) {
                    this.listContent.push({
                        type: '',
                        content: this.content.substring(mIndex, m.index)
                    });
                    let matchStr = this.content.substring(
                        m.index,
                        regExp.lastIndex
                    );
                    let item = {};
                    if (matchStr.match(/(\[To:([0-9])+])/g)) {
                        item.type = 'To';
                        // let userId = matchStr.match(/([0-9]+)/g);
                    } else if (
                        matchStr.match(/(\[Reply mid:([0-9]+) to:([0-9]+)\])/g)
                    )
                        item.type = 'Reply';

                    item.data = matchStr;

                    this.listContent.push(item);
                    mIndex = regExp.lastIndex;
                    let str = this.content.substring(
                        regExp.lastIndex,
                        this.content.length
                    );
                    if (!str.match(regExp)) {
                        this.listContent.push({
                            type: '',
                            content: str
                        });
                        break;
                    }
                }
            }
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
}
svg:not(:root) {
    overflow: hidden;
    margin-top: -5px;
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

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
            to: `<div class="message-badge"> <div class="to-message"> <span class="to-message-txticon">TO</span> </div><img class="message-badge-avatar" src="https://appdata.chatwork.com/icon/ico_group.png"/> </div>`,
            titleText: `<div class="title"><svg viewBox="0 0 10 10" id="icon_info" xmlns="http://www.w3.org/2000/svg"><path d="M5 0a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 9.22A4.22 4.22 0 1 1 9.22 5 4.22 4.22 0 0 1 5 9.22z"></path><path d="M4.38 3.75h1.25v4.38H4.38zm0-1.87h1.25v1.25H4.38z"></path></svg>`,
            quoteText: `<div class="dev_quote chatQuote">
    <div class="chatQuote__title">
    <span class="icon-quote"> <svg viewBox="0 0 10 10" id="icon_quote" xmlns="http://www.w3.org/2000/svg"><path d="M3.863 2.5a2.388 2.388 0 0 0-2.388 2.387c0 .191.031.372.076.549a1.476 1.476 0 1 1 .837 2.69l-.297-.03a2.38 2.38 0 0 1-2.09-2.358 3.862 3.862 0 0 1 3.862-3.862.313.313 0 0 1 0 .626zm5.825 0a2.387 2.387 0 0 0-2.387 2.387c0 .191.031.372.075.549a1.476 1.476 0 1 1 .837 2.69l-.298-.03a2.38 2.38 0 0 1-2.09-2.358 3.862 3.862 0 0 1 3.862-3.862.313.313 0 0 1 0 .626z"></path></svg></span>
        <span class="piconname">
            <img class=" _avatarHoverTip _avatarClickTip avatarClickTip avatarTiny _avatar _avatarAid3127618" data-aid="3127618" src="https://appdata.chatwork.com/avatar/3484/3484555.gif" data-cwtag="[picon:3127618]">
            <span>Hoang Sy Hung [PG]</span>
        </span>
        <time class="quoteTimeStamp chatQuote__timeStamp"><span data-cwtag="[date:1566463714]">22/8/2019 15:48</span></time>
    </div>
    <div class="quoteText">`
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

            let regExpTo = /(\[to:([0-9])+])/g;
            let regExpReply = /(\[reply mid:([0-9]+) to:([0-9]+)\])/g;
            let regExpInfo = /(?<=\[info\])(.|\n)*?(?=\[\/info\])/g;
            let regExpCode = /(?<=\[code\])(.|\n)*?(?=\[\/code\])/g;
            let regExpTitle = /(?<=\[title\])(.|\n)*?(?=\[\/title\])/g;
            let regExpQuote = /(?<=\[quote\])(.|\n)*?(?=\[\/quote\])/g;
            let regExpAllTag = /(\[\/?\w+)(.*?\])/g;

            this.content = this.content.replace(regExpAllTag, function(matchs) {
                return matchs.toLowerCase();
            });

            this.content = this.content.replace(regExpTo, this.to);
            this.content = this.content.replace(regExpReply, this.reply);
            this.content = this.content.replace(regExpInfo, function(matchs) {
                return `<div class="chatInfo">` + matchs + `</div>`;
            });
            this.content = this.content.replace(regExpCode, function(matchs) {
                return `<div class="chatCode hljs">` + matchs + `</div>`;
            });
            let titleText = this.titleText;
            this.content = this.content.replace(regExpTitle, function(matchs) {
                return titleText + matchs + `</div>`;
            });
            let qoute = this.quoteText;
            this.content = this.content.replace(regExpQuote, function(matchs) {
                return qoute + matchs + `</div></div>`;
            });

            this.content = this.content.replace(regExpAllTag,'');
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
.reply-message-icon svg {
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
.chatInfo {
    position: relative;
    background: #fff;
    border: 1px solid #b3b3b3;
    border-radius: 3px;
    margin-top: 5px;
    padding: 4px 8px;
}

.chatCode {
    box-sizing: border-box;
    display: block;
    padding: 10px 15px;
    margin: 10px 0;
    color: #000;
    border: 1px solid #fff;
    border-radius: 3px;
    background-color: #f5f5f3;
    overflow-x: auto;
    font-family: Consolas, Menlo, Courier, monospace;
    font-weight: 400;
    white-space: pre;
    word-wrap: normal;
}
.hljs {
    display: block;
    padding: 1em;
    background: #2b2a27;
    color: #ede0ce;
    overflow-wrap: break-word;
    white-space: pre-wrap;
}
.title svg{
    width: 16px;
    height: 16px;
}
.chatCode svg{
    fill: #FFF !important;
}
.chatQuote{
    line-height: 0;
}
.chatQuote__quoteLeftArea svg{
    width: 16px;
    height: 16px;
}
.chatQuote__title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    max-width: calc(100% - 24px);
    height: 24px;
    color: #999999;
    font-size: 11px;
}
.chatQuote__title .icon-quote{
    width: 18px;
    height: 18px;
}
.chatQuote__title > .piconname {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    padding-right: 10px;
}
.chatQuote__timeStamp {
    display: inline-flex;
    flex-shrink: 0;
}
.avatarTiny {
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    flex-shrink: 0;
}
.quoteText {
    border-left: 1px solid #666666;
    padding: 5px 0 5px 5px;
    margin-left: 20px;
    word-wrap: break-word;
}
</style>

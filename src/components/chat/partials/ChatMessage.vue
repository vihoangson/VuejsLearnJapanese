<template>
    <div class="message">
        <Dynamic :string="content" />
    </div>
</template>
<script>
import Dynamic from './message/DynamicType';
import { processQuote } from '../../../helpers/process-quote';
import { AppConst } from '../../../common/AppConst';
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
            listUsers: this.$store.getters.get_list_user,
            user: this.$store.getters.get_current_user,
            content: '',
            listContent: [],
            toAllText: `<div class="message-badge"><div class="reply-message"><span class="reply-message-txticon">TO ALL</span></div></div>`,
            titleText: `<div class="title"><svg viewBox="0 0 10 10" id="icon_info" xmlns="http://www.w3.org/2000/svg"><path d="M5 0a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 9.22A4.22 4.22 0 1 1 9.22 5 4.22 4.22 0 0 1 5 9.22z"></path><path d="M4.38 3.75h1.25v4.38H4.38zm0-1.87h1.25v1.25H4.38z"></path></svg>`
        };
    },
    create() {
        this.formatMessage();
    },
    methods: {
        formatMessage() {
            this.content = this.messageObject.message;
            this.content = this.content.replace(
                AppConst.REGULAR.ALL_TAG,
                function(matchs) {
                    return matchs.toLowerCase();
                }
            );

            this.content = this.content.replace(AppConst.REGULAR.LINK, function(
                matches
            ) {
                return '<a href="' + matches + '" >' + matches + '</a>';
            });

            this.content = this.processReplyMessage(
                this.listUsers,
                this.content
            );

            this.content = this.content.replace(
                AppConst.REGULAR.TO_ALL,
                this.toAllText
            );

            this.content = this.processToMessage(this.listUsers, this.content);

            this.content = this.content.replace(
                AppConst.REGULAR.TAG_INFO,
                function(matchs) {
                    return `<div class="chatInfo">` + matchs + `</div>`;
                }
            );
            this.content = this.content.replace(
                AppConst.REGULAR.TAG_CODE,
                function(matchs) {
                    return `<div class="chatCode hljs">` + matchs + `</div>`;
                }
            );
            let titleText = this.titleText;
            this.content = this.content.replace(
                AppConst.REGULAR.TAG_TITLE,
                function(matchs) {
                    return titleText + matchs + `</div>`;
                }
            );
            this.content = processQuote(this.listUsers, this.content);
            this.content = this.processPreviewMessage(this.content);

            this.content = this.content.replace(AppConst.REGULAR.ALL_TAG, '');
            this.content = this.content.replace(
                AppConst.REGULAR.EMOJI,
                function(x) {
                    let emoji = AppConst.EMOJI.find(d => {
                        return d.code === x;
                    });
                    if (emoji !== undefined)
                        return (
                            '<img class="ui_emoticon" src="' + emoji.src + '"/>'
                        );
                }
            );
        },
        processToMessage(listUsers, content) {
            let html = content.replace(AppConst.REGULAR.TO, function(matchs) {
                let to =
                    '<div class="message-badge"> <div class="to-message"> <span class="to-message-txticon">TO</span> </div>{img} </div>';
                let toId = matchs.match(AppConst.REGULAR.REPLY_TO_ID);
                let user = listUsers.find(function(x) {
                    return x.id === parseInt(toId[0]);
                });
                if (user !== undefined) {
                    let img =
                        '<img class="message-badge-avatar" src="' +
                        user.icon_img +
                        '"/>';
                    to = to.replace(/{img}/g, img);
                } else {
                    let img =
                        '<img class="message-badge-avatar" src="https://appdata.chatwork.com/avatar/ico_avatar_notfound.png"/>';
                    to = to.replace(/{img}/g, img);
                }
                return to;
            });
            return html;
        },
        processReplyMessage(listUsers, content) {
            let html = content.replace(AppConst.REGULAR.REPY, function(
                matches
            ) {
                let reply = `<div class="message-badge"><div class="reply-message" @click="reply($event,{mid})"><span class="reply-message-icon"><svg viewBox="0 0 10 10" id="icon_chatTimeLineReplyBadge" xmlns="http://www.w3.org/2000/svg"><path d="M6.67 3.336H3.192l1.818-1.819a.415.415 0 0 0 0-.589L4.42.34a.415.415 0 0 0-.589 0L.297 3.874a.416.416 0 0 0 0 .59L3.832 8a.415.415 0 0 0 .59 0l.589-.589a.415.415 0 0 0 0-.59L3.192 5.003H6.67c.92 0 1.667.746 1.667 1.667v2.083c0 .23.186.417.416.417h.834c.23 0 .416-.187.416-.417V6.67A3.333 3.333 0 0 0 6.67 3.336" /></svg></span><span class="reply-message-txticon">RE</span></div>{img}<div class="reply-message-popup" id="reply-message-popup-{mid}"><div class="tooltipTriangle" style="left: 220px;"></div><div class="reply-message-popup-content" id="reply-message-popup-content-{mid}"></div><div class="reply-message-popup-footer"><div class="reply-popup-button" @click="gotoMessage({mid})">Go to this message</div></div></div></div>`;
                let toId = matches.match(AppConst.REGULAR.REPLY_TO_ID);
                let user = listUsers.find(function(x) {
                    return x.id === parseInt(toId[0]);
                });
                if (user !== undefined) {
                    let img =
                        '<img class="message-badge-avatar" src="' +
                        user.icon_img +
                        '"/>';
                    reply = reply.replace(/{img}/g, img);
                } else {
                    let img =
                        '<img class="message-badge-avatar" src="https://appdata.chatwork.com/avatar/ico_avatar_notfound.png"/>';
                    reply = reply.replace(/{img}/g, img);
                }
                let messageId = matches.match(AppConst.REGULAR.REPLY_MESSAGE_ID);
                reply = reply.replace(/{mid}/g, messageId);
                return reply;
            });
            return html;
        },
        processPreviewMessage(content) {
            let file = process.env.ROOT_API +'/api/v1/file/show-file/';
            let html = content.replace(AppConst.REGULAR.PREVIEW, function(
                matches
            ) {
                let imgId = matches.match(AppConst.REGULAR.ATTRIBUTE_ID);
                let heightImg = matches.match(AppConst.REGULAR.PREVIEW_HEIGHT);
                let img = '';
                if (imgId || heightImg) {
                    img = '<img src="{src}" style="height: {height}px" />';
                    img = img.replace(/{src}/g, file + imgId[0]);
                    img = img.replace(/{height}/g, heightImg[0]);
                }
                return img;
            });
            html = html.replace(AppConst.REGULAR.DOWNLOAD, function(matches) {
                let downloadId = matches.match(AppConst.REGULAR.ATTRIBUTE_ID);
                if (downloadId)
                    return (
                        '<div><a href="' +
                        file +
                        downloadId[0] +
                        '" target="_downloadFrame" >' +
                        matches +
                        '</a></div></div>'
                    );
                return '';
            });
            return html;
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
    border-radius: 2px 0px 0px 2px;
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

.to-message-txticon {
    color: #ffffff;
    font-weight: 750;
    font-size: 12px;
}

pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-y: hidden;
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
.title svg {
    width: 16px;
    height: 16px;
}
.chatCode svg {
    fill: #fff !important;
}
.chatQuote {
    line-height: 0;
}
.chatQuote__quoteLeftArea svg {
    width: 16px;
    height: 16px;
}
.chatQuote__title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    align-items: center;
    max-width: calc(100% - 24px);
    height: 24px;
    color: #999999;
    font-size: 11px;
}
.chatQuote__title .icon-quote {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    fill: #4d4d4d;
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
    margin-right: 5px;
}
.quoteText {
    border-left: 1px solid #666666;
    padding: 5px 0 5px 5px;
    margin-left: 20px;
    word-wrap: break-word;
    min-height: 20px;
    line-height: 20px;
}
.chatInfo > .title {
    display: flex;
    align-items: center;
    margin: -4px -8px 4px;
    padding: 4px 8px;
    background: #f2f2f2;
    border-bottom: 1px solid #cccccc;
    border-radius: 2px 2px 0 0;
}
.chatInfo div {
    padding: 8px 0;
}

.chatInfo {margin-bottom: 14px;}
.reply-message-popup{
    position: fixed;
    z-index: 9999;
    background: white;
    -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
    width: 450px;
    border-radius: 7px;
    padding: 2px;
}
.reply-message-popup-content{
    padding: 10px 20px;
}
.reply-message-popup-footer{
    border-radius: 0 0 3px 3px;
    background: #e6e6e6;
    text-align: center;
    padding: 5px 0;
}
.reply-popup-button{
    box-sizing: border-box;
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 2px;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    padding: 0 12px;
    min-width: 26px;
    min-height: 26px;
    line-height: 26px;
    font-size: 13px;
    border-color: #b3b3b3;
    background-color: #f5f5f4;
    color: #34362f;
    fill: #34362f;
}
.tooltipTriangle{
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    content: '';
    border-style: solid;
    border-color: transparent;
    pointer-events: none;
    bottom: -8px;
    border-top-color: #b3b3b3;
    border-width: 8px 8px 0;
}
.tooltipTriangle:after {
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    content: '';
    border-style: solid;
    border-color: transparent;
    pointer-events: none;
    left: -7px;
    bottom: 1px;
    border-top-color: #fff;
    border-width: 7px 7px 0;
}
</style>

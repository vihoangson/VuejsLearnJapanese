<script>
export default {
    name: 'DynamicType',
    props: {
        string: {
            required: true,
            type: String
        }
    },
    render(h) {
        const render = {
            template: '<pre>' + this.string + '</pre>',
            methods: {
                reply(e,mid){
                    setTimeout(function(){
                        var replyPopup = document.getElementsByClassName('reply-message-popup');
                        for(var i = 0; i < replyPopup.length; i++)
                            if(replyPopup[i].style.display === 'block')
                                replyPopup[i].style.display = 'none';

                        var messageContent = document.getElementById('mid-'+mid);
                        var divReplyMessage = document.getElementById('reply-message-popup-content-'+mid);

                        if(messageContent !== null)
                            divReplyMessage.innerHTML = messageContent.innerHTML;
                        else divReplyMessage.innerHTML = '<div class="messegeDelete">Message deleted.</div>';

                        var divReplyPopup = document.getElementById('reply-message-popup-'+mid);
                        divReplyPopup.style.top = e.pageY - 150 + "px";
                        divReplyPopup.style.left = e.pageX - 200 + "px";
                        divReplyPopup.style.display = 'block';
                        divReplyPopup.classList.add('test');

                    }, 100);
                },
                gotoMessage(mid){
                    var message = document.getElementsByClassName('timeline-message-body');
                    for(var i = 0;i<message.length;i++)
                        message[i].style.background = '#FFF';
                    document.getElementById('parent-mid-'+mid).style.background = '#dcf0fa';
                    var topPos = 'mid-'+mid;
                    document.getElementById(topPos).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        };
        return h(render);
    }
};
</script>

<style scoped>
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
.chatInfo {
    position: relative;
    background: #fff;
    border: 1px solid #b3b3b3;
    border-radius: 3px;
    margin-top: 5px;
    padding: 4px 8px;
}
.quoteText {
    border-left: 1px solid #666666;
    padding: 5px 0 5px 5px;
    margin-left: 20px;
    word-wrap: break-word;
}

</style>

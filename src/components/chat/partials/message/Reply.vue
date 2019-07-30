<template>
    <div class="messageBadge">
        <div class="reply-message">
            <span class="reply-message-icon">
                <svg
                    viewBox="0 0 10 10"
                    id="icon_chatTimeLineReplyBadge"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.67 3.336H3.192l1.818-1.819a.415.415 0 0 0 0-.589L4.42.34a.415.415 0 0 0-.589 0L.297 3.874a.416.416 0 0 0 0 .59L3.832 8a.415.415 0 0 0 .59 0l.589-.589a.415.415 0 0 0 0-.59L3.192 5.003H6.67c.92 0 1.667.746 1.667 1.667v2.083c0 .23.186.417.416.417h.834c.23 0 .416-.187.416-.417V6.67A3.333 3.333 0 0 0 6.67 3.336"
                    />
                </svg>
            </span>
            <span class="reply-message-txticon">RE</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Reply',
    props: ['msg'],
    created() {
        console.log(this.msg);
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
</style>

<template>
    <div class="message-badge">
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
        <img class="message-badge-avatar" data-aid="2647483" src="https://appdata.chatwork.com/icon/ico_group.png">
    </div>
</template>

<script>
export default {
    name: 'Reply',
    props: ['msg'],
    created() {
        // console.log(this.member_list);
    }
};
</script>

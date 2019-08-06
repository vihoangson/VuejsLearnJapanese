<template>
    <div class="message-badge">
        <div class="to-message">
            <span class="to-message-txticon">TO</span>
        </div>
        <img class="message-badge-avatar" src="https://appdata.chatwork.com/icon/ico_group.png" />
    </div>
</template>

<script>
export default {
    name: 'To',
    props: ['msg']
};
</script>

<template>
    <div v-bind:class="getClass()">
        <div v-if="this.type !== ''" class="message">
            <div class="message-badge">
                <component :is="this.type" :msg="this.content" :to="this.to"></component>
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
import {API} from '../../../common/ApiConst';
import {ApiConst} from '../../../common/ApiConst';
export default {
    name: 'ChatMessage',
    components: {
        Reply,
        To
    },
    props: ['messageObject'],
    data() {
        return {
            user: this.$store.getters.get_current_user,
            type: '',
            to_name: '',
            content: '',
            msg: '',
            to: ''
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
        if (messagePath.length > 1) {
            this.to_name = messagePath[0];
            this.getToId(this.to_name);
            this.to_name = this.to_name.replace(
                /(\[To:([0-9])+])|(\[Reply mid:([0-9]+) to:([0-9]+)\])/g,
                ''
            );

            this.content = messagePath[1];
        }
    },
    methods: {
        getClass(to) {
            if (to === this.user.id) return 'mention';
        },
        getToId(to) {
            let id = to.match(/(\d+)/g);
            API.POST(ApiConst.)
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
.mention {
    background-color: read;
}
</style>

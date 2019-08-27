<template>
    <div class="_cwABShowArea actionArea">
        <ul role="toolbar" class="_messageActionNav cwTextUnselectable actionNav">
            <li
                v-if="this.$store.getters.get_current_user.user_id === this.message.user_info.id"
                class="_cwABAction linkStatus actionNav__item"
                role="button"
                @click="this.onEdit"
            >
                <svg viewBox="0 0 10 10" id="icon_edit" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.33 7.432L2.566 5.661 7.322.917a.469.469 0 0 1 .663.001l1.103 1.107a.47.47 0 0 1-.001.663L4.331 7.432zM1.462 8.537l.554-2.097L3.56 7.989l-2.098.548z"
                    />
                </svg>
                <span class="_showAreaText showAreatext actionNav__itemLabel">Edit</span>
            </li>

            <li
                v-if="this.$store.getters.get_current_user.user_id !== this.message.user_info.id"
                class="_cwABAction linkStatus actionNav__item"
                role="button"
                @click="this.onReply"
            >
                <svg viewBox="0 0 10 10" id="icon_reply" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.406 4.375H2.225l3.087-3.087-.663-.663L.762 4.512a.469.469 0 0 0 0 .663l3.887 3.887.663-.662-3.087-3.088h4.181c1.12 0 2.031.911 2.031 2.031v2.031h.938V7.343a2.973 2.973 0 0 0-2.969-2.969"
                    />
                </svg>
                <span class="_showAreaText showAreatext actionNav__itemLabel">Reply</span>
            </li>

            <li class="_cwABAction linkStatus actionNav__item" role="button">
                <svg viewBox="0 0 10 10" id="icon_reaction" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" d="M0 0h10v10H0z" />
                    <path
                        d="M5 7.19a2.49 2.49 0 0 1-2.15-1.25h-.71a3.12 3.12 0 0 0 5.72 0h-.71A2.49 2.49 0 0 1 5 7.19zM6.41 5a.81.81 0 0 0 .78-.88c0-.51-.42-1.06-.91-1s-.66.49-.66 1a.82.82 0 0 0 .79.88zM3.59 5a.8.8 0 0 0 .78-.87c0-.52-.22-.95-.65-1s-.91.48-.91 1a.81.81 0 0 0 .78.87z"
                    />
                    <path
                        d="M9 4.37a4.46 4.46 0 0 1 .06.63A4.06 4.06 0 1 1 5 .94a4.21 4.21 0 0 1 .62.06V0H5a5 5 0 1 0 5 5v-.63z"
                    />
                    <path d="M10 1.11H8.89V0H7.78v1.11H6.67v1.11h1.11v1.11h1.11V2.22H10V1.11z" />
                </svg>
                <span class="_showAreaText showAreatext actionNav__itemLabel">Reaction</span>
            </li>

            <li class="_cwABAction linkStatus actionNav__item" role="button" @click="this.onQuote">
                <svg viewBox="0 0 10 10" id="icon_quote" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.863 2.5a2.388 2.388 0 0 0-2.388 2.387c0 .191.031.372.076.549a1.476 1.476 0 1 1 .837 2.69l-.297-.03a2.38 2.38 0 0 1-2.09-2.358 3.862 3.862 0 0 1 3.862-3.862.313.313 0 0 1 0 .626zm5.825 0a2.387 2.387 0 0 0-2.387 2.387c0 .191.031.372.075.549a1.476 1.476 0 1 1 .837 2.69l-.298-.03a2.38 2.38 0 0 1-2.09-2.358 3.862 3.862 0 0 1 3.862-3.862.313.313 0 0 1 0 .626z"
                    />
                </svg>
                <span class="_showAreaText showAreatext actionNav__itemLabel">Quote</span>
            </li>

            <li class="_cwABAction linkStatus actionNav__item" role="button">
                <svg viewBox="0 0 10 10" id="icon_task" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.031 1.563h5.938c.259 0 .469.21.469.469v4.844H6.875v1.563h-3.75V6.876H1.562V2.032c0-.259.21-.469.469-.469M8.125.625h-6.25c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h6.25c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25M4.41 6.878L2.169 4.637l.663-.662L4.41 5.553l2.759-2.759.663.663L4.41 6.879z"
                    />
                </svg>
                <span class="_showAreaText showAreatext actionNav__itemLabel">Task</span>
            </li>

            <li class="_cwABAction linkStatus actionNav__item" role="button">
                <svg viewBox="0 0 10 10" id="icon_link" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.537 1.466a2.188 2.188 0 0 1 0 3.094L6.769 6.328a2.188 2.188 0 0 1-3.094 0l-.199-.243.672-.672a1.2 1.2 0 0 0 .19.252 1.249 1.249 0 0 0 1.768 0l1.768-1.768a1.249 1.249 0 0 0-1.712-1.814 3.46 3.46 0 0 0-1.058-.279l.339-.339a2.188 2.188 0 0 1 3.094 0zM2.129 7.874a1.247 1.247 0 0 0 1.712.045 3.46 3.46 0 0 0 1.057.279l-.339.339a2.188 2.188 0 0 1-3.094-3.094l1.768-1.767a2.187 2.187 0 0 1 3.093 0l.199.243-.673.672a1.264 1.264 0 0 0-.189-.253 1.25 1.25 0 0 0-1.767 0L2.128 6.106a1.25 1.25 0 0 0 0 1.768z"
                    />
                </svg>
                <span class="_showAreaText showAreatext actionNav__itemLabel">Link</span>
            </li>
            <li
                v-if="this.$store.getters.get_current_user.user_id === this.message.user_info.id"
                role="button"
                class="_cwABAction linkStatus actionNav__item"
                @click="onDelete"
            >
                <svg viewBox="0 0 10 10" id="icon_delete" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.88 1.25V.63H3.13v.63H1.25V2.5h.63v6.88h6.25V2.5h.63V1.25zm.31 7.19H2.81V2.5h4.38zM3.75 3.12h.63V7.5h-.63zm1.88 0h.63V7.5h-.63z"
                    />
                </svg>
                <span class="_showAreaText showAreatext actionNav__itemLabel">Delete</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ChatAction',
    props: ['message'],
    data() {
        return {};
    },
    methods: {
        onReply() {
            console.log(this.message);
            this.$emit('reply', this.message);
        },
        onEdit() {
            this.$emit('edit', this.message);
        },
        onDelete() {
            this.$emit('delete', this.message);
        },
        onQuote(){
            this.$emit('quoute', this.message);
        }
    }
};
</script>
<style scoped>
.actionArea {
    display: none;
    position: absolute;
    right: 40px;
    bottom: -13px;
    text-align: right;
    z-index: 3;
}
.timelineMessage .actionNav {
    background-color: #ffffff;
}
.cwTextUnselectable {
    user-select: none;
}
.actionNav {
    height: 23px;
    padding: 0 4px;
    background: #ffffff;
    border-right: 1px solid #b1d6ed;
    border-bottom: 1px solid #b1d6ed;
    border-left: 1px solid #b1d6ed;
    border-radius: 0 0 3px 3px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    margin-top: 0px;
    margin-bottom: 0px;
}
.actionNav__item {
    display: inline-flex;
    align-items: center;
    height: 23px;
    margin: 0 4px;
    fill: #444444;
    cursor: pointer;
}
.actionNav__item:hover svg,
.actionNav__item:hover span {
    color: #b1d6ed;
}
.actionNav__itemLabel {
    margin-left: 3px;
    line-height: 2px;
}
.actionNav__item svg {
    width: 18px;
    height: 18px;
}
</style>

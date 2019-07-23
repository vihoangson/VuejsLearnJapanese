<template>
    <div id="_editInfo" class="chatInput__editContainer" style="display: block;">
        <p class="chatInput__editText">Editing</p>
        <div
            id="_editCancel"
            class="chatInput__editCancel"
            role="button"
            @click="this.onCancelEdit"
        >
            <svg viewBox="0 0 10 10" id="icon_cancel" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.831 2.5L4.997 4.335 3.163 2.5l-.663.663 1.834 1.834L2.5 6.831l.663.663L4.997 5.66l1.834 1.834.663-.663-1.835-1.834 1.835-1.834z"
                />
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        let owner = this;
        document.addEventListener('keyup', function(evt) {
            if (evt.keyCode === 27) owner.onCancelEdit();
        });
    },
    methods: {
        onCancelEdit() {
            this.$emit('cancelEdit');
        }
    }
};
</script>

<style>
.chatInput__editContainer {
    position: relative;
    z-index: 2;
    padding: 2px 10px;
    color: #fff;
    background: #0a8abd;
    font-size: 11px;
    text-align: left;
    height: 15px;
    line-height: 15px;
}
.chatInput__editContainer p {
    margin: 0px;
}
.chatInput__editCancel {
    position: absolute;
    top: 2px;
    right: 5px;
    width: 16px;
    height: 16px;
    cursor: pointer;
}
.chatInput__editCancel svg {
    color: #fff;
}
</style>

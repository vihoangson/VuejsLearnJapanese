<template>
    <div id="emojiList" class="list-emoji" v-show="isShow">
        <div class="list-item-emoji">
            <ul>
                <li
                    v-for="(item, index) in this.listEmoji"
                    :key="index"
                    @click="selectItemEmoji(item)"
                >
                    <img :src="item.src" :alt="item.code" :title="item.name" />
                </li>
            </ul>
            <div class="emoji-footer">"Shift" to multi-select, "Ctrl" to send</div>
            <div
                class="_cwTTTriangle tooltipTriangle tooltipTriangle--whiteBottom"
                style="left: 48px;"
            ></div>
        </div>
    </div>
</template>

<script>
import { AppConst } from '../../../common/AppConst';
export default {
    name: 'Emoji',
    data() {
        return {
            isShow: false,
            listEmoji: AppConst.EMOJI
        };
    },
    methods: {
        selectItemEmoji(item) {
            this.content = item.code;
            this.$root.$emit('set-content-message', this.content);
        }
    }
};
</script>

<style>
.list-emoji {
    display: none;
    position: absolute;
    width: 280px;
    height: 280px;
    background-color: #ffffff;
    z-index: 99;
    padding: 2px;
    border-radius: 5px;
    bottom: 20px;
    left: -50px;
    -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
}

.list-item-emoji ul {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    width: 270px;
}
.list-item-emoji ul li {
    border-radius: 3px;
    transition: border 0.2s linear 0s;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 37px;
    height: 33px;
    border: 1px solid transparent;
    cursor: pointer;
}
.list-item-emoji ul li:hover {
    background: #dcf0fa;
    border-color: #b1d6ed;
}
.list-item-emoji ul li img {
    width: 20px;
    height: 20px;
}
.emoji-footer {
    border-radius: 0 0 3px 3px;
    background: #e6e6e6;
    text-align: center;
    padding: 5px 0;
}
</style>
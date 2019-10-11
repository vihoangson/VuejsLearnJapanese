<template>
    <div id="toMemberList" class="list-to" v-show="isShow">
        <div class="list-user-to">
            <div class="list-user-to-header">
                <div class="search-to">
                    <span class="icSearch">
                        <svg viewBox="0 0 10 10" class="icSearch__icon" width="16" height="16">
                            <use fill-rule="evenodd" xlink:href="#icon_search" />
                        </svg>
                    </span>
                    <span class="_cwSBCancel icSearchCancel" style="display:none">
                        <svg
                            viewBox="0 0 10 10"
                            class="icSearchCancel__icon"
                            width="16"
                            height="16"
                        >
                            <use fill-rule="evenodd" xlink:href="#icon_cancel" />
                        </svg>
                    </span>
                    <input
                        id="searchListUser"
                        class="searchBox"
                        type="text"
                        role="search"
                        placeholder="Search by name"
                    />
                </div>
                <a class="select-all-text" @click="selectAll">Select All</a>
                <a class="select-all-text" @click="saveContact">Save contact</a>

            </div>

            <ul>
                <li @click="toAll">
                    <div class="message-badge">
                        <div class="reply-message">
                            <span class="reply-message-txticon">ALL</span>
                        </div>
                    </div>
                    <span>TO ALL</span>
                </li>
                <li
                    @click="selectItem(item)"
                    v-for="(item, index) in this.$store.getters.get_current_room.member_list"
                    :key="index"
                >
                    <img
                        class="_avatarHoverTip avatarSmall _avatar _avatarAid3054295"
                        data-aid="3054295"
                        :src="item.icon_img"
                    />
                    <span>{{item.name}}</span>
                </li>
            </ul>

            <div
                class="_cwTTTriangle tooltipTriangle tooltipTriangle--whiteBottom"
                style="left: 55px;"
            ></div>
        </div>
    </div>
</template>

<script>
import {API} from "../../../services/api";

export default {
    name: 'ListTo',
    data() {
        return {
            content: '',
            isShow: false
        };
    },
    created() {
        this.$root.$on('show', x => {
            this.isShow = x;
        });
    },
    methods: {
        onFocusListUserTo() {
            return this.isShow;
        },
        saveContact(){
            var listName = prompt("Please enter your name", "");
            if(listName === ""){
                alert('Please enter name !');
                return false;
            }
            if (listName != null) {

                let get_to_list_members = this.$store.getters.get_to_list_member;
                let room_id = this.$store.getters.get_current_room.room_id;

                API.POST('/api/v1/contact/save_list_to',{'room_id': room_id,'list_name':listName,'list_to':get_to_list_members},function(data){
                    if(data.error_code === 0){
                        console.log(data);
                    }
                })

            }
        },
        selectAll() {
            let memberList = this.$store.getters.get_current_room.member_list;
            this.content = '';
            memberList.forEach(x => {
                this.content += '[To:' + x.id + '] ' + x.name + '\n';
            });
            this.$root.$emit('set-content-message', this.content);
        },
        toAll() {
            this.content = '[TOALL]' + '\n';
            this.$root.$emit('set-content-message', this.content);
        },
        selectItem(item) {
            this.content = '[To:' + item.id + '] ' + item.name + '\n';
            this.$root.$emit('set-content-message', this.content);

            // Add to store content
            this.$store.dispatch('saveToListMember',this.content);

            console.log(this.$store.getters.get_to_list_member);
        }
    },
    watch: {
        isShow: function() {
            if (this.$store.getters.get_is_show_to_member_list) return 'popup';
            return '';
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
.reply-message-icon {
    width: 12px;
    height: 16px;
    fill: #ffffff;
    margin-right: 3px;
    position: relative;
}
.reply-message-txticon {
    color: #ffffff;
    font-weight: 750;
    font-size: 12px;
}
.reply-message-icon svg {
    position: absolute;
    left: 0px;
    top: 1px;
}
.list-to {
    display: none;
    position: absolute;
    width: 230px;
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
.list-to::after {
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    content: '';
    border-style: solid;
    border-color: transparent;
    pointer-events: none;
}
.search-to {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    height: 34px;
    padding: 6px 20px 8px 23px;
    border: 1px solid #cccccc;
    border-radius: 2px;
    background-color: #fff;
    width: 100%;
}
.icSearch {
    top: 5px;
    left: 5px;
    width: 16px;
    height: 16px;
    position: absolute;
    z-index: 9;
}
.searchBox {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
    border: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    padding: 7px 0px 7px 22px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
}
.list-user-to {
    text-align: left;
}
.select-all-text {
    font-size: 12px;
    color: black;
    cursor: pointer;
}
.list-user-to-header {
    padding: 5px;
    border-bottom: 1px solid #cccccc;
}
.list-user-to ul {
    overflow: hidden;
    overflow-y: scroll;
    height: 200px;
}
.list-user-to ul li {
    padding: 5px;
}
.list-user-to ul li:hover {
    background-color: #dcf0fa;
}
.avatarSmall {
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 5px;
}
.tooltipTriangle {
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    content: '';
    border-style: solid;
    border-color: transparent;
    pointer-events: none;
}
.tooltipTriangle--whiteBottom {
    bottom: -8px;
    border-top-color: #b3b3b3;
    border-width: 8px 8px 0;
}
.tooltipTriangle--whiteBottom:after {
    left: -7px;
    bottom: 1px;
    border-top-color: #fff;
    border-width: 7px 7px 0;
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
}
</style>

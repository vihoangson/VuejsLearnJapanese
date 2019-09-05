<template>
    <div class="_cwFWBase floatWindow" ref="floatWindow" @click.self="closeProfilePopup" style="z-index: 1002;"
         v-bind:style="{display: this.$store.state.openProfileDisplay, height: floatWindowHeight}">
        <div id="_contactWindow" class="contactWindow _cwFWInner" v-bind:style="{left: marginPopup, right: marginPopup}" role="dialog"
             aria-label="Contacts">



            <div class="dialogContainer__header">
                <h1 class="_floatWindowTitle floatWindow__title">
                    <!--<span class="autotrim">{{user_info.name}}</span>-->
                    <span class="autotrim">{{this.$store.getters.get_current_user_info.name}}</span>
                </h1>
                <div class="floatWindow__closeButtonContainer">
                  <span class="_cwFWButton floatWindow__closeButton" data-cwui-fw-idx="-1" @click="closeProfilePopup">
                    <svg viewBox="0 0 10 10" class="floatWindow__closeButtonIcon" width="16" height="16">
                      <use fill-rule="evenodd" xlink:href="#icon_cancel"></use>
                    </svg>
                  </span>
                    <span class="icoTextHide">Close</span>
                </div>
            </div>

            <div  class="profileShowDialog _cwDG">

                <div class="profileShowDialog__dialogHeader">

                    <div class="_profileCover profileShowDialog__coverContainer">
                        <img class=" _coverImage _coverAid2571977 coverImage" data-aid="2571977" :src="$store.getters.get_current_user_info.cover_img">
                    </div>
                    <div class="_profileAvatar profileShowDialog__avatarContainer">
                        <img class=" avatarHuge _avatar _avatarAid2571977" data-aid="2571977" :src="$store.getters.get_current_user_info.icon_img">
                    </div>

                </div>

                <div class="profileShowDialog__bodyContainer">

                    <div class="profileShowDialog__profileHeader">
                        <div class="profileShowDialog__titleContainer">

                            <div class="_profileName profileShowDialog__userName">
                                <span class="_nameAid2571977">{{this.$store.getters.get_current_user_info.name}}</span>
                            </div>

                            <div class="_profileButton profileShowDialog__buttonContainer">
                                <div class="_profileEdit profileShowDialog__editProfileButton" @click="openProfileEditDisplay" >Edit profiles</div>
                                <div class="_roomLink _moveButton profileShowDialog__directRoomButton" data-rid="80736120">My Chat</div>
                            </div>
                        </div>
                        <ul class="profileShowDialog__profileHeaderItemList">
                            <li class="_profileOrgName profileShowDialog__profileHeaderItem">
                                <span class="cw_onm2571977">{{this.$store.getters.get_current_user_info.company}}</span>
                            </li>

                        </ul>
                    </div>

                    <div class="profileShowDialog__profileBody">
                        <ul class="profileShowDialog__profileBodyItemList">

                            <!--<li class="profileShowDialog__profileBodyItem" v-for="item in itemProfile" :key="item">-->
                            <li class="profileShowDialog__profileBodyItem" >
                                <span class="profileShowDialog__profileBodyItemLabel" style="width: 200px">
                                    Organization name:
                                </span>
                                <span class="_profileDepartment profileShowDialog__profileBodyItemContent" style="width: 400px; overflow-wrap: break-word; ">
                                     {{this.$store.getters.get_current_user_info.company}}
                                </span>
                            </li>
                            <li class="profileShowDialog__profileBodyItem" >
                                <span class="profileShowDialog__profileBodyItemLabel" style="width: 200px">
                                    E-mail:
                                </span>
                                <span class="_profileDepartment profileShowDialog__profileBodyItemContent" style="width: 400px; overflow-wrap: break-word; ">
                                     {{this.$store.getters.get_current_user_info.email}}
                                </span>
                            </li>
                            <li class="profileShowDialog__profileBodyItem" >
                                <span class="profileShowDialog__profileBodyItemLabel" style="width: 200px">
                                    URL:
                                </span>
                                <span class="_profileDepartment profileShowDialog__profileBodyItemContent" style="width: 400px; overflow-wrap: break-word; ">
                                     {{this.$store.getters.get_current_user_info.icon_img}}

                                </span>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>


            <div style="display:none" class="_cwFWButtonFooter floatWindow__footer"></div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "PersonalInfo",
        waitForData: true,
        data() {
            return {
                isHidden: true,
                displayCloseIcon: 'none',
                individualAdd: 'block',
                floatWindowHeight: '0px',
                bulkAdd: 'none',
                marginPopup: '0px',

                user_info: this.$store.getters.get_current_user_info,

                // itemProfile: [
                //     { content: 'Organization name:' , key_value: "company" },
                //     { content: 'E-mail:' , key_value: "email" },
                //     { content: 'Department / Division:',key_value: "" },
                //     { content: 'Title:' , key_value: "" },
                //     { content: 'Address:', key_value: "" },
                //     { content: 'URL:' , key_value: "" },
                //     { content: 'Phone (work):' ,key_value: "" },
                //     { content: 'Ext. number:' ,key_value: "" },
                //     { content: 'Mobile:' ,key_value: "" }
                // ],

            }
        },
        created() {
            window.addEventListener('resize', this.handleResize)
            this.handleResizePopup();
        },
        methods: {
            handleResizePopup() {
                this.marginPopup = (window.innerWidth - 908)/2 + 'px';
                this.floatWindowHeight = window.innerHeight + 'px';
            },

            closeProfilePopup() {
                this.$store.dispatch('setProfileDisplay', 'none');
            },

            openProfileEditDisplay(){

                this.$store.dispatch('setProfileEdit', 'block');
            },

            floatWindowSetsize() {
                this.marginPopup = (this.$refs.floatWindow.clientWidth - 908) / 2 + 'px';
            }
        }
    };
</script>

<style>

    .profileShowDialog__profileBodyItemLabel {
        display: block;
        width: 160px;
    }
    .profileShowDialog__profileBodyItem {
        display: flex;
        align-items: flex-start;
        padding: 5px;
        margin: 0 10px 10px 0;
        border-bottom: 1px dotted #cccccc;
    }

    .profileShowDialog__profileBody {
        border-top: 1px solid #fff;
        border-bottom: 1px solid #cccccc;
        padding: 10px 20px 0;
    }

    .profileShowDialog__directRoomButton {
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

    .profileShowDialog__editProfileButton {
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
        margin-right: 4px;
    }

    .profileShowDialog__buttonContainer {
        display: flex;
        align-items: flex-start;
        flex-shrink: 0;
        margin-left: 8px;
    }

    .profileShowDialog__userName {
        font-size: 20px;
        font-weight: 700;
        margin-right: auto;
        word-wrap: break-word;
    }

    .profileShowDialog__titleContainer {
        display: flex;
    }

    .profileShowDialog__profileHeader {
        border-top: 1px solid #fff;
        border-bottom: 1px solid #cccccc;
        padding: 10px 20px;
    }

    .profileShowDialog__avatarContainer {
        border-radius: 50%;
        position: absolute;
        top: 20px;
        left: 20px;
        width: 130px;
        height: 130px;
        border: 5px solid #fff;
        overflow: hidden;
    }

    .profileShowDialog__coverContainer {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 800px;
        height: 250px;
        background: #f2f2f2 url(https://assets.chatwork.com/images/background/bg_wrapper.png);
        border-bottom: 1px solid #cccccc;
    }

    .profileShowDialog__bodyContainer{
        display: block;
        position: relative;
    }

    .profileShowDialog__dialogHeader{
        display: block;
        position: relative;
    }

    .profileShowDialog {
        display: block;
        height: 550px;
        overflow-x: hidden;
    }

    .dialogContainer__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        height: 40px;
        background-color: #f2f2f2;
        border-bottom: 1px solid #b3b3b3;
        border-radius: 4px 4px 0 0;
    }

/*==========*/

    .floatWindow {
        position: absolute;
        top: 0;
        height: 10000px;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid #999999;
        border-right: none;
        border-bottom: none;
        z-index: 3;
    }

    body, pre, input, select, textarea, button {
        font-family: -apple-system, BlinkMacSystemFont, ".SFNSDisplay-Regular", "Segoe UI", "Helvetica Neue", "Hiragino Sans", "\30D2\30E9\30AE\30CE\89D2\30B4\30B7\30C3\30AF", "Hiragino Kaku Gothic ProN", "\30D2\30E9\30AE\30CE\89D2\30B4 ProN W3", Meiryo, "\30E1\30A4\30EA\30AA", "MS PGothic", "\FF2D\FF33 \FF30\30B4\30B7\30C3\30AF", sans-serif;
        font-size: 13px;
        font-weight: 400;
        line-height: 1.5;
        color: #1a1a1a;
    }

    .floatWindow__closeButtonContainer {
        display: inline-flex;
        width: 16px;
        height: 16px;
    }

    ::-webkit-scrollbar {
        background: transparent;
        overflow: visible;
        width: 10px;
    }

    ::-webkit-scrollbar-corner {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.5);
    }

    html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, menu, nav, section, summary, time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        font-size: 100%;
        background: transparent;
    }

    .contactWindow {
        position: absolute;
        top: 0;
        background-color: #f2f2f2;
        border-right: 1px solid #b3b3b3;
        border-left: 1px solid #b3b3b3;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.6);
        z-index: -1;
    }

    .floatWindow__title {
        margin-right: auto;
    }

    h1 {
        font-size: 16px;
        font-weight: 700;
    }

    h1 {
        font-weight: normal;
    }

    .autotrim {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .floatWindow__closeButtonContainer {
        display: inline-flex;
        width: 16px;
        height: 16px;
    }

    .floatWindow__closeButtonIcon {
        fill: #525354;
    }

    .floatWindow__closeButton {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }

    svg, use {
        pointer-events: none;
    }

    .icoTextHide {
        height: 1px;
        width: 1px;
        position: absolute;
        overflow: hidden;
        top: -10px;
    }

    .floatHeaderTab > ul {
        display: inline-block;
        border-right: 1px solid #f2f2f2;
        border-left: 1px solid #b3b3b3;
    }

    .floatHeaderTab > ul .floatTabSelect {
        position: relative;
        background: #f2f2f2;
        height: 31px;
        z-index: 3;
    }

    .floatHeaderTab > ul > li {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        float: left;
        padding: 0 15px;
        border-right: 1px solid #b3b3b3;
        border-left: 1px solid #f2f2f2;
        cursor: pointer;
        min-width: 5em;
        text-align: center;
    }

    ul, ol {
        list-style: none;
    }

    label, input, button, select, textarea {
        font-size: 13px;
        font-weight: normal;
        line-height: 18px;
    }

    .contactInviteMailSection input {
        height: 34px;
        line-height: 1em;
        padding: 0 10px;
    }

    .contactInviteMailSection input, .contactInviteMailSection textarea {
        box-sizing: border-box;
        width: 100%;
        border: 1px solid #cccccc;
    }

    li {
        text-align: -webkit-match-parent;
    }

    .formControlArea a:first-child {
        float: left;
    }

    a {
        color: #0084b2;
    }

    a {
        margin: 0;
        padding: 0;
        font-size: 100%;
        vertical-align: baseline;
        background: transparent;
        text-decoration: none;
        color: #0084b2;
        fill: #0084b2;
        cursor: pointer;
    }

    .formControlArea a:last-child {
        float: right;
    }

    .contactInviteMailSection input, .contactInviteMailSection textarea {
        box-sizing: border-box;
        width: 100%;
        border: 1px solid #cccccc;
    }

    .contactInviteMailSection textarea {
        height: 150px;
        padding: 10px;
    }

    .contactInviteMailResult + .contactInviteMailResult {
        margin-top: 30px;
    }

    svg, use {
        pointer-events: none;
    }
</style>

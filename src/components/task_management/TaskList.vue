<template>
    <div class="_cwFWBase floatWindow" ref="floatWindow" @click.self="closeTaskListPopup" style="z-index: 1002;"
         v-bind:style="{display: this.$store.state.openTaskDisplay, height: floatWindowHeight}">

        <div id="_contactWindow" class="contactWindow _cwFWInner" v-bind:style="{left: marginPopup, right: marginPopup}"
             role="dialog"
             aria-label="Tasks">

            <div class="_floatWindowHeader floatWindow__header">
                <h1 class="_floatWindowTitle floatWindow__title">
                    <span class="autotrim" style="font-weight: 700;">Tasks</span>
                </h1>
                <div class="floatWindow__closeButtonContainer">
                  <span class="_cwFWButton floatWindow__closeButton" data-cwui-fw-idx="-1" @click="closeTaskListPopup">
                    <svg class="floatWindow__closeButtonIcon" width="16" height="16">
                      <use fill-rule="evenodd" xlink:href="#icon_cancel"></use>
                    </svg>
                  </span>
                    <span class="icoTextHide">Close</span>
                </div>
            </div>

            <div class="_cwFWHeader taskWindowContainer__headerContainer">
                <div class="taskWindowContainer__headerTabContainer">
                    <ul class="taskWindowContainer__headerTab">
                        <li id="_taskWindowTabOpen" class="taskWindowContainer__headerTabItem floatTabSelect">
                            Open Tasks
                        </li>
                        <li id="_taskWindowTabDone" class="taskWindowContainer__headerTabItem">
                            Completed Tasks
                        </li>
                    </ul>
                </div>

                <div class="taskWindowHeaderNavigationContainer">
                    <ul id="_taskWindowFilter" class="cwTextUnselectable btnNavList taskWindowFilterTypeLimit _cwBB" style="display: inline-block;"
                        role="menu">
                        <li role="menuitemradio" class="_cwBBButton button _cwBBSelected selected" data-cwui-bb-idx="0" aria-checked="true">
                            All
                            <span id="_taskWindowNumAll" class="taskWindowFilterTypeLimit__badge" style="display: inline-block;">

                            </span>
                        </li>
                        <li role="menuitemradio" class="_cwBBButton button" data-cwui-bb-idx="1">
                            Past
                            <span id="_taskWindowNumLimitOver" class="taskWindowFilterTypeLimit__badge" style="display: inline-block;">

                            </span>
                        </li>
                        <li role="menuitemradio" class="_cwBBButton button" data-cwui-bb-idx="2">
                            Today
                            <span id="_taskWindowNumLimitToday" class="taskWindowFilterTypeLimit__badge" style="display: none;">

                            </span>
                        </li>
                        <li role="menuitemradio" class="_cwBBButton button" data-cwui-bb-idx="3">
                            This week
                            <span id="_taskWindowNumLimitWeek" class="taskWindowFilterTypeLimit__badge" style="display: none;">

                            </span>
                        </li>
                        <li role="menuitemradio" class="_cwBBButton button" data-cwui-bb-idx="4">
                            No dates
                            <span id="_taskWindowNumLimitNone" class="taskWindowFilterTypeLimit__badge" style="display: none;">

                            </span>
                        </li>
                    </ul>
                    <ul id="_taskWindowViewType"
                        class="cwTextUnselectable btnNavList taskWindowFilterTypeAssignee _cwBB" role="menu">
                        <li role="menuitemradio" class="_cwBBButton button _cwBBSelected selected" data-cwui-bb-idx="0" aria-label="自分のタスク" aria-checked="true">
                          <span class="taskWindowFilterTypeAssignee__iconContainer">
                            <svg viewBox="0 0 10 10" class="taskWindowFilterTypeAssignee__icon" width="16" height="16">
                              <use fill-rule="evenodd" xlink:href="#icon_taskMine">
                            </use></svg>
                          </span>
                        </li>
                        <li role="menuitemradio" class="_cwBBButton button" data-cwui-bb-idx="1" aria-label="Tasks I've assigned">
                          <span class="taskWindowFilterTypeAssignee__iconContainer">
                            <svg viewBox="0 0 10 10" class="taskWindowFilterTypeAssignee__icon" width="16" height="16">
                              <use fill-rule="evenodd" xlink:href="#icon_taskAssign">
                            </use></svg>
                          </span>
                        </li>
                    </ul>
                </div>
            </div>


            <div class="_cwFWContent" style="height: 527px;">

                <div class="adminWindowAllList">

                    <div id="_taskWindowBox" class="adminAllListArea">


                        <ul id="_taskWindowList" class="subContentTask">
                            <ListAllTask></ListAllTask>
                        </ul>

                        <div id="_emptyTaskContent" class="adminAllListArea__emptyContainer" style="display: none;">
                            <img src="https://assets.chatwork.com/images/empty/img_task_empty.png"
                                 class="adminAllListArea__emptyImage" alt="">
                            <p class="adminAllListArea__emptyDescription">No Tasks</p>
                        </div>
                    </div>

                    <div class="adminDetailArea">
                        <!--
                          <div id="_taskDetailArea" class="adminDetailContentArea" style="" data-task-id="97080880">
                              <div class="taskDetailHeader">

                                  <div id="_taskDetailTitle" class="taskDetailHeader__title autotrim">

                                  </div>

                                  <div class="adminDetailContent taskDetailContent">
                                      <table id="_taskDetailContentTable" class="taskDetailContent__table">
                                          <tbody>
                                              <tr class="taskDetailContent__tableRow">
                                                  <td class="taskDetailContent__labelColumn">
                                                        <span role="icon" class="taskDetailContent__rowLabelIcon">
                                                          <svg viewBox="0 0 10 10" width="16" height="16">
                                                            <use fill-rule="evenodd" xlink:href="#icon_taskMine"></use>
                                                          </svg>
                                                        </span>
                                                      <p class="taskDetailContent__rowLabel">
                                                          To
                                                      </p>
                                                  </td>
                                                  <td class="taskDetailContent__bodyColumn">
                                                      <div>
                                                          <p id="_taskDetailAssign">
                                                              <img class=" _avatarHoverTip _avatarClickTip avatarClickTip avatarTiny _avatar _avatarAid2571977"
                                                              data-aid="2571977"
                                                              src="https://appdata.chatwork.com/avatar/3431/3431235.gif">
                                                              <span class="_nameAid2571977">Le Gia Le [PG]</span>
                                                          </p>
                                                      </div>
                                                  </td>
                                              </tr>
                                              <tr class="taskDetailContent__tableRow">
                                                  <td class="taskDetailContent__labelColumn">
                                                        <span role="icon" class="taskDetailContent__rowLabelIcon">
                                                          <svg viewBox="0 0 10 10" width="16" height="16">
                                                            <use fill-rule="evenodd" xlink:href="#icon_calendar"></use>
                                                          </svg>
                                                        </span>
                                                      <p class="taskDetailContent__rowLabel">
                                                          Due
                                                      </p>
                                                  </td>
                                                  <td class="taskDetailContent__bodyColumn">

                                                  </td>
                                              </tr>
                                              <tr class="taskDetailContent__tableRow">
                                                  <td class="taskDetailContent__labelColumn">
                                                    <span role="icon" class="taskDetailContent__rowLabelIcon">
                                                      <svg viewBox="0 0 10 10" width="16" height="16">
                                                        <use fill-rule="evenodd" xlink:href="#icon_taskAssign"></use>
                                                      </svg>
                                                    </span>
                                                      <p class="taskDetailContent__rowLabel">
                                                          From
                                                      </p>
                                                  </td>
                                                  <td class="taskDetailContent__bodyColumn">

                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </div>
                          </div>
  -->

                        <div id="_taskDetailBlankArea" class="adminDetailContentArea" >
                            <div class="adminDetailNoneContenText">
                                Select task for details
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div style="display:none" class="_cwFWButtonFooter floatWindow__footer"></div>

        </div>
    </div>
</template>


<script>
    import ListAllTask from '../task_management/ListAllTask';
    export default {
        name: "TaskList",
        waitForData: true,
        data() {
            return {
                isHidden: true,
                displayCloseIcon: 'none',
                individualAdd: 'block',
                floatWindowHeight: '0px',
                bulkAdd: 'none',
                marginPopup: '0px',


            }
        },
        components: {
            ListAllTask,

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

            closeTaskListPopup() {
                this.$store.dispatch('setTaskDisplay', 'none');
            },


            // openProfileEditDisplay(){
            //     this.$store.dispatch('setProfileEdit', 'block');
            // },
            floatWindowSetsize() {
                this.marginPopup = (this.$refs.floatWindow.clientWidth - 908) / 2 + 'px';
            },





        }
    };
</script>

<style>
    svg, use {
        pointer-events: none;
    }
    .taskActions__icon {
        width: 16px;
        height: 16px;

    }
    .icoTextHide {
        height: 1px;
        width: 1px;
        position: absolute;
        overflow: hidden;
        top: -10px;
    }
    .taskActions__iconContainer {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .taskActions__button {
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
        width: 24px;
        height: 24px;
        padding: 0;
        border-color: transparent;
        background-color: transparent;
        color: #1a1a1a;
        fill: #1a1a1a;
        margin-left: 5px;
    }
    .subContentTask > li .taskActions {
        position: absolute;
        right: 10px;
        bottom: 3px;

    }
    .button:hover {
        border-color: #cccccc;
        color: #676863;
        fill: #676863;
        background-color: #fff;
        text-decoration: none;
    }
    .button {
        border-radius: 2px;
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        padding: 0 12px;
        min-width: 26px;
        min-height: 26px;
        border: 1px solid #b3b3b3;
        color: #34362f;
        fill: #34362f;
        background-color: #f5f5f4;
        vertical-align: middle;
        text-align: center;
        text-decoration: none;
        line-height: 26px;
        cursor: pointer;
        user-select: none;
    }
    .completeCheckboxArea .button {
        height: 24px;
        line-height: 24px;
        z-index: 1;
    }
    .btnPrimary:hover {
        border-color: #0074b7;
        color: #fff;
        background-color: #0074b7;
    }
    .btnPrimary {
        border-color: #006a9c;
        color: #fff;
        background-color: #006a9c;
    }
    .completeCheckboxArea {
        display: inline-block;
        float: right;
        margin: 0 0 5px 5px;
    }
    .taskDateLimit__dueDate--limitOver {
        color: #a32c1f;
        font-weight: 700;
    }
    .taskDateLimit {
        margin-left: 8px;
        display: inline-block;
    }
    .subContentSection .taskMetaArea .taskDateLimit {
        vertical-align: middle;
        margin-top: 2px;
    }
    img, a img {
        border: 0;
        vertical-align: middle;
    }
    .avatarTiny {
        box-sizing: border-box;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        flex-shrink: 0;
    }
    .avatarClickTip {
        border: 1px solid transparent;
        cursor: pointer;
    }
    .taskMetaArea img {
        box-sizing: border-box;
        width: 20px;
        height: 20px;
        border-radius: 12px;
    }
    .taskMetaArea {
        border-top: 1px dotted #cccccc;
        margin-top: 5px;
        padding-top: 5px;
    }
    .clearfix {
        zoom: 1;
    }
    .subContentTask > li .taskActions {
        position: absolute;
        right: 10px;
        bottom: 3px;

    }
    .subContentAreaInner {
        position: relative;
        padding: 10px;
    }
    .subContentTask > li .subContentAreaInner {
        padding: 0;
    }

    .subContentSection {
        position: relative;
        margin: 10px;
    }
    .subContentTask > li {
        box-sizing: border-box;
        position: relative;
        margin-bottom: 10px;
        padding: 8px;
        border: 1px solid #a9aaa6;
        border-radius: 3px;
        background-color: #fff;
    }
    .adminAllListArea ul li {
        cursor: pointer;
    }
    .subContentTask > li.taskPanel {
        border-width: 1px;
        border-style: solid;
        border-color: #fff;
    }

    .adminAllListArea {
        position: absolute;
        top: 0;
        left: 0;
        right: 420px;
        height: 100%;
        overflow: auto;
        box-shadow: 1px 0 3px rgba(0, 0, 0, 0.25);
        z-index: 1;
    }

    .subContentTask > li.taskPanel:hover {
        background-color: #fff;
        border-color: #0a8abd;
        box-shadow: -1px -1px 0 1px #dcf0fa inset, 1px 1px 0 1px #dcf0fa inset;
    }
    .btnNavList li {
        display: block;
        float: left;
        border-radius: 0;
        min-width: 42px;
    }
    .btnNavList li:first-child {
        border-radius: 2px 0 0 2px;
    }
    .btnNavList li + li {
        border-left: 0;
    }
    .btnNavList .selected, .btnNavList .buttonFilterActive {
        border-color: #999999;
        color: #1c6989;
        fill: #1c6989;
        background-color: #eaeae8;
        filter: none;
    }

    .adminDetailNoneContenText {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        color: #b3b3b3;
        text-shadow: 0 1px 0 #fff;
    }

    .adminDetailContentArea .taskDetailContent .taskDetailContent__tableRow {
        height: 40px;
        border-bottom: 1px dotted #cccccc;
    }

    .adminDetailContentArea .adminDetailContent {
        position: absolute;
        top: 41px;
        right: 0;
        bottom: 0;
        left: 0;
        border-top: 1px solid #fff;
        padding-top: 10px;
        overflow: auto;
    }

    .taskDetailHeader {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 10px;
        border-bottom: 1px solid #cccccc;
        background-color: #f2f2f2;
        font-weight: 700;
    }

    .adminDetailContentArea {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .adminDetailArea {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 420px;
    }

    .adminAllListArea {
        position: absolute;
        top: 0;
        left: 0;
        right: 420px;
        height: 100%;
        overflow: auto;
        box-shadow: 1px 0 3px rgba(0, 0, 0, 0.25);
        z-index: 1;
    }

    .adminWindowAllList {
        position: relative;
        height: 100%;
    }

    .taskWindowFilterTypeAssignee {
        display: inline-block;
    }
    .taskWindowFilterTypeLimit {
        display: inline-block;
        margin-right: 10px;
    }

    .taskWindowHeaderNavigationContainer {
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
        position: relative;
        padding: 10px;
        border-bottom: 1px solid #b3b3b3;
        z-index: 2;
    }

    .taskWindowContainer .floatTabSelect {
        position: relative;
        background: #f2f2f2;
        height: 31px;
        z-index: 3;
    }
    .taskWindowContainer__headerTabItem {
        border-right: 1px solid #b3b3b3;
        border-left: 1px solid #f2f2f2;
        box-sizing: border-box;
        float: left;
        padding: 0 15px;
        cursor: pointer;
        min-width: 5em;
        text-align: center;
    }
    .taskWindowContainer__headerTab {
        border-right: 1px solid #f2f2f2;
        border-left: 1px solid #b3b3b3;
        zoom: 1;
        display: inline-block;
    }

    .taskWindowContainer__headerTabContainer {
        position: relative;
        height: 30px;
        line-height: 30px;
        background: rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid #b3b3b3;
        padding: 0 10px;
    }
    .floatWindow__closeButtonContainer {
        display: inline-flex;
        width: 16px;
        height: 16px;
    }
    .floatWindow__title {
        margin-right: auto;
    }
    .floatWindow__header {
        display: flex;
        align-items: center;
        position: relative;
        padding: 0 10px;
        height: 40px;
        background-color: #f2f2f2;
        border-bottom: 1px solid #b3b3b3;
    }

    /*=======================*/
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

    svg, use {
        pointer-events: none;
    }
</style>

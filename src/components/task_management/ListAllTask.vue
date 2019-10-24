<template>
    <div>
        <ul id="_taskWindowList" class="subContentTask">
            <li v-for=" (item,index) in this.$store.getters.get_current_task_list" :key=index class="_taskList subContentSection taskPanel">

                <div class="subContentAreaInner">
                    <div class="clearfix">
                        <div class="completeCheckboxArea">
                            <div class="_taskCheck button btnPrimary" @click="actionCompleteTask(item)">
                                <span class="_checkTaskLabel completeText">Done</span>
                            </div>
                        </div>
                        <div class="_taskName taskName">
                            <div class="_taskNameContent">
                                <div class="dev_quote chatQuote">
                                    <div class="chatQuote__title">
                                        <span  class="piconname"><span >{{ item['owner_id'] }}</span></span>
                                        <time class="quoteTimeStamp chatQuote__timeStamp"><span>{{item['create_date']}}</span></time>
                                    </div>
                                    <div class="quoteText">{{item['content']}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="taskMetaArea">
        <!--                <img-->
        <!--                    class=" _avatarHoverTip _avatarClickTip avatarClickTip avatarTiny _avatar _avatarAid2571977"-->
        <!--                    data-aid="2571977"-->
        <!--                    src="https://appdata.chatwork.com/avatar/3431/3431235.gif">-->
                        <div class="taskDateLimit">Due:
                            <time class="taskDateLimit__dueDate taskDateLimit__dueDate--limitOver"
                                  datetime="2018-9-1">{{item['due_date']}}
                            </time>
                        </div>
                    </div>
                </div>
                <div class="taskActions">
                    <div class="_moveTask taskActions__button">

                        <span class="taskActions__iconContainer" @click="actionJumpToAssignment">
                           <i class="fa fa-glass" aria-hidden="true"></i>
                        </span>

                        <span class="icoTextHide">Jump to assignment</span>
                    </div>
                    <div class="_editTask taskActions__button">

                        <span class="taskActions__iconContainer" @click="actionEditTaskContent(item['id'])">
                            <i class="taskActions__iconContainer fa fa-pencil-square-o" aria-hidden="true"></i>
                        </span>

                        <span class="icoTextHide">Edit</span>
                    </div>
                    <div class="_deleteTask taskActions__button">

                        <span class="taskActions__iconContainer" @click="actionDeleteTask(item)">
                            <i class="taskActions__icon fa fa-trash-o" aria-hidden="true"></i>
                        </span>

                        <span class="icoTextHide">Delete</span>
                    </div>
                </div>

            </li>
        </ul>
    </div>

</template>

<script>
    import {API} from "../../services/api";
    import {ApiConst} from "../../common/ApiConst";
    import {AppConst} from "../../common/AppConst";

    export default {
        name: "ListAllTask",
        props: ["reload"],
        data() {
            return {
                componentKey: 0,
                task_list: this.$store.getters.get_current_task_list,
                edit_task_detail:{}
            }
        },

        methods: {
            actionJumpToAssignment(){
                // alert("Go to message");
            },
            actionEditTaskContent(taskId){
                // alert(taskId);

                this.edit_task_detail = this.$store.getters.get_task_detail(taskId);
console.log(this.edit_task_detail);
                this.$store.dispatch('setEditTaskDetail', this.edit_task_detail);

                this.$store.dispatch('setTaskEditDisplay', 'block');

            },
            actionDeleteTask(task){

                let data = {
                    task_id : task.id
                };
                API.POST(ApiConst.DELETE_USER_TASK,data).then(res => {
                    if (res.error_code === 0) {
                        task.status = 3;
                        localStorage.setItem(
                            AppConst.LOCAL_USER_TASK_LIST,
                            JSON.stringify(res.data)
                        );
                    }
                });
            },
            actionCompleteTask(task){
                let data = {
                    task_id : task.id
                };

                API.POST(ApiConst.COMPLETE_USER_TASK, data).then(res => {
                    if (res.error_code === 0) {
                        task.status = 1;
                        localStorage.setItem(
                            AppConst.LOCAL_USER_TASK_LIST,
                            JSON.stringify(res.data)
                        );
                    }
                });
            },
        }
    }
</script>

<style scoped>

    .chatQuote__timeStamp {
        display: inline-flex;
        flex-shrink: 0;
    }
    .chatQuote__title > .piconname {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        padding-right: 10px;
    }
    .chatQuote__quoteIcon {
        width: 16px;
        height: 16px;
        fill: #4d4d4d;
        margin: 4px;
    }
    .quoteText {
        border-left: 1px solid #666666;
        padding: 5px 0 5px 5px;
        margin-left: 20px;
        word-wrap: break-word;
    }
    .chatQuote__title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        max-width: calc(100% - 24px);
        height: 24px;
        color: #999999;
        font-size: 11px;
    }
    .subContentTask .chatQuote__title {
        max-width: 70%;
    }
    .chatQuote__quoteLeftArea {
        width: 24px;
        height: 24px;
        display: inline-flex;
        align-items: center;
        vertical-align: top;
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
    .btnPrimary {
        border-color: #006a9c;
        color: #fff;
        background-color: #006a9c;
    }
    .completeCheckboxArea .button {
        height: 24px;
        line-height: 24px;
        z-index: 1;
    }
    pre {
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    .taskName {
        transition: height 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    .subContentSection pre {
        word-break: break-all;
    }
    .completeCheckboxArea {
        display: inline-block;
        float: right;
        margin: 0 0 5px 5px;
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
    .subContentTask > li.taskPanel {
        border-width: 1px;
        border-style: solid;
        border-color: #fff;
    }

    ul, ol {
        list-style: none;
    }

</style>

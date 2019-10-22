<template>
    <div>
        <ul id="_taskWindowList" class="subContentTask">
            <li v-for="item in this.$store.getters.get_current_task_list" class="_taskList subContentSection taskPanel" data-task-id="97080880">

                <div class="subContentAreaInner">
                    <div class="clearfix">
                        <div class="completeCheckboxArea">
                            <div class="_taskCheck button btnPrimary" @click="actionCompleteTask(item['id'])">
                                <span class="_checkTaskLabel completeText">Done</span>
                            </div>
                        </div>
                        <pre class="_taskName taskName">
                            <div class="_taskNameContent">
                                <div class="chatQuote__title">
                                    <span class="piconname">
                                        <span >{{item['owner_id']}}</span>
                                    </span>
                                </div>
                                <div class="quoteText"> {{item['content']}} </div>
                            </div>
                        </pre>
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

                        <span class="taskActions__iconContainer" @click="actionDeleteTask(item['id'])">
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
        data() {
            return {
                componentKey: 0,
                task_list: this.$store.getters.get_current_task_list,
            }
        },
        methods: {
            actionJumpToAssignment(){
                // alert("Go to message");
            },
            actionEditTaskContent(taskId){
                alert(taskId);
                this.$store.dispatch('setTaskEditDisplay', 'block');
            },
            actionDeleteTask(taskId){

                let data = {
                    task_id : taskId
                };
                API.POST(ApiConst.DELETE_USER_TASK,data).then(res => {
                    if (res.error_code === 0) {
                        localStorage.setItem(
                            AppConst.LOCAL_USER_TASK_LIST,
                            JSON.stringify(res.data)
                        );
                        let userTaskListJson = JSON.parse(res);
                        this.$store.dispatch('setUserTaskList', userTaskListJson);
                    }
                });

            },
            actionCompleteTask(taskId){
                let data = {
                    task_id : taskId
                };
                API.POST(ApiConst.COMPLETE_USER_TASK, data).then(res => {
                    if (res.error_code === 0) {
                        if (res.error_code === 0) {
                            localStorage.setItem(
                                AppConst.LOCAL_USER_TASK_LIST,
                                JSON.stringify(res.data)
                            );
                            let userTaskListJson = JSON.parse(res);
                            this.$store.dispatch('setUserTaskList', userTaskListJson);
                        }
                    }
                });

            },
        }
    }
</script>

<style scoped>
    /*.taskName {*/
    /*    transition: height 300ms cubic-bezier(0.215, 0.61, 0.355, 1);*/
    /*}*/
    .subContentSection pre {
        word-break: break-all;
    }
    .chatQuote__quoteLeftArea {
        width: 24px;
        height: 24px;
        display: inline-flex;
        align-items: center;
        vertical-align: top;
    }
    .subContentTask .chatQuote__title {
        max-width: 70%;
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
    .quoteText {
        border-left: 1px solid #666666;
        padding: 5px 0 5px 5px;
        margin-left: 20px;
        word-wrap: break-word;
    }
    .chatQuote__title > .piconname {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        padding-right: 10px;
    }
    .chatQuote__timeStamp {
        display: inline-flex;
        flex-shrink: 0;
    }

</style>

<template>
    <li class="_taskList subContentSection taskPanel" data-task-id="97080880">
        <div class="subContentAreaInner">
            <div class="clearfix">
                <div class="completeCheckboxArea">
                    <div class="_taskCheck button btnPrimary" data-task-id="97080880"
                         data-task-status="done">
                        <span class="_checkTaskLabel completeText">Done</span>
                    </div>
                </div>
                <pre class="_taskName taskName">
                                            <div class="_taskNameContent">

                                            </div>
                                        </pre>
            </div>
            <div class="taskMetaArea">
                <img
                    class=" _avatarHoverTip _avatarClickTip avatarClickTip avatarTiny _avatar _avatarAid2571977"
                    data-aid="2571977"
                    src="https://appdata.chatwork.com/avatar/3431/3431235.gif">
                <div class="taskDateLimit">Due:
                    <time class="taskDateLimit__dueDate taskDateLimit__dueDate--limitOver"
                          datetime="2018-9-1">9/1/2018
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

                                        <span class="taskActions__iconContainer" @click="actionEditTaskContent">
                                            <i class="taskActions__iconContainer fa fa-pencil-square-o" aria-hidden="true"></i>
                                        </span>

                <span class="icoTextHide">Edit</span>
            </div>
            <div class="_deleteTask taskActions__button">

                                        <span class="taskActions__iconContainer" @click="actionDeleteTask">
                                            <i class="taskActions__icon fa fa-trash-o" aria-hidden="true"></i>
                                        </span>

                <span class="icoTextHide">Delete</span>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "ListAllTask",
        methods: {
            actionJumpToAssignment(){
                alert("Go to message");
            },
            actionEditTaskContent(){
                // alert("edit Task");
                this.$store.dispatch('setTaskEditDisplay', 'block');
            },
            actionDeleteTask(){
                alert("Delete Task");
            },
        }
    }
</script>

<style scoped>

</style>

<template>
    <div>

        <div class="sc-eLdqWK sc-iiUIRa cycoxf"  v-bind:style="{ display: active_add_task === true ? 'block' : 'none' }" >
            <div id="_taskAddArea" class="sc-jKmXuR idcKHi"  @click="activate(2)">
                <div class="sc-elNKlv jDJym">
                    <span class="sc-ifAKCX gYKOAy">
                         <i class="fa fa-calendar-check-o sc-EHOje bfZdDt" aria-hidden="true"></i>
                    </span>
                </div>
                <p class="sc-bYwvMP bzpghZ">Add Task</p>
                <div class="sc-hUMlYv ejiprD">
                    <span class="sc-ifAKCX gYKOAy">
                        <svg viewBox="0 0 10 10" width="16" height="16" class="sc-EHOje bfZdDt" aria-hidden="true"><use fill-rule="evenodd" xlink:href="#icon_plus"></use></svg>
                    </span>
                </div>
            </div>
        </div>

        <div class="sc-eLdqWK sc-hgRTRy jQeWrM"   v-bind:style="{ display: active_add_task === true ? 'none' : 'block' }">

            <div class="sc-iIHSe fSyBul">

                <textarea v-model="add_task_content" tabindex="1" placeholder="Enter task here" class="sc-ejGVNB iOAdgD" style="height: 120px; overflow-y: hidden;">

                </textarea>

                <div class="sc-gldTML jEhYoQ">
                    <div class="sc-feryYK dvoAkO">
                        <div class="sc-iQtOjA flbLZm">
                            <div class="sc-fHxwqH dfpiMV">
                                <span class="sc-ifAKCX gYKOAy">
                                   <i class="fa fa-users" aria-hidden="true"></i>
                                </span>
                            </div>
                            <p class="sc-cEvuZC igrlhn">To</p>
                            <div>
                                <div class="sc-drMfKT gMRuqb">
                                    <div class="sc-fgfRvd kKSTuw">
                                        <span class="sc-ifAKCX gYKOAy">
                                            <svg viewBox="0 0 10 10" width="16" height="16" class="sc-EHOje bfZdDt" aria-hidden="true">
                                                <use fill-rule="evenodd" xlink:href="#icon_plus"></use>
                                            </svg>
                                        </span>
                                    </div>
                                    <p class="sc-hIVACf emdPBZ">Assign to</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sc-feryYK dvoAkO">
                        <div class="sc-dREXXX ixEFLz">
                            <div class="sc-kcbnda gKbKBx">
                                    <span class="sc-ifAKCX gYKOAy">
                                        <i class="fa fa-calendar-minus-o" aria-hidden="true"></i>
                                    </span>
                            </div>
                            <p class="sc-hcmgZB lcVdXa">Due</p>
                            <div class="sc-dHmInP PGisl">
                                <div class="sc-cjHlYL kAWJRM">
                                    <div class="sc-dRaagA gMLyAE">
                                        <div class="sc-iYUSvU jeZRmO">
                                            <div class="sc-cHSUfg iBDtxa">
                                                <p class="sc-cTjmhe eDLUww">10/25</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sc-dRaagA gMLyAE">
                                        <div class="sc-gkFcWv EYtoc">
                                            <p class="sc-hUfwpO hlNHtf">No time selected</p>
                                            <div class="sc-imABML bsonrL">
                                                    <span class="sc-ifAKCX gYKOAy">
                                                        <svg viewBox="0 0 10 10" width="16" height="16" class="sc-EHOje bfZdDt" aria-hidden="true">
                                                            <use fill-rule="evenodd" xlink:href="#icon_triangleDown"></use>
                                                        </svg>
                                                    </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sc-fEUNkw gGZZtc">
                                            <span class="sc-ifAKCX gYKOAy">
                                                <svg viewBox="0 0 10 10" width="16" height="16" class="sc-EHOje bfZdDt" aria-hidden="true">
                                                    <use fill-rule="evenodd" xlink:href="#icon_cancel">
                                                    </use>
                                                </svg>
                                            </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="sc-cJOK bvAzmx">
                    <div class="sc-ccSCjj jIrEMD">
                        <div class="sc-hqyNC iYuHoU">
                            <div role="button" tabindex="-1" class="sc-jbKcbu sc-dNLxif kOkaj" @click="activate(1)">
                                <p class="sc-kvZOFW blpkQa">Cancel</p>
                            </div>
                        </div>
                    </div>
                    <div class="sc-ccSCjj jIrEMD">
                        <div class="sc-hqyNC iYuHoU">
                            <div v-if="add_task_content" role="button" class="sc-jbKcbu sc-jqCOkK cBwtwK " @click="submitAddTask">
                                <p class="sc-kvZOFW blpkQa">Add Task</p>
                            </div>

                            <div v-else role="button" tabindex="-1" class="sc-jbKcbu sc-dNLxif fhkBvZ ">
                                <p class="sc-kvZOFW blpkQa">Add Task</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    </div>
</template>


<script>
    import {API} from "../../services/api";
    import {ApiConst} from "../../common/ApiConst";
    import {AppConst} from "../../common/AppConst";

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
                add_task_content:"",
                active_add_task: true,

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

            closeTaskListPopup() {
                this.$store.dispatch('setTaskDisplay', 'none');
            },

            floatWindowSetsize() {
                this.marginPopup = (this.$refs.floatWindow.clientWidth - 908) / 2 + 'px';
            },

            activate:function(el){
                if(el === 1){
                    this.active_add_task = true
                }
                else{
                    this.active_add_task = false
                }
            },

            submitAddTask(){

                let data = {
                    content: this.add_task_content,
                    due_date: '25/10/2019',
                };
                API.POST(ApiConst.CREATE_USER_TASK, data).then(res => {
                    if (res.error_code === 0) {

                        localStorage.setItem(
                            AppConst.LOCAL_USER_TASK_LIST,
                            JSON.stringify(res.data)
                        );

                        let userTaskList = localStorage.getItem(AppConst.LOCAL_USER_TASK_LIST);
                        let userTaskListJson = JSON.parse(userTaskList);
                        this.$store.dispatch('setUserTaskList', userTaskListJson);

                        this.add_task_content = "";
                        this.active_add_task = true;
                    }
                    else {
                        this.errors.update_fail = '* ' + res.error_msg;
                    }
                });
            }

        }
    };
</script>

<style scoped>
    .cBwtwK {
        box-sizing: border-box;
        display: inline-flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        min-width: 26px;
        min-height: 26px;
        background-color: rgb(0, 106, 156);
        user-select: none;
        color: rgb(255, 255, 255);
        fill: rgb(255, 255, 255);
        cursor: pointer;
        padding: 0px 12px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(0, 106, 156);
        border-image: initial;
        border-radius: 2px;
    }
    span {
        color: #1a1a1a;
    }
    .ejiprD {
        box-sizing: border-box;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        margin-left: auto;
        fill: rgb(0, 106, 156);
        padding: 4px;
    }
    .bzpghZ {
        color: rgb(0, 106, 156);
        font-size: 13px;
        font-weight: bold;
    }
    .jDJym {
        box-sizing: border-box;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        fill: rgb(0, 106, 156);
        padding: 4px;
    }
    .idcKHi:hover {
        background-color: rgb(255, 255, 255);
        box-shadow: rgb(220, 240, 250) -1px -1px 0px 1px inset, rgb(220, 240, 250) 1px 1px 0px 1px inset;
        border-color: rgb(10, 138, 189);
    }
    .idcKHi {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        background-color: rgb(255, 255, 255);
        cursor: pointer;
        padding: 8px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(255, 255, 255);
        border-radius: 2px;
    }
    .cycoxf {
        margin-bottom: 16px;
        padding: 0px 8px 8px;
    }
    .emdPBZ {
        color: rgb(0, 106, 156);
        font-size: 13px;
    }
    .kKSTuw {
        box-sizing: border-box;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        fill: rgb(0, 106, 156);
        padding: 4px;
    }
    .gMRuqb {
        position: relative;
        display: inline-flex;
        -webkit-box-align: center;
        align-items: center;
        height: 24px;
        padding-right: 4px;
        cursor: pointer;
        border-radius: 2px;
    }
    .blpkQa {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        font-size: 13px;
    }
    .fhkBvZ {
        box-sizing: border-box;
        display: inline-flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        min-width: 26px;
        min-height: 26px;
        background-color: rgb(242, 242, 242);
        user-select: none;
        color: rgb(204, 204, 204);
        fill: rgb(204, 204, 204);
        cursor: default;
        padding: 0px 12px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(204, 204, 204);
        border-image: initial;
        border-radius: 2px;
        outline: none;
    }
    .blpkQa {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        font-size: 13px;
    }
    .kOkaj {
        box-sizing: border-box;
        display: inline-flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        min-width: 26px;
        min-height: 26px;
        background-color: rgb(245, 245, 244);
        user-select: none;
        color: rgb(52, 54, 47);
        fill: rgb(52, 54, 47);
        cursor: pointer;
        padding: 0px 12px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(179, 179, 179);
        border-image: initial;
        border-radius: 2px;
    }
    .iYuHoU {
        display: inline-flex;
    }
    .jIrEMD {
        margin: 0px 4px;
    }
    .gYKOAy {
        display: flex;
        width: 16px;
        height: 16px;
    }
    .bsonrL {
        box-sizing: border-box;
        width: 24px;
        height: 24px;
        fill: rgb(0, 106, 156);
        padding: 4px;
    }
    .hlNHtf {
        color: rgb(0, 106, 156);
        font-size: 13px;
        line-height: 24px;
    }
    .EYtoc {
        box-sizing: border-box;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        height: 24px;
        padding-left: 4px;
        cursor: pointer;
        border-radius: 2px;
    }
    .eDLUww {
        color: rgb(26, 26, 26);
        font-size: 13px;
        line-height: 24px;
        padding: 0px 4px;
    }
    .iBDtxa {
        -webkit-box-flex: 1;
        flex-grow: 1;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        flex-wrap: nowrap;
        height: 24px;
        cursor: pointer;
        border-radius: 2px;
    }
    .jeZRmO {
        position: relative;
    }
    .gGZZtc {
        box-sizing: border-box;
        flex-shrink: 0;
        margin-left: auto;
        width: 16px;
        height: 16px;
        background-color: rgb(230, 230, 230);
        cursor: pointer;
        border-radius: 50%;
    }
    .gMLyAE {
        flex-shrink: 0;
        margin-right: 8px;
    }
    .kAWJRM {
        box-sizing: border-box;
        display: inline-flex;
        -webkit-box-align: center;
        align-items: center;
        flex-wrap: wrap;
        padding-right: 4px;
        border-radius: 2px;
    }
    .gYKOAy {
        display: flex;
        width: 16px;
        height: 16px;
    }
    .PGisl {
        -webkit-box-flex: 1;
        flex-grow: 1;
    }
    .lcVdXa {
        flex-shrink: 0;
        margin-right: 12px;
        color: rgb(77, 77, 77);
        font-size: 13px;
        font-weight: 700;
        white-space: nowrap;
        line-height: 24px;
    }
    .gKbKBx {
        box-sizing: border-box;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        padding: 4px;
    }
    .ixEFLz {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        padding: 4px 0px;
    }
    img, a img {
        border: 0;
        vertical-align: middle;
    }
    .cawMIV {
        width: 20px;
        height: 20px;
    }
    .itNNCX {
        box-sizing: border-box;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        cursor: pointer;
        border-radius: calc(10px);
        border-width: 1px;
        border-style: solid;
        border-color: transparent;
        overflow: hidden;
    }
    .gzRiMp {
        margin-right: 4px;
        color: rgb(26, 26, 26);
        font-size: 13px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .fwSlIV {
        margin-right: 4px;
    }
    .fJzqow {
        display: inline-flex;
        -webkit-box-align: center;
        align-items: center;
        max-width: 168px;
        height: 24px;
        margin-right: 4px;
        cursor: pointer;
        padding: 0px 4px;
        border-radius: 2px;
    }
    .gYKOAy {
        display: flex;
        width: 16px;
        height: 16px;
    }
    .igrlhn {
        flex-shrink: 0;
        margin-right: 12px;
        color: rgb(77, 77, 77);
        font-size: 13px;
        font-weight: 700;
        line-height: 24px;
    }
    .dfpiMV {
        box-sizing: border-box;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        padding: 4px;
    }
    .flbLZm {
        position: relative;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        padding: 4px 0px;
    }
    .dvoAkO {
        border-bottom: 1px dotted rgb(153, 153, 153);
    }
    .bvAzmx {
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        padding: 8px;
    }
    .jEhYoQ {
        padding: 4px 8px 0px;
    }
    .iOAdgD {
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        min-height: 120px;
        line-height: 20px;
        box-shadow: none;
        padding: 4px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(179, 179, 179);
        border-image: initial;
        border-radius: 2px;
    }
    .fSyBul {
        background-color: rgb(255, 255, 255);
        border-radius: 2px;
    }
    .jQeWrM {
        margin-bottom: 32px;
        padding: 0px 8px 8px;
    }
</style>

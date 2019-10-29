<template>
    <div class="_cwFWBase floatWindow" ref="floatWindow" @click.self="closeTaskEditPopup" style="z-index: 1002;"
         v-bind:style="{display: this.$store.state.openTaskEditDisplay, height: floatWindowHeight}">

        <div class="contactWindow _cwFWInner" v-bind:style="{top: marginTopPopup , left: marginPopup, right: marginPopup}" role="dialog"
        aria-label="Contacts"
        style="max-width: 700px; min-width: 700px; position: center">

            <div class="sc-cmIlrE jOlDde">

                <div class="sc-gleUXh hHAMLH">
                    <h1 class="sc-doWzTn cesRLY">Edit Task</h1>
                    <div class="sc-dBaXSw ikrYFo">
                        <span class="sc-ifAKCX gYKOAy" data-cwui-fw-idx="-1" @click="closeTaskEditPopup">
                             <svg class="sc-EHOje bfZdDt" width="16" height="16">
                                <use fill-rule="evenodd" xlink:href="#icon_cancel"></use>
                             </svg>
                        </span>
                    </div>
                </div>

                <div id="taskEdit">
                    <div class="sc-jdeSqf bkGZzs">

<!--                        TASK CONTENT-->
                        <div class="sc-cBrjTV WPgkE">
                            <textarea v-model="this.$store.getters.get_edit_task_detail[0]" tabindex="1" placeholder="Enter task here" class="sc-ejGVNB iOAdgD">

                            </textarea>
                        </div>

<!--                        TASK DETAIL-->
                        <div class="sc-iCwjlJ fIwbzs">
                            <div class="sc-fkyLDJ sc-jUpvKA fIaJdN">
                                <div class="sc-ESoVU fOvfwG">
                                    <div class="sc-hRmvpr HAWiX">
                                        <span class="sc-ifAKCX gYKOAy">
                                            <svg viewBox="0 0 10 10" width="16" height="16" class="sc-EHOje bfZdDt" aria-hidden="true">
                                                <use fill-rule="evenodd" xlink:href="#icon_contact">
                                                </use>
                                            </svg>
                                        </span>
                                    </div>
                                    <p class="sc-cZBZkQ kXRBgE">To</p>
                                    <div class="sc-kkbgRg gXxZBr">
                                        <div class="sc-ecaExY cYXuwv">
                                            <div class="_avatarHoverTip _avatarClickTip sc-Rmtcm itNNCX" data-aid="2571977">
<!--                                                <img src="https://appdata.chatwork.com/avatar/3431/3431235.gif" alt="Le Gia Le [PG]" class="sc-bRBYWo cawMIV">-->
                                            </div></div>

                                        <p class="sc-gbzWSY gLjfYE">

                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="sc-fkyLDJ sc-jdfcpN eSpEtj">
                                <div class="sc-dREXXX ixEFLz">
                                    <div class="sc-kcbnda gKbKBx"><span class="sc-ifAKCX gYKOAy"><svg viewBox="0 0 10 10" width="16" height="16" class="sc-EHOje bfZdDt" aria-hidden="true"><use fill-rule="evenodd" xlink:href="#icon_calendar"></use></svg></span></div>
                                    <p class="sc-hcmgZB lcVdXa">Due</p>
                                    <div class="sc-dHmInP PGisl">
                                        <div class="sc-cjHlYL kAWJRM">
                                            <div class="sc-dRaagA gMLyAE">
                                                <div class="sc-iYUSvU jeZRmO">
                                                    <div class="sc-cHSUfg iBDtxa">
                                                        <p class="sc-cTjmhe eDLUww">9/1</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="sc-dRaagA gMLyAE">
                                                <div class="sc-gkFcWv EYtoc">
                                                    <p class="sc-hUfwpO hlNHtf">No time selected</p>
                                                    <div class="sc-imABML bsonrL"><span class="sc-ifAKCX gYKOAy"><svg viewBox="0 0 10 10" width="16" height="16" class="sc-EHOje bfZdDt" aria-hidden="true"><use fill-rule="evenodd" xlink:href="#icon_triangleDown"></use></svg></span></div>
                                                </div>
                                            </div>
                                            <div class="sc-fEUNkw gGZZtc">
                                                <span class="sc-ifAKCX gYKOAy"><svg viewBox="0 0 10 10" width="16" height="16" class="sc-EHOje bfZdDt" aria-hidden="true"><use fill-rule="evenodd" xlink:href="#icon_cancel"></use></svg></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

<!--                        BUTTONS-->
                        <div class="sc-fjdhpX sc-jRuhRL VVrrQ">
                            <div class="sc-jzJRlG sc-kNBZmU cgalwE">
                                <div class="sc-hqyNC iYuHoU">
                                    <div @click="closeTaskEditPopup" role="button" tabindex="-1" class="sc-jbKcbu sc-dNLxif kOkaj"><p class="sc-kvZOFW blpkQa">Cancel</p></div>
                                </div>
                            </div>
<!--                            @click="submitEditTask(this.$store.getters.get_edit_task_detail[0])"-->
                            <div class="sc-jzJRlG sc-kNBZmU cgalwE">
                                <div  @click="closeTaskEditPopup" class="sc-hqyNC iYuHoU">
                                    <div  role="button" tabindex="-1" class="sc-jbKcbu sc-dNLxif cBwtwK">
                                        <p class="sc-kvZOFW blpkQa">Save</p>
                                    </div>
<!--                                    <div v-else role="button" tabindex="-1" class="sc-jbKcbu sc-dNLxif fhkBvZ">-->
<!--                                        <p class="sc-kvZOFW blpkQa">Save</p>-->
<!--                                    </div>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    // import {API} from "../../services/api";
    // import {ApiConst} from "../../common/ApiConst";
    // import {AppConst} from "../../common/AppConst";

    export default {
        name: "EditTaskContent",
        data() {
            return {
                floatWindowHeight: '0px',
                marginTopPopup: '0px',
                marginPopup: '0px',
                errors: {
                    required_name: '',
                    update_fail: ''
                },
                edit_task_detail: () => {
                    return this.$store.getters.get_edit_task_detail[0]
                }
            }
        },
        created() {
            window.addEventListener('resize', this.handleResize)
            this.handleResizePopup();
        },

        methods:{
            handleResizePopup() {
                this.marginTopPopup = '80px';
                this.marginPopup = (window.innerWidth - 708)/2 + 'px';
                this.floatWindowHeight = window.innerHeight + 'px';
            },
            closeTaskEditPopup(){
                this.$store.dispatch('setTaskEditDisplay', 'none');
            },
            submitEditTask(task){
                console.log(this.edit_task_detail);
                this.$store.dispatch('setTaskEditDisplay', 'none');
                // let data = {
                //     task_id : task.id,
                //     content: task.content,
                //     due_date: '25/10/2019'
                // };
                //
                // API.POST(ApiConst.UPDATE_USER_TASK, data).then(res => {
                //     if (res.error_code === 0) {
                //         task.status = 1;
                //         localStorage.setItem(
                //             AppConst.LOCAL_USER_TASK_LIST,
                //             JSON.stringify(res.data)
                //         );
                //     }
                // });
            }
        }

    }
</script>

<style scoped>
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
    .cgalwE {
        margin: 0px 8px;
    }
    .VVrrQ {
        box-sizing: border-box;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        background-color: rgb(230, 230, 230);
        padding: 8px;
        border-top: 1px solid rgb(179, 179, 179);
        border-radius: 0px 0px 4px 4px;
    }
    .gYKOAy {
        display: flex;
        width: 16px;
        height: 16px;
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
    .bfZdDt {
        width: 16px;
        height: 16px;
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
    .eSpEtj {
        box-sizing: border-box;
        height: 56px;
        padding: 12px 0px;
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
    .gLjfYE {
        margin-right: 4px;
        color: rgb(26, 26, 26);
        font-size: 13px;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 24px;
        overflow: hidden;
    }
    .cYXuwv {
        margin-right: 4px;
    }
    .kXRBgE {
        flex-shrink: 0;
        margin-right: 12px;
        color: rgb(77, 77, 77);
        font-size: 13px;
        font-weight: 700;
        line-height: 24px;
    }
    .gYKOAy {
        display: flex;
        width: 16px;
        height: 16px;
    }
    .gXxZBr {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
    }
    .kXRBgE {
        flex-shrink: 0;
        margin-right: 12px;
        color: rgb(77, 77, 77);
        font-size: 13px;
        font-weight: 700;
        line-height: 24px;
    }
    .HAWiX {
        box-sizing: border-box;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        padding: 4px;
    }
    .fOvfwG {
        position: relative;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        flex-wrap: wrap;
        padding: 4px 0px;
    }
    .eSpEtj {
        box-sizing: border-box;
        height: 56px;
        padding: 12px 0px;
    }
    .fIaJdN {
        box-sizing: border-box;
        height: 56px;
        padding: 12px 0px;
        border-bottom: 1px dotted rgb(153, 153, 153);
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
    .VVrrQ {
        box-sizing: border-box;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        background-color: rgb(230, 230, 230);
        padding: 8px;
        border-top: 1px solid rgb(179, 179, 179);
        border-radius: 0px 0px 4px 4px;
    }
    .fIwbzs {
        box-sizing: border-box;
        padding: 0px 16px;
    }
    .WPgkE {
        box-sizing: border-box;
        height: 260px;
        padding: 16px 16px 0px;
    }
    .bkGZzs {
        width: 680px;
    }
    .bfZdDt {
        width: 16px;
        height: 16px;
    }
    .gYKOAy {
        display: flex;
        width: 16px;
        height: 16px;
    }
    .ikrYFo {
        box-sizing: border-box;
        width: 24px;
        height: 24px;
        margin-left: auto;
        cursor: pointer;
        fill: rgb(82, 83, 84);
        padding: 4px;
    }
    .cesRLY {
        color: rgb(26, 26, 26);
        font-size: 16px;
        font-weight: bold;
    }
    .hHAMLH {
        box-sizing: border-box;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        height: 40px;
        padding: 8px;
        border-bottom: 1px solid rgb(179, 179, 179);
        border-radius: 4px 4px 0px 0px;
    }
    .jOlDde {
        background-color: rgb(242, 242, 242);
        box-shadow: rgba(0, 0, 0, 0.8) 0px 1px 10px;
        z-index: 7;
        border-radius: 5px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(179, 179, 179);
        border-image: initial;
    }
    .eIEGwj {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        position: absolute;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
    }
    .lhmNdl {
        position: absolute;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
        z-index: 1003;
    }
</style>

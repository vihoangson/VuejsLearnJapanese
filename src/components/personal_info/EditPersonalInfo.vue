<template>
    <div class="_cwFWBase floatWindow" ref="floatWindow" @click.self="closeProfileEdit" style="z-index: 1002;"
         v-bind:style="{display: this.$store.state.openProfileEdit, height: floatWindowHeight}">
        <div id="_contactWindow" class="contactWindow _cwFWInner" v-bind:style="{left: marginPopup, right: marginPopup}" role="dialog"
             aria-label="Contacts">



            <div class="dialogContainer__header">
                <h1 class="_floatWindowTitle floatWindow__title"><span class="autotrim">Profile name</span></h1>
                <div class="floatWindow__closeButtonContainer">
                  <span class="_cwFWButton floatWindow__closeButton" data-cwui-fw-idx="-1" @click="closeProfileEdit">
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
                        <div id="_profileEditCoverControl" @click="changeImgOption='cover';$refs.file.click();"  class="_profilePhotoEditBar profileEditDialog__editCoverButton" style="display: block;">
                            Edit cover photo
                        </div>


                    </div>
                    <div class="_profileAvatar profileShowDialog__avatarContainer">
                        <div class="p-relative">
                            <img class=" avatarHuge _avatar _avatarAid2571977" data-aid="2571977" :src="$store.getters.get_current_user_info.icon_img">
                            <div @click="changeImgOption='avatar';$refs.file.click();" ref="file" id="_profileEditAvatarControl" class="_profilePhotoEditBar profileEditDialog__editAvatarButton" style="display: block;">
                                Edit
                            </div>
                        </div>
                        <input type="file"  ref="file" @change="uploadImagePersonalInfo" style="display: none" :accept="acceptImgFiles">
                    </div>

                </div>

                <div class="profileShowDialog__bodyContainer">


                    <!--<form name="update_info" method="post" @submit="update_info">-->
                        <div class="profileShowDialog__profileBody">


                            <ul class="profileShowDialog__profileBodyItemList">


                                <li class="profileShowDialog__profileBodyItem" >

                                    <span class="profileShowDialog__profileBodyItemLabel">
                                        Display name:
                                    </span>
                                    <span class="_profileDepartment profileShowDialog__profileBodyItemContent">
                                         <input class="profileShowDialog__profileBodyInput" type="text" v-model="input_values.name" />
                                          <!--<input class="profileShowDialog__profileBodyInput" v-text="user_info.name" type="text" />-->
                                    </span>

                                    <span  v-if="errors.required_name.length" style="color: red"> {{errors.required_name}}</span>
                                </li>

                                <li class="profileShowDialog__profileBodyItem" >

                                    <span class="profileShowDialog__profileBodyItemLabel">
                                        Organization name:
                                    </span>
                                    <span class="_profileDepartment profileShowDialog__profileBodyItemContent">
                                         <input class="profileShowDialog__profileBodyInput" type="text" v-model="input_values.company" />
                                         <!--<input class="profileShowDialog__profileBodyInput" v-text="user_info.company" type="text" />-->
                                    </span>

                                </li>

                                <!--<li class="profileShowDialog__profileBodyItem" >-->

                                    <!--<span class="profileShowDialog__profileBodyItemLabel">-->
                                        <!--E-mail:-->
                                    <!--</span>-->
                                    <!--<span class="_profileDepartment profileShowDialog__profileBodyItemContent">-->
                                        <!--<input class="profileShowDialog__profileBodyInput" type="text" v-model="input_values.email"/>-->
                                        <!--&lt;!&ndash;<input class="profileShowDialog__profileBodyInput" v-text="user_info.email" type="text" />&ndash;&gt;-->
                                    <!--</span>-->

                                <!--</li>-->

                            </ul>
                        </div>
                    <!--</form>-->


                </div>
            </div>


            <div style="" class="_cwDGFooter dialogContainer__footer">
                <div @click="submit_update_info" role="button" aria-label="Save" class="_cwDGButton  btnPrimary" data-idx="0" tabindex="200" >
                    Save
                </div>
                <div  @click="closeProfileEdit" role="button" aria-label="Cancel" class="_cwDGButton  _cwDGButtonCancel button buttonGray" data-idx="1" tabindex="201">
                    Cancel
                </div>
            </div>



        </div>
    </div>
</template>


<script>
    import {ApiConst} from "../../common/ApiConst";
    import {API} from "../../services/api";
    import {AppConst} from "../../common/AppConst";

    export default {
        name: "EditPersonalInfo",
        waitForData: true,
        data() {
            return {
                changeImgOption:'avatar',
                acceptImgFiles:AppConst.ACCEPTED_IMG_FILES,
                errors: {
                    required_name: '',
                    update_fail: ''
                },

                input_values:{
                    // email: this.$store.getters.get_current_user_info.email,
                    name: this.$store.getters.get_current_user_info.name,
                    company: this.$store.getters.get_current_user_info.company

                },

                isHidden: true,
                displayCloseIcon: 'block',

                floatWindowHeight: '0px',

                marginPopup: '0px',

                user_info: this.$store.getters.get_current_user_info

            }
        },
        created() {
            window.addEventListener('resize', this.handleResize)
            this.handleResizePopup();
        },

        methods: {
            uploadImagePersonalInfo(option){
                // Turn on screen loading
                this.$store.dispatch('setLoadingPage',true);

                let canUploadImg = true;
                if(canUploadImg){

                    this.inputfile = this.$refs.file.files[0];
                    let dataImg = new FormData();
                    let i=0;
                    dataImg.append('file[' + i + ']',this.inputfile);
                    dataImg.append('user_id',this.$store.getters.get_current_user_info.id);
                    dataImg.append('option',this.changeImgOption);

                    API.POSTFILE(ApiConst.USER_UPLOAD_ICON_IMG,dataImg).then(response=>{
                        // Turn off screen loading
                        this.$store.dispatch('setLoadingPage',false);

                        if(response.error_code === 0){
                            this.$root.$emit('push-notice', {message:'Upload successfully', alert: 'alert-success'});

                            let prmCurrentUser = this.$store.getters.get_current_user_info;
                            prmCurrentUser.icon_img = response.data.icon_img;
                            prmCurrentUser.cover_img = response.data.cover_img;
                            this.$store.dispatch("setCurrentUserInfo",prmCurrentUser);

                        }
                    })
                }
            },

            handleResizePopup() {
                this.marginPopup = (window.innerWidth - 908)/2 + 'px';
                this.floatWindowHeight = window.innerHeight + 'px';
            },

            closeProfileEdit() {
                this.$store.dispatch('setProfileEdit', 'none');
            },

            floatWindowSetsize() {
                this.marginPopup = (this.$refs.floatWindow.clientWidth - 908) / 2 + 'px';
            },
    
            submit_update_info(e) {

                this.errors.required_name = '';

                if (this.input_values.name.trim() !== ""){
                    let data = {
                        id: this.$store.getters.get_current_user_info.id,
                        name: this.input_values.name,
                        company: this.input_values.company,
                    };
                    API.POST(ApiConst.UPDATE_USER_INFO, data).then(res => {
                        if (res.error_code === 0) {
                            let userInfo = {
                                id : res.data.id,
                                email: res.data.email,
                                name: res.data.name,
                                company: res.data.company,
                                icon_img: this.$store.getters.get_current_user_info.icon_img,
                                cover_img: this.$store.getters.get_current_user_info.cover_img,
                            };
                            localStorage.setItem(
                                AppConst.LOCAL_USER_INFO,
                                JSON.stringify(userInfo)
                            );

                            let newUserInfo = localStorage.getItem(AppConst.LOCAL_USER_INFO);
                            this.$store.dispatch('setCurrentUserInfo', JSON.parse(newUserInfo));
                            this.$store.dispatch('setProfileEdit', 'none');
                        }
                        else {
                            this.errors.update_fail = '* ' + res.error_msg;
                        }
                    });
                }
                else {
                    this.errors.required_name = '* Name must not be empty';
                }

            },
        }
    };
</script>

<style scoped>

    .loader {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background-color: #ffffffcf;
    }
    .loader img{
        position: relative;
        left: 40%;
        top: 40%;
    }


    .profileShowDialog__profileBodyInput{
        width: 300px;
        border: 1px solid #999999;
        border-radius: 2px;
        background: #fff;
        transition: border 0.2s linear 0s, box-shadow 0.2s linear 0s;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15) inset;
        height: 18px;
        line-height: 1.4em;
        padding: 3px;
    }

    .dialogContainer__footer .button:first-child {
        margin-left: 0;
    }

    .dialogContainer__footer .button {
        opacity: 1;
        margin-left: 10px;
    }

    .btnPrimary:hover {
        border-color: #0074b7;
        color: #fff;
        fill: #fff;
        background-color: #0074b7;
        text-decoration: none;
    }
    .btnPrimary {
        border-radius: 2px;
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        padding: 0 12px;
        min-width: 26px;
        min-height: 26px;
        border: 1px solid #006a9c;
        color: #fff;
        fill: #34362f;
        background-color: #006a9c;
        vertical-align: middle;
        text-align: center;
        text-decoration: none;
        line-height: 26px;
        cursor: pointer;
        user-select: none;
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

    .dialogContainer__footer {
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 40px;
        border-top: 1px solid #b3b3b3;
        background: #e6e6e6;
        border-radius: 0 0 4px 4px;
    }


    .profileEditDialog__editCoverButton {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        font-weight: 700;
        cursor: pointer;
    }

    .p-relative{
        position:relative;
        width:100%;
    }
    img.avatarHuge._avatar._avatarAid2571977 {
        width: 100%;
    }
    .profileEditDialog__editAvatarButton {
        position: absolute;
        left: -11px;
        bottom: 12px;
        height: 30px;
        width: 140px;
        line-height: 30px;
        background: rgba(0, 0, 0, 0.8);
        text-align: center;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
    }


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
    }

    .profileShowDialog__coverContainer {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 250px;
        background: #f2f2f2;
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

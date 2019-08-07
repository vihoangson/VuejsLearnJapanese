<template>
    <div class="_cwFWBase floatWindow" ref="floatWindow" @click.self="closeContactPopup" style="z-index: 1002;"
         v-bind:style="{display: this.$store.state.openContactDisplay, height: floatWindowHeight}">
        <div id="_contactWindow" class="contactWindow _cwFWInner" v-bind:style="{left: marginPopup, right: marginPopup}" role="dialog"
             aria-label="Contacts">
            <div class="_floatWindowHeader floatWindow__header">
                <h1 class="_floatWindowTitle floatWindow__title"><span class="autotrim">Contacts</span></h1>
                <div class="floatWindow__closeButtonContainer">
                  <span class="_cwFWButton floatWindow__closeButton" data-cwui-fw-idx="-1" @click="closeContactPopup">
                    <svg viewBox="0 0 10 10" class="floatWindow__closeButtonIcon" width="16" height="16">
                      <use fill-rule="evenodd" xlink:href="#icon_cancel"></use>
                    </svg>
                  </span>
                    <span class="icoTextHide">Close</span>
                </div>
            </div>

            <div class="_cwFWHeader">
                <div class="floatHeaderTab clearfix">
                    <ul id="_contactWindowTab">
                        <li id="_contactWindowTabInviteEmail" data-type="invitemail" class="floatTabSelect" style="">
                            Invite by Email
                        </li>
                        <li id="_contactWindowTabContact" data-type="addcontact">User Search</li>
                        <li id="_contactWindowTabMyContact" data-type="contact">Contacts<span
                                id="_contactWindowListNum">(114)</span></li>
                        <li id="_contactWindowTabMyRequest" data-type="myrequest" style="display: none;">Sent
                            Requests<span id="_contactWindowMyRequestNum"></span></li>
                        <li id="_contactWindowTabRequest" data-type="request" style="display: none;">Incoming
                            Requests<span id="_contactWindowRequestNum"></span></li>
                        <li id="_contactWindowTabNoRequest" data-type="norequest">Not in Contacts<span
                                id="_contactWindowNoRequestNum">(15)</span></li>
                    </ul>
                </div>

            </div>
            <div class="_cwFWContent" style="height: 600px; width: 908px">
                <div class="adminWindowAllList">
                    <div id="_contactInviteMailArea" class="contactInviteMailArea">
                        <div id="_contentInviteMailNew" class="contactInviteMailContent" style="">
                            <div id="_contactInviteMailIndividual" class="contactInviteMailSection"
                                 v-bind:style="{display: individualAdd}">
                                <div class="contactInviteErrorMessage alert alertDanger" style="display: none"></div>
                                <label class="contactInviteMailLabel">Email Address</label>

                                <div class="formControlArea clear">
                                    <a href="#" id="_contactInviteMailAddAddress" class="addForm">
                                        <p class="AddFormIcon addForm__iconContainer" aria-hidden="true">
                                            <svg viewBox="0 0 10 10" class="addForm__icon" width="16" height="16">
                                                <use fill-rule="evenodd" xlink:href="#icon_plus"></use>
                                            </svg>
                                        </p>
                                        <p @click="addMore">Add email address to invite</p>
                                    </a>
                                    <a href="#" class="changeFormBulk" @click="toggleMailInvite">Bulk-add</a>
                                </div>
                            </div>
                            <div id="_contactInviteMailBulk" class="contactInviteMailSection"
                                 v-bind:style="{display: bulkAdd}">
                                <div class="contactInviteErrorMessage alert alertDanger" style="display: none;"></div>
                                <label class="contactInviteMailLabel">Enter an e-mail address per line.</label>
                                <textarea id="_addFromEmailContentEmails" name="emails"
                                          placeholder="Enter an e-mail address per line."></textarea>
                                <a href="#" class="changeFormIndividual" @click="toggleMailInvite">Add members
                                    individually</a>
                            </div>
                            <div class="contactInviteMailSection">
                                <label class="contactInviteMailLabel">Message (optional)</label>
                                <textarea id="_addFromEmailContent" name="message"
                                          placeholder="Type a message"></textarea>
                            </div>
                        </div>
                        <div id="_contentInviteMailFinished" class="contactInviteMailContent" style="display: none;">
                            <div class="contactInviteMailSection">
                                <p class="alert alertSuccess">Invitation was sent successfully.</p>
                                <p class="alert alertDanger">Invitation wasn't sent due to the following reasons.</p>
                            </div>
                            <div id="_contactInviteMailSentEmails" class="contactInviteMailResult">
                                <p class="contactInviteMailResultTitle mailResultTitleSuccess">Invitation sent</p>
                                <ul class="contactInviteMailResultList">
                                </ul>
                            </div>
                            <div id="_contactInviteMailUnreachableEmailAddresses" class="contactInviteMailResult">
                                <p class="contactInviteMailResultTitle mailResultTitleFailed">Invalid email address.</p>
                                <ul class="contactInviteMailResultList">
                                </ul>
                            </div>
                            <div id="_contactInviteMailAlreadyRequested" class="contactInviteMailResult">
                                <p class="contactInviteMailResultTitle mailResultTitleFailed">Already sent contact
                                    request.</p>
                                <ul class="contactInviteMailResultList">
                                </ul>
                            </div>
                            <div id="_contactInviteMailAlreadyConnected" class="contactInviteMailResult">
                                <p class="contactInviteMailResultTitle mailResultTitleFailed">This person is already in
                                    your contacts.</p>
                                <ul class="contactInviteMailResultList">
                                </ul>
                            </div>
                            <div id="_contactInviteMailRequestAlreadyReceived" class="contactInviteMailResult">
                                <p class="contactInviteMailResultTitle mailResultTitleFailed">Already received contact
                                    request.</p>
                                <ul class="contactInviteMailResultList">
                                </ul>
                            </div>
                            <div id="_contactInviteMailNotAllowedConnecting" class="contactInviteMailResult">
                                <p class="contactInviteMailResultTitle mailResultTitleFailed">This person is restricted
                                    to connect with members outside the orgaization.</p>
                                <ul class="contactInviteMailResultList">
                                </ul>
                            </div>
                            <div id="_contactInviteMailContactRequestLimitExceeded" class="contactInviteMailResult">
                                <p class="contactInviteMailResultTitle mailResultTitleFailed">Reached maximum number of
                                    contact requests.</p>
                                <ul class="contactInviteMailResultList">
                                </ul>
                            </div>
                            <div id="_contactInviteMailContactYourEmailAddress" class="contactInviteMailResult">
                                <p class="contactInviteMailResultTitle mailResultTitleFailed">Unable to send invitation
                                    to your account.</p>
                                <ul class="contactInviteMailResultList">
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div id="_contactWindowBox" class="adminAllListArea" style="display: none;">
                        <ul id="_contactWindowList" class="contactList">
                            <div class="adminAllListArea__emptyContainer">
                                <img src="https://assets.chatwork.com/images/empty/img_contact_empty.png"
                                     class="adminAllListArea__emptyImage" alt="">
                                <p class="adminAllListArea__emptyDescription">

                                </p>
                            </div>
                        </ul>
                    </div>

                    <div id="_contactDetailAreaWrapper" class="contactDetailInfo" style="display: none;">
                        <div id="_contactDetailArea" class="contactDetailInfo__container" data-aid=""
                             style="display: none;">
                            <div class="contactDetailInfo__header">
                                <div class="_profileName contactDetailInfo__headerText"></div>
                                <div class="contactDetailInfo__closeIconContainer">
                                    <span id="_contactDetailClose" role="button">
                                      <svg viewBox="0 0 10 10" class="contactDetailInfo__closeIcon" width="16"
                                           height="16">
                                        <use fill-rule="evenodd" xlink:href="#icon_cancel"></use>
                                      </svg>
                                    </span>
                                    <span class="icoTextHide">Close</span>
                                </div>
                            </div>

                            <div class="_profileContactDetailCover contactDetailInfo__cover"></div>

                            <div class="contactDetailInfo__infoTable">
                                <div class="contactDetailInfo__infoTableRow">
                                    <label class="contactDetailInfo__infoTableLabel">Bio:</label>
                                    <div class="_profileNameDescription contactDetailInfo__infoTableContent"></div>
                                </div>
                                <div class="contactDetailInfo__infoTableRow">
                                    <label class="contactDetailInfo__infoTableLabel">Organization name:</label>
                                    <div class="_profileOrgName contactDetailInfo__infoTableContent"></div>
                                </div>
                                <div class="contactDetailInfo__infoTableRow">
                                    <label class="contactDetailInfo__infoTableLabel">Department / Division:</label>
                                    <div class="_profileDepartment contactDetailInfo__infoTableContent"></div>
                                </div>
                                <div class="contactDetailInfo__infoTableRow">
                                    <label class="contactDetailInfo__infoTableLabel">Title:</label>
                                    <div class="_profileTitle contactDetailInfo__infoTableContent"></div>
                                </div>
                                <div class="contactDetailInfo__infoTableRow">
                                    <label class="contactDetailInfo__infoTableLabel">Address:</label>
                                    <div class="_profileAddress contactDetailInfo__infoTableContent"></div>
                                </div>
                                <div class="contactDetailInfo__infoTableRow">
                                    <label class="contactDetailInfo__infoTableLabel">URL:</label>
                                    <div class="_profileUrl contactDetailInfo__infoTableContent"></div>
                                </div>
                                <div class="contactDetailInfo__infoTableRow">
                                    <label class="contactDetailInfo__infoTableLabel">e-mail:</label>
                                    <div class="_profileEmail contactDetailInfo__infoTableContent"></div>
                                </div>
                                <div class="contactDetailInfo__infoTableRow">
                                    <label class="contactDetailInfo__infoTableLabel">Phone (work):</label>
                                    <div class="_profileOrgTel contactDetailInfo__infoTableContent"></div>
                                </div>
                                <div class="contactDetailInfo__infoTableRow">
                                    <label class="contactDetailInfo__infoTableLabel">Ext. number:</label>
                                    <div class="_profileExtensionTel contactDetailInfo__infoTableContent"></div>
                                </div>
                                <div class="contactDetailInfo__infoTableRow">
                                    <label class="contactDetailInfo__infoTableLabel">Mobile:</label>
                                    <div class="_profileMobileTel contactDetailInfo__infoTableContent"></div>
                                </div>
                            </div>
                        </div>

                        <div id="_contactDetailBlankArea" class="contactDetailInfo__container--blank">
                            <p class="contactDetailInfo__blankText">
                                Select contact for details
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <div class="_cwFWFooter contactInviteMailFooter" style="">
                <div id="_contactInviteMail" class="_button btnPrimary btnLarge _cwBN button" role="button"
                     @click="postInviteByEmail">Send
                </div>
                <div id="_contactOtherInviteMail" class="_button btnLarge _cwBN button" role="button"
                     style="display: none;">Invite more
                </div>
            </div>
            <div style="display:none" class="_cwFWButtonFooter floatWindow__footer"></div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "Contact",
        data() {
            return {
                isHidden: true,
                displayCloseIcon: 'none',
                individualAdd: 'block',
                floatWindowHeight: '0px',
                bulkAdd: 'none',
                marginPopup: '0px',
                emailInput: '',
                itemEmails: [
                    {id: 'itemEmail1', text: '', displayCloseIcon: 'none'},
                ]
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
            onChangeEmail(object, index) {
                if (index === 0 && object.text.length === 0) {
                    object.displayCloseIcon = 'none'
                } else {
                    object.displayCloseIcon = 'block'
                }
            },
            cancelEmailInput(object, index) {
                if (this.itemEmails.length > 1) {
                    this.itemEmails.splice(index, 1);
                } else {
                    object.text = '';
                }
                if (this.itemEmails.length === 1 && this.itemEmails[0].text.length === 0) {
                    this.itemEmails[0].displayCloseIcon = 'none';
                }
            },
            addMore() {
                this.itemEmails[0].displayCloseIcon = 'block';
                this.itemEmails.push({id: 'itemEmail' + this.itemEmails.count + 1, text: '', displayCloseIcon: 'block'})
            },
            closeContactPopup() {
                this.$store.dispatch("setContactDisplay", 'none');
            },
            toggleMailInvite() {
                if (this.individualAdd === 'block') {
                    this.bulkAdd = 'block';
                    this.individualAdd = 'none';
                } else {
                    this.bulkAdd = 'none';
                    this.individualAdd = 'block';
                }
            },
            postInviteByEmail() {
                // axios.post("API invite by email", {
                //     username: this.username,
                //     password: this.password,
                //     only_token: true
                // })
                //     .then(res => {
                //         let user = {
                //             token: res.data.data.api_token,
                //             email: res.data.data.email,
                //             employee: res.data.data.employee
                //         };
                //         localStorage.setItem("user", user);
                //         this.$router.push({path: "/"});
                //     })
                console.log("Send data to server");
            },
            floatWindowSetsize() {
                this.marginPopup = (this.$refs.floatWindow.clientWidth - 908) / 2 + 'px';
            }
        }
    };
</script>

<style>

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

    .floatWindow__header {
        display: flex;
        align-items: center;
        position: relative;
        padding: 0 10px;
        height: 40px;
        background-color: #f2f2f2;
        border-bottom: 1px solid #b3b3b3;
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

    .floatWindow__header {
        display: flex;
        align-items: center;
        position: relative;
        padding: 0 10px;
        height: 40px;
        background-color: #f2f2f2;
        border-bottom: 1px solid #b3b3b3;
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

    .floatHeaderTab {
        position: relative;
        height: 30px;
        line-height: 30px;
        background: rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid #b3b3b3;
        padding: 0 10px;
    }

    .clearfix {
        zoom: 1;
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

    .contactInviteMailFooter {
        position: absolute;
        left: 0;
        width: 100%;
        border-top: 1px solid #cccccc;
        background: #f0f0f0 linear-gradient(to bottom, #e6e6e6, #fff) repeat-x;
        text-align: center;
        padding: 10px 0;
    }

    .btnPrimary {
        border-color: #006a9c;
        color: #fff;
        background-color: #006a9c;
    }

    .btnLarge {
        min-width: 30px;
        height: 30px;
        padding: 0 18px;
        font-size: 14px;
        line-height: 30px;
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

    .contactInviteMailFooter {
        position: absolute;
        left: 0;
        width: 100%;
        border-top: 1px solid #cccccc;
        background: #f0f0f0 linear-gradient(to bottom, #e6e6e6, #fff) repeat-x;
        text-align: center;
        padding: 10px 0;
    }

    .btnPrimary:active {
        border-color: #216493;
        color: #fff;
        background-color: #216493;
    }

    .btnPrimary:hover {
        border-color: #0074b7;
        color: #fff;
        background-color: #0074b7;
    }

    .button:active {
        border-color: #999999;
        color: #676863;
        fill: #676863;
        background-color: #eaeae8;
    }

    .button:hover {
        border-color: #cccccc;
        color: #676863;
        fill: #676863;
        background-color: #fff;
        text-decoration: none;
    }

    .btnPrimary {
        border-color: #006a9c;
        color: #fff;
        background-color: #006a9c;
    }

    .adminWindowAllList {
        position: relative;
        height: 100%;
    }

    .contactInviteMailArea {
        height: 100%;
        overflow: auto;
    }

    .contactInviteMailContent {
        max-width: 480px;
        margin: 0 auto 60px;
        padding-top: 20px;
    }

    .contactInviteMailSection {
        margin-bottom: 30px;
    }

    .alertDanger {
        color: #dd0900;
        border-color: #f9423a;
        background-color: #fbefee;
    }

    .alert {
        text-align: center;
        background: #fff;
        padding: 10px;
        border: 1px solid #999;
        border-radius: 3px;
        margin-bottom: 20px;
    }

    .contactInviteMailLabel {
        display: block;
        color: #666666;
        font-size: 12px;
        font-weight: 700;
        word-break: normal;
        line-height: 1.2;
        margin-bottom: 10px;
    }

    label, input, button, select, textarea {
        font-size: 13px;
        font-weight: normal;
        line-height: 18px;
    }

    .contactInviteMailList__item {
        position: relative;
        margin-bottom: 10px;
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

    .invitationLinkEditorCancel__icon {
        width: 16px;
        height: 16px;
    }

    .formControlArea {
        box-sizing: border-box;
        width: 100%;
        padding: 7px 10px;
        border: 1px solid #cccccc;
        height: 34px;
        background: #fff;
        border-radius: 2px;
    }

    .formControlArea a:first-child {
        float: left;
    }

    .addForm {
        display: flex;
        fill: #0084b2;
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

    .addForm__iconContainer {
        height: 16px;
        padding: 0 5px 0 0;
    }

    .addForm__icon {
        width: 16px;
        height: 16px;
        fill: inherit;
    }

    .addForm__icon {
        width: 16px;
        height: 16px;
        fill: inherit;
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

    .changeFormIndividual {
        display: block;
        text-align: right;
        margin-top: 10px;
    }

    .contactInviteMailSection {
        margin-bottom: 30px;
    }

    .contactInviteMailContent {
        max-width: 480px;
        margin: 0 auto 60px;
        padding-top: 20px;
    }

    .alertSuccess {
        color: #035460;
        border-color: #7cc7d2;
        background-color: #e2f7fa;
    }

    .mailResultTitleSuccess {
        color: #035460;
        border-color: #7cc7d2;
    }

    .contactInviteMailResultTitle {
        padding: 0 0 5px 10px;
        border-bottom: 1px solid #000;
    }

    .contactInviteMailResult + .contactInviteMailResult {
        margin-top: 30px;
    }

    .mailResultTitleFailed {
        color: #dd0900;
        border-color: #f9423a;
    }

    .contactInviteMailResultList {
        margin-top: 5px;
    }

    .mailResultTitleFailed {
        color: #dd0900;
        border-color: #f9423a;
    }

    .contactInviteMailList__cancelButton {
        fill: #525354;
        position: absolute;
        top: 7px;
        right: -20px;
        width: 16px;
        height: 16px;
        cursor: pointer;
    }

    svg, use {
        pointer-events: none;
    }
</style>

<template>
    <div class="_cwFWBase floatWindow" ref="floatWindow" @click.self="closeContactPopup" style="z-index: 1002;"
         v-bind:style="{display: this.$store.state.openContactDisplay, height: floatWindowHeight}">
        <div id="_contactWindow" class="contactWindow _cwFWInner" v-bind:style="{left: marginPopup, right: marginPopup}"
             role="dialog"
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
            <!--<Search></Search>-->
            <div class="_cwFWHeader">
                <div class="floatHeaderTab clearfix">
                    <ul id="_contactWindowTab">
                        <li @click="changeTab(index)" v-for="(tab, index) in contactTabs" :key="index" v-bind:id="tab.id"
                            :class="linkClass(index)" v-bind:data-type="tab.dataType" v-text="tab.text+tab.subtext"
                            v-bind:style="{display: tab.display}"/>
                    </ul>
                </div>
                <div id="_contactWindowNavigation" class="adminNavigation" style="display: none;">
                    <div class="search">
                      <span class="icSearch">
                        <svg viewBox="0 0 10 10" class="icSearch__icon" width="16" height="16">
                          <use fill-rule="evenodd" xlink:href="#icon_search"></use>
                        </svg>
                      </span>
                        <span class="_cwSBCancel icSearchCancel" style="display:none">
                            <svg viewBox="0 0 10 10" class="icSearchCancel__icon" width="16" height="16">
                              <use fill-rule="evenodd" xlink:href="#icon_cancel"></use>
                            </svg>
                          </span>
                        <input type="text" id="_contactWindowSearch" class="inputLong _cwSB searchBox" role="search"
                               placeholder="Enter name, Chatwork ID, email address here"></div>
                    <div id="_contactWindowSearchButton" class="contactWindow__searchButton _cwBN button" role="button">
                        Search
                    </div>
                    <div class="btnCheckGroup" style="display: none;">
                        <div id="_contactWindowCheckAllButton" class="_button btnLarge btnDisable _cwBN button"
                             role="button" aria-disabled="true"><span role="checkbox" aria-checked="false"
                                                                      type="checkbox" id="_contactWindowCheckAll"
                                                                      class="_cwCB _cwCBUnchecked ico15Checkbox _checkBox disabled"><input
                                type="hidden" value="on"></span>Check All
                        </div>
                        <div id="_contactWindowCheckActionArea" style="display:inline">
                            <div id="_contactWindowAdd"
                                 class="_contactWindowNavigationItem _button btnLarge btnDisable _cwBN button"
                                 style="display: inline-block;" role="button" aria-disabled="true">Send Invitation
                            </div>
                            <div id="_contactWindowDelete"
                                 class="_contactWindowNavigationItem _button btnLarge btnDisable _cwBN button"
                                 style="display:none" role="button" aria-disabled="true">Delete from your contact
                            </div>
                            <div id="_contactWindowCancel"
                                 class="_contactWindowNavigationItem _button btnLarge btnDisable _cwBN button"
                                 style="display:none" role="button" aria-disabled="true">Cancel request
                            </div>
                            <div id="_contactWindowAccept"
                                 class="_contactWindowNavigationItem _button btnLarge btnDisable _cwBN button"
                                 style="display:none" role="button" aria-disabled="true">Accept
                            </div>
                        </div>
                    </div>
                    <div class="contactWindowPagerContainer">
                        <p id="_contactWindowPagerIndex" class="contactWindowPagerContainer__index"></p>
                        <ul id="_contactWindowPager"
                            class="cwTextUnselectable btnNavList fileWindowPagerContainer__pager _cwBB" role="menu">
                            <li role="menuitemradio" class="_cwBBButton button btnDisable" data-cwui-bb-idx="0"
                                aria-disabled="true">
       <span class="contactWindowPagerContainer__pagerIconContainer">
         <svg viewBox="0 0 10 10" class="contactWindowPagerContainer__pagerIcon" width="16" height="16">
          <use fill-rule="evenodd" xlink:href="#icon_arrowDoubleLeft">
        </use></svg>
       </span>
                                <span class="icoTextHide">Go to first page</span>
                            </li>
                            <li role="menuitemradio" class="_cwBBButton button btnDisable" data-cwui-bb-idx="1"
                                aria-disabled="true">
       <span class="contactWindowPagerContainer__pagerIconContainer">
         <svg viewBox="0 0 10 10" class="contactWindowPagerContainer__pagerIcon" width="16" height="16">
          <use fill-rule="evenodd" xlink:href="#icon_triangleLeft">
        </use></svg>
       </span>
                                <span class="icoTextHide">Back to previous page</span>
                            </li>
                            <li role="menuitemradio" class="_cwBBButton button btnDisable" data-cwui-bb-idx="2"
                                aria-disabled="true">
       <span class="contactWindowPagerContainer__pagerIconContainer">
         <svg viewBox="0 0 10 10" class="contactWindowPagerContainer__pagerIcon" width="16" height="16">
          <use fill-rule="evenodd" xlink:href="#icon_triangleRight">
        </use></svg>
       </span>
                                <span class="icoTextHide">Go to next page</span>
                            </li>
                            <li role="menuitemradio" class="_cwBBButton button btnDisable" data-cwui-bb-idx="3"
                                aria-disabled="true">
       <span class="contactWindowPagerContainer__pagerIconContainer">
         <svg viewBox="0 0 10 10" class="contactWindowPagerContainer__pagerIcon" width="16" height="16">
          <use fill-rule="evenodd" xlink:href="#icon_arrowDoubleRight">
        </use></svg>
       </span>
                                <span class="icoTextHide">Go to last page</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="_cwFWContent" v-bind:style="{height: cwFWContentHeight}">
                <div class="adminWindowAllList">
                    <div id="_contactInviteMailArea" class="contactInviteMailArea" v-bind:style="{display: contentInviteMailNew.display}">
                        <div v-bind:id="contentInviteMailNew.id" v-bind:class="contentInviteMailNew.class"
                             v-bind:style="{display: contentInviteMailNew.display}">
                            <div id="_contactInviteMailIndividual" class="contactInviteMailSection"
                                 v-bind:style="{display: individualAdd}">
                                <div :class="contactInviteErrorMessage.class"
                                     :style="{display: contactInviteErrorMessage.display}"
                                     v-text="contactInviteErrorMessage.message"></div>
                                <label class="contactInviteMailLabel">Email Address</label>
                                <ul id="_contactInviteMailList" class="contactInviteMailList">
                                    <li class="_mailAddressInput contactInviteMailList__item"
                                        v-for="(itemEmail, index) in itemEmails" :key="index">
                                        <input type="email" name="email" placeholder="Enter email address"
                                               @input="onChangeEmail(itemEmail, index)" v-model="itemEmail.text">
                                        <span class="_cwFWButton _mailAddressInputCancel contactInviteMailList__cancelButton"
                                              v-bind:style="{display: itemEmail.displayCloseIcon}"
                                              @click="cancelEmailInput(itemEmail, index)">
                                          <svg viewBox="0 0 10 10" class="invitationLinkEditorCancel__icon" width="16"
                                               height="16">
                                            <use fill-rule="evenodd" xlink:href="#icon_cancel">
                                                <svg viewBox="0 0 10 10" id="icon_cancel"
                                                     xmlns="http://www.w3.org/2000/svg"><path
                                                        d="M6.831 2.5L4.997 4.335 3.163 2.5l-.663.663 1.834 1.834L2.5 6.831l.663.663L4.997 5.66l1.834 1.834.663-.663-1.835-1.834 1.835-1.834z"></path></svg>
                                            </use>
                                          </svg>
                                        </span>
                                    </li>
                                </ul>
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
                                <div :class="contactInviteErrorMessage.class"
                                     :style="{display: contactInviteErrorMessage.display}"
                                     v-text="contactInviteErrorMessage.message"></div>
                                <label class="contactInviteMailLabel">Enter an e-mail address per line.</label>
                                <textarea v-bind:id="textareas.bulkEmails.id" v-bind:name="textareas.bulkEmails.name"
                                          v-bind:placeholder="textareas.bulkEmails.placeholder"
                                          v-model="textareas.bulkEmails.text"></textarea>
                                <a href="#" class="changeFormIndividual" @click="toggleMailInvite">Add members
                                    individually</a>
                            </div>
                            <div class="contactInviteMailSection">
                                <label class="contactInviteMailLabel">Message (optional)</label>
                                <textarea v-bind:id="textareas.message.id" v-bind:name="textareas.message.name"
                                          v-bind:placeholder="textareas.message.placeholder"
                                          v-model="textareas.message.text"></textarea>
                            </div>
                        </div>
                        <div id="_contentInviteMailFinished" class="contactInviteMailContent"
                             v-bind:style="{display: showResultData.display}">
                            <div class="contactInviteMailSection">
                                <p v-for="(item, index) in contactInviteMailSection" :key="index" v-bind:class="item.class"
                                   v-bind:style="{display: item.display}">{{item.text}}</p>
                            </div>
                            <div v-bind:key="content.key"
                                 v-bind:id="content.id" v-bind:class="content.class"
                                 v-bind:style="{display: content.display}"
                                 v-for="(content) in contentInviteMailFinished">
                                <p v-bind:class="content.classChild">{{content.text}}</p>
                                <ul v-for="(emailData, index) in content.data" :key="index" class="contactInviteMailResultList">
                                    {{emailData}}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div id="_contactWindowBox" class="adminAllListArea"  v-bind:style="{display: contentAddContact.display}">
<!--                        <add-contact></add-contact>-->
                        <list-contact v-bind:type="'AddContact'" :evebtChangeTabEvent="changeTabEvent"></list-contact>
                    </div>

                    <div id="_contactWindowListContact" class="adminAllListArea"  v-bind:style="{display: contentListContact.display}">
                        <list-contact v-bind:type="'MyContact'"></list-contact>
                    </div>

                    <div id="_contactWindowWaitForAccpet" class="adminAllListArea"  v-bind:style="{display: contentWaitForAccpet.display}">
                        <list-wait-accept :evebtChangeTabEvent="changeTabEvent"></list-wait-accept>
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

            <div class="_cwFWFooter contactInviteMailFooter">
                <div v-bind:key="buttons.send.key" v-bind:class="buttons.send.class" v-bind:role="buttons.send.role"
                     v-bind:style="{display: buttons.send.display}"
                     @click="postInviteByEmail">{{buttons.send.text}}
                </div>
                <div v-bind:key="buttons.inviteMore.key" v-bind:class="buttons.inviteMore.class"
                     v-bind:role="buttons.inviteMore.role" v-bind:style="{display: buttons.inviteMore.display}"
                     @click="inviteMoreClick">{{buttons.inviteMore.text}}
                </div>
            </div>
            <div style="display:none" class="_cwFWButtonFooter floatWindow__footer"></div>
        </div>
    </div>
</template>


<script>
    import {API} from '../../services/api';
    import {ApiConst} from '../../common/ApiConst';
    import Search from '../contact/tabs/Search'
    import AddContact from '../contact/tabs/AddContact'
    import ListContact from '../contact/tabs/ListContact'
    import ListWaitAccept from '../contact/tabs/ListWaitAccept'

    export default {
        name: "Contact",
        components: {
            Search,
            AddContact,
            ListContact,
            ListWaitAccept
        },
        data() {
            return {
                changeTabEvent:1,
                isHidden: true,
                displayCloseIcon: 'none',
                individualAdd: 'block',
                floatWindowHeight: '0px',
                cwFWContentHeight: '0px',
                bulkAdd: 'none',
                marginPopup: '0px',
                emailInput: '',
                itemEmails: [
                    {id: 'itemEmail1', text: '', displayCloseIcon: 'none'},
                ],
                tabIndex: 0,
                contactTabs: [
                    {
                        id: '_contactWindowTabInviteEmail',
                        text: 'Invite by Email',
                        subtext: '',
                        display: 'block',
                        number: 0,
                        dataType: 'invitemail'
                    },
                    {
                        id: '_contactWindowTabContact',
                        text: 'User Search',
                        subtext: '',
                        display: 'block',
                        number: 0,
                        dataType: 'addcontact'
                    },
                    {
                        id: '_contactWindowTabMyContact',
                        text: 'Contacts',
                        subtext: '',
                        display: 'block',
                        number: 0,
                        dataType: 'contact'
                    },
                    {
                        id: '_contactWindowTabWaitForAccept',
                        text: 'Approve',
                        subtext: '',
                        display: 'block',
                        number: 0,
                        dataType: 'waitforaccept'
                    },                    {
                        id: '_contactWindowTabMyRequest',
                        text: 'Approve',
                        subtext: '',
                        display: 'none',
                        number: 0,
                        dataType: 'myrequest'
                    },
                    {
                        id: '_contactWindowTabRequest',
                        text: 'Incoming Requests',
                        subtext: '',
                        display: 'none',
                        number: 0,
                        dataType: 'request'
                    },
                ],
                contactInviteMailSection:
                    [
                        {text: 'Invitation was sent successfully.', class: 'alert alertSuccess', display: 'none'},
                        {
                            text: 'Invitation wasn\'t sent due to the following reasons.',
                            class: 'alert alertDanger',
                            display: 'none'
                        }
                    ],
                showResultData: {display: 'none'},
                contentInviteMailFinished: [
                    {
                        key: 'SentEmails',
                        id: '_contactInviteMailSentEmails',
                        text: 'Invitation sent',
                        display: 'none',
                        class: 'contactInviteMailResult',
                        classChild: 'contactInviteMailResultTitle mailResultTitleSuccess',
                        data: []
                    }
                ],
                contactInviteErrorMessage: {
                    id: 'inviteErrorAlert',
                    class: 'contactInviteErrorMessage alert alertDanger',
                    message: 'Type the email addresses of members to invite',
                    display: 'none'
                },
                contentInviteMailNew: {
                    id: '_contentInviteMailNew',
                    class: 'contactInviteMailContent',
                    display: 'block'
                },
                contentAddContact: {
                    id: '_contentAddContact',
                    class: 'contentAddContactContent',
                    display: 'none'
                },
                contentListContact: {
                    id: '_contentListContact',
                    class: 'contentListContactContent',
                    display: 'none'
                },
                contentWaitForAccpet: {
                    id: '_contentWaitForAccpet',
                    class: 'contentWaitForAccpetContent',
                    display: 'none'
                },
                sampleResult:
                    {
                        error_code: 0,
                        error_msg: 'sample message',
                        data: {
                            emails_invited: [
                                'bao_trung@lampart-vn.com',
                                'tuan_vu@lampart-vn.com',
                                'cong_chi@lampart-vn.com'
                            ],
                            emails_invalid: [
                                'trong_nho@123-á',
                                'sy_hung@xvideo-s123'
                            ]
                        }
                    },
                buttons: {
                    send: {
                        key: 'sendButton',
                        id: '_contactInviteMail',
                        class: '_button btnPrimary btnLarge _cwBN button',
                        role: 'button',
                        text: 'Send',
                        display: 'inline-block'
                    },
                    inviteMore: {
                        key: 'inviteMoreButton',
                        id: '_contactOtherInviteMail',
                        class: '_button btnLarge _cwBN button',
                        role: 'button',
                        text: 'Invite more',
                        display: 'none'
                    }
                },
                textareas: {
                    message: {
                        key: 'textareaMessage',
                        id: '_addFromEmailContent',
                        text: '',
                        class: '',
                        name: 'message',
                        placeholder: 'Type a message'
                    },
                    bulkEmails: {
                        key: 'bulkEmails',
                        id: '_addFromEmailContentEmails',
                        text: '',
                        class: '',
                        name: 'emails',
                        placeholder: 'Enter an e-mail address per line.'
                    }
                }
            }
        },
        created() {
            window.addEventListener('resize', this.handleResizePopup)
            this.handleResizePopup();
        },
        methods: {
            changeTab(index){
                this.changeTabEvent = Math.random();
                // Set index of tab
                this.tabIndex = index

                // switch tab
                switch (index) {
                    case 0:
                        this.contentInviteMailNew.display = 'block';
                        this.buttons.send.display = 'inline-block';
                        this.buttons.inviteMore.display = 'none';

                        this.contentAddContact.display = 'none';
                        this.contentListContact.display = 'none';
                        this.contentWaitForAccpet.display = 'none';
                        break;
                    case 1:
                        this.contentInviteMailNew.display = 'none';
                        this.buttons.send.display = 'none';
                        this.buttons.inviteMore.display = 'none';
                        this.contentAddContact.display = 'block';
                        this.contentListContact.display = 'none';
                        this.contentWaitForAccpet.display = 'none';
                        break;
                    case 2:
                        this.contentInviteMailNew.display = 'none';
                        this.buttons.send.display = 'none';
                        this.buttons.inviteMore.display = 'none';
                        this.contentAddContact.display = 'none';
                        this.contentListContact.display = 'block';
                        this.contentWaitForAccpet.display = 'none';
                        break;
                    case 3:
                        this.contentInviteMailNew.display = 'none';
                        this.buttons.send.display = 'none';
                        this.buttons.inviteMore.display = 'none';
                        this.contentAddContact.display = 'none';
                        this.contentListContact.display = 'none';
                        this.contentWaitForAccpet.display = 'block';
                        break;

                }
            },
            linkClass(index) {
                if (this.tabIndex === index) {
                    return ['floatTabSelect'];
                } else {
                    return [''];
                }
            },
            handleResizePopup() {
                this.marginPopup = (window.innerWidth*0.15) + 'px';
                this.floatWindowHeight = window.innerHeight - 45 + 'px';
                this.cwFWContentHeight = window.innerHeight - 176 + 'px';
                console.log(this.cwFWContentHeight);
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
            inviteMoreClick() {
                this.showResultData.display = 'none';
                this.buttons.send.display = 'inline-block';
                this.buttons.inviteMore.display = 'none';
                this.contentInviteMailNew.display = 'block';
                this.textareas.message.text = '';
                this.itemEmails = [{id: 'itemEmail1', text: '', displayCloseIcon: 'none'}];
                this.contentInviteMailFinished = [];
            },
            appendToErrList(object) {
                this.contentInviteMailFinished = this.contentInviteMailFinished.concat(object);
            },
            postInviteByEmail() {
                /**
                 * Client validation
                 **/
                let hasError = false;
                let emails = [];
                if (this.bulkAdd === 'block') {
                    emails = this.textareas.bulkEmails.text.split('\n');
                } else {
                    for (let i = 0; i < this.itemEmails.length; i++) {
                        if (this.itemEmails[i].text === '') {
                            hasError = true;
                            break;
                        }
                        emails.push(this.itemEmails[i].text);
                    }
                }

                if (hasError || emails.length < 1) {
                    this.contactInviteErrorMessage.display = 'block';
                } else {
                    this.contactInviteErrorMessage.display = 'none';
                    /**
                     * Call API
                     */
                    let requestData = {
                        emails: emails,
                        message: this.textareas.message.text
                    };
                    API.POST(ApiConst.INVITE_BY_EMAILS, requestData).then(response => {

                        console.log(JSON.stringify(response));
                        /**
                         * Check data response
                         */
                        this.showResultData.display = 'block';
                        this.buttons.send.display = 'none';
                        this.buttons.inviteMore.display = 'inline-block';
                        this.contentInviteMailNew.display = 'block';

                        if (response.error_code === 0) {
                            this.contactInviteMailSection[0].display = 'block';
                            this.contactInviteMailSection[1].display = 'none';
                            this.contentInviteMailFinished.push({
                                key: 'SentEmails',
                                id: '_contactInviteMailSentEmails',
                                text: 'Invitation sent',
                                display: 'block',
                                class: 'contactInviteMailResult',
                                classChild: 'contactInviteMailResultTitle mailResultTitleSuccess',
                                data: response.data.emails
                            });
                        } else {
                            this.contactInviteMailSection[1].display = 'block';
                            this.contactInviteMailSection[0].display = 'none';
                            var arr = Object.keys(response.data);
                            var errList = [];
                            arr.forEach(function (key, index) {
                                var temp = key.split('.');
                                console.log(response.data[key]);
                                var tempData = response.data[key];
                                tempData.forEach(function (k, index) {
                                    tempData[index] = tempData[index].replace(key, emails[temp[1]]);
                                });
                                let error = {
                                    key: 'UnreachableEmailAddresses',
                                    id: '_contactInviteMailUnreachableEmailAddresses',
                                    text: emails[temp[1]],
                                    display: 'block',
                                    class: 'contactInviteMailResult',
                                    classChild: 'contactInviteMailResultTitle mailResultTitleFailed',
                                    data: tempData
                                };
                                errList.push(error);
                            });
                            this.appendToErrList(errList);
                        }
                    })
                }
            }
        }
    };
</script>

<style scoped>

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
        height: 50px;
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
        left: 0;
        width: 100%;
        border-top: 1px solid #cccccc;
        background: #f0f0f0 linear-gradient(to bottom, #e6e6e6, #fff) repeat-x;
        text-align: center;
        padding: 10px 0;
        height: 50px;
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

    .alert {
        text-align: center;
        background: #fff;
        padding: 5px 10px;
        border: 1px solid #999;
        border-radius: 3px;
        margin-bottom: 20px;
    }

    .alertDanger {
        color: #dd0900;
        border-color: #f9423a;
        background-color: #fbefee;
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

    a:hover {
        text-decoration: underline;
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

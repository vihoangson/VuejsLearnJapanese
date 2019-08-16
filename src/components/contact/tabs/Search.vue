<template>
    <div id="_contactWindowNavigation" class="adminNavigation" style="display: block;">
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
            <input type="text" id="_contactWindowSearch" class="inputLong _cwSB searchBox" role="search" placeholder="Enter name, Chatwork ID, email address here">
        </div>
        <div id="_contactWindowSearchButton" class="contactWindow__searchButton _cwBN button" role="button">Search</div>
        <div class="btnCheckGroup" style="display: none;">
            <div id="_contactWindowCheckAllButton" class="_button btnLarge btnDisable _cwBN button" role="button" aria-disabled="true"><span role="checkbox" aria-checked="false" type="checkbox" id="_contactWindowCheckAll" class="_cwCB _cwCBUnchecked ico15Checkbox _checkBox disabled"><input
                    type="hidden" value="on"></span>Check All
            </div>
            <div id="_contactWindowCheckActionArea" style="display:inline">
                <div id="_contactWindowAdd" class="_contactWindowNavigationItem _button btnLarge btnDisable _cwBN button" style="display: inline-block;" role="button" aria-disabled="true">Send Invitation
                </div>
                <div id="_contactWindowDelete" class="_contactWindowNavigationItem _button btnLarge btnDisable _cwBN button" style="display:none" role="button" aria-disabled="true">Delete from your contact
                </div>
                <div id="_contactWindowCancel" class="_contactWindowNavigationItem _button btnLarge btnDisable _cwBN button" style="display:none" role="button" aria-disabled="true">Cancel request
                </div>
                <div id="_contactWindowAccept" class="_contactWindowNavigationItem _button btnLarge btnDisable _cwBN button" style="display:none" role="button" aria-disabled="true">Accept
                </div>
            </div>
        </div>
        <div class="contactWindowPagerContainer">
            <p id="_contactWindowPagerIndex" class="contactWindowPagerContainer__index"></p>
            <ul id="_contactWindowPager" class="cwTextUnselectable btnNavList fileWindowPagerContainer__pager _cwBB" role="menu">
                <li role="menuitemradio" class="_cwBBButton button btnDisable" data-cwui-bb-idx="0" aria-disabled="true">
                <span class="contactWindowPagerContainer__pagerIconContainer">
                 <svg viewBox="0 0 10 10" class="contactWindowPagerContainer__pagerIcon" width="16" height="16">
                  <use fill-rule="evenodd" xlink:href="#icon_arrowDoubleLeft"></use>
                 </svg>
                </span>
                    <span class="icoTextHide">Go to first page</span>
                </li>
                <li role="menuitemradio" class="_cwBBButton button btnDisable" data-cwui-bb-idx="1" aria-disabled="true">
                <span class="contactWindowPagerContainer__pagerIconContainer">
         <svg viewBox="0 0 10 10" class="contactWindowPagerContainer__pagerIcon" width="16" height="16">
          <use fill-rule="evenodd" xlink:href="#icon_triangleLeft">
        </use></svg>
       </span>
                    <span class="icoTextHide">Back to previous page</span>
                </li>
                <li role="menuitemradio" class="_cwBBButton button btnDisable" data-cwui-bb-idx="2" aria-disabled="true">
                <span class="contactWindowPagerContainer__pagerIconContainer">
         <svg viewBox="0 0 10 10" class="contactWindowPagerContainer__pagerIcon" width="16" height="16">
          <use fill-rule="evenodd" xlink:href="#icon_triangleRight">
        </use></svg>
       </span>
                    <span class="icoTextHide">Go to next page</span>
                </li>
                <li role="menuitemradio" class="_cwBBButton button btnDisable" data-cwui-bb-idx="3" aria-disabled="true">
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
</template>

<script>
    export default {
        name: "search.vue"
    }
</script>

<style scoped>

</style>
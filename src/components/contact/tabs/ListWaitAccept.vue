<template>
    <div id="_contactWindowNavigation" class="adminNavigation" style="display: block;">
        <ul id="_contactWindowList" class="contactList">
            <div class="adminAllListArea__emptyContainer">
                <form @submit="addContact" class="box-input-search-contact">
                    <input type="text" v-model="contactName" />
                    <button type="submit">Search</button>
                </form>
                <div class="adminNavigation">
                    <div v-for="(item, index) in listContact" :key="index">
                        <box-contact v-bind:item="item"></box-contact>
                    </div>
                </div>
            </div>
        </ul>
    </div>
</template>

<script>
import { API } from '../../../services/api';
import { ApiConst } from '../../../common/ApiConst';
import BoxContact from '../elements/BoxContact';
export default {
    name: 'ListWaitAccept.vue',
    components: { BoxContact },
    data() {
        return {
            contactName: '',
            listContact: []
        };
    },
    props:["evebtChangeTabEvent"],
    watch:{
        evebtChangeTabEvent (value){
            this.searchContact();
        }
    },
    mounted() {
        this.searchContact();
    },
    component: {
        BoxContact
    },
    methods: {
        searchContact() {
            // Prepare data for api
            let requestData = {
                query: this.contactName,
                options: 2
            };


            API.POST(ApiConst.SEARCH_CONTACT, requestData).then(response => {

                if (response.error_code === 0) {

                    let contacts = response.data.rows;

                    this.listContact = [];

                    // push data to list
                    contacts.forEach(x => {
                        // contact_status:2 => wait for accept
                        if ( x.contact_status === 2) {
                            this.listContact.push(x);
                        }
                    });
                    if(this.listContact.length !== 0){
                        this.$parent.contactTabs.find((e)=>{return e.id === '_contactWindowTabWaitForAccept'}).subtext  =' ('+this.listContact.length+')';
                    }
                }else{
                    this.$root.$emit('push-notice', {
                        message: 'Can\'t search',
                        alert: 'alert-danger'
                    });
                }
            });
        },
        addContact(e) {
            e.preventDefault();
            this.searchContact();
        }
    }
};
</script>

<style scoped>
.adminNavigation {
    overflow: overlay;
    height: 570px;
}
</style>

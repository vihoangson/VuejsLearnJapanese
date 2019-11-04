<template>
    <div id="_contactWindowNavigation" class="adminNavigation" style="display: block;">
        <ul id="_contactWindowList" class="contactList">
            <div class="adminAllListArea__emptyContainer">
                <form @submit="addContact" class="box-input-search-contact">
                    <input type="text" v-model="contactName" />
                    <button type="submit">Search</button>
                    <button type="button" class="" style="background: #ccc;border-color: #ccc;" @click="resetSearch">Cancel</button>
                </form>
                <div class="adminNavigation">
                    <div v-for="(item, index) in listContact" :key="index">
                        <box-contact v-if="item.id !== $store.getters.get_current_user_info.id" v-bind:item="item"></box-contact>
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
    name: 'AddContact.vue',
    components: { BoxContact },
    props:["type","evebtChangeTabEvent"],
    data() {
        return {
            contactName: '',
            listContact: []
        };
    },
    component: {
        BoxContact
    },
    watch:{
        evebtChangeTabEvent (value){
            this.setInitValue();
        }
    },
    mounted() {
        this.setInitValue();
    },
    methods: {
        setInitValue(){


            let valueDefault = this.searchContact()
            this.$store.dispatch('setMyContact',valueDefault);
            this.listContact = valueDefault;
        },
        resetSearch(e){
            e.preventDefault();
            this.contactName = "";
            this.listContact = this.searchContact();
        },
        addContact(e) {
            e.preventDefault();
            this.listContact = this.searchContact();
        },
        searchContact() {
            let optionsApi = null;
            if(this.type === 'AddContact'){
                optionsApi = 0;
            }else{
                optionsApi = 1;
            }
            let requestData = {
                query: this.contactName,
                options: optionsApi
            };
            var tmpList = [];
            API.POST(ApiConst.SEARCH_CONTACT, requestData).then(response => {
                if (response.error_code === 0) {
                    let contacts = response.data.rows;
                    contacts.forEach(x => {
                        tmpList.push(x);
                    });
                }
            });
            return tmpList;
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

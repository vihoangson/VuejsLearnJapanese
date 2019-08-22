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
    name: 'AddContact.vue',
    components: { BoxContact },
    data() {
        return {
            contactName: '',
            listContact: []
        };
    },
    mounted() {
        this.searchContact();
    },
    component: {
        BoxContact
    },
    methods: {
        addContact(e) {
            e.preventDefault();
            this.searchContact();
        },
        searchContact() {
            let requestData = {
                query: this.contactName,
                options: 1
            };
            API.POST(ApiConst.SEARCH_CONTACT, requestData).then(response => {
                if (response.error_code === 0) {
                    let contacts = response.data.rows;
                    this.listContact = [];
                    contacts.forEach(x => {
                        if (x.contact_status === 1) {
                            this.listContact.push(x);
                        }
                    });
                }
            });
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
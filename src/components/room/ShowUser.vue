<template>
    <div class="modal-group">
        <b-modal
            id="modal-prevent-show-user"
            ref="modal"
            size="lg"
            title="Add user to room"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <div class="row">
                <div class="col-md-12">
                    <div class="">Admin({{listAdmin.length}})</div>
                    <div class="list-icon">
                        <img  v-for="(item, index) in listAdmin" :key="index" :src="item.icon_img" alt class="avatar" />
                    </div>

                    <div class="">Member({{listMember.length}})</div>
                    <div class="list-icon">
                        <img  v-for="(item, index) in listMember" :key="index" :src="item.icon_img" alt class="avatar" />
                    </div>

                    <div class="">ReadOnly({{listReadOnly.length}})</div>
                    <div class="list-icon">
                        <img  v-for="(item, index) in listReadOnly" :key="index" :src="item.icon_img" alt class="avatar" />
                    </div>
                </div>
                <div class="col-md-12">
                    <span class="icon_edit" v-if="this.$store.getters.get_is_admin_room" @click="openModalEditUserRoom()" >
                        <svg viewBox="0 0 10 10" id="icon_edit" xmlns="http://www.w3.org/2000/svg"><path d="M4.33 7.432L2.566 5.661 7.322.917a.469.469 0 0 1 .663.001l1.103 1.107a.47.47 0 0 1-.001.663L4.331 7.432zM1.462 8.537l.554-2.097L3.56 7.989l-2.098.548z"></path></svg> Edit Member
                    </span>
                </div>
            </div>
            <div slot="modal-footer" class="w-100">
                <b-button variant="outline-secondary" size="md" @click="btnCancel">Cancel</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'Group',
    data() {
        return {
            roomId : 0,
            items : [],
            listAdmin : [],
            listMember : [],
            listReadOnly : [],
        };
    },
    mounted() {
        this.$root.$on('open-modal-show-user', () => {
            this.roomId = this.$store.getters.get_current_room.room_id;
            this.items = this.$store.getters.get_list_user_by_room_id;
            this.listAdmin = [];
            this.listMember = [];
            this.listReadOnly = [];
            console.log(this.$store.getters.get_list_user_by_room_id);
            for (let i in this.$store.getters.get_list_user_by_room_id) {
                if(this.items[i].role_in_room === 1){
                    this.listAdmin.push(this.items[i]);
                }else
                if(this.items[i].role_in_room === 0){
                    this.listMember.push(this.items[i]);
                }else
                if(this.items[i].role_in_room === 2){
                    this.listReadOnly.push(this.items[i]);
                }
            }
        });
    },
    created: function() {
    },
    computed: {},
    methods: {
        openModalEditUserRoom(){
            this.$refs.modal.hide();
            this.$root.$emit('open-modal-edit-user');
            this.$bvModal.show('modal-prevent-edit-user');
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.handleSubmit();
        },
        btnCancel() {
            this.$refs.modal.hide();
        },
    }
};
</script>

<style>
.list-icon img {
    width: 30px;
    border-radius: 50%;
    border: 1px #eee solid;
    height: 30px;
    margin-right: 5px;
}
.list-icon{
    width: 100%;
    display: inline-block;
    margin: 15px 0;
    margin-bottom: 30px;
}
.icon_edit svg{
    height: 15px;
    width: 15px;
}
</style>

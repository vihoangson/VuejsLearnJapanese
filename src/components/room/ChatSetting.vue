<template>
    <div class="modal-group">
        <b-modal
            id="modal-prevent-setting-group"
            ref="modal"
            size="lg"
            title="Group Chat Setting"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <div class="row">
                <div class="col-md-12">
                        <b-tabs content-class="mt-3">
                            <b-tab title="Mute" active>
                                <form id="">
                                    <fieldset>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <span class="roomText">
                                                        Mute
                                                    </span>
                                                    <a href="https://chatworken.zendesk.com/hc/en-us/articles/115002982686" >
                                                        <svg class="roomMute" viewBox="0 0 10 10" width="16" height="16">
                                                            <use fill-rule="evenodd" xlink:href="#icon_help"></use>
                                                        </svg>
                                                    </a>
                                                    <span class="roomSeparator">:</span>
                                                </div>
                                                <div class="col-md-10">
                                                    <span><input type="checkbox" /></span>
                                                    <span class="roomDescription">
                                                        Muting prevents all unread indicators and notifications from appearing unless you are mentioned.<br>All group chats you muted will be listed in [Muted Chats] under the category.
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </b-tab>
                        </b-tabs>
                </div>
            </div>
            <div slot="modal-footer" class="w-100">
                <b-button variant="outline-secondary" size="md" @click="btnSaveSetting">Save</b-button>
                <b-button variant="outline-secondary" size="md" @click="btnCancel"> Cancel </b-button>
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
        this.$root.$on('open-modal-setting-group', () => {
           
        });
    },
    created: function() {
    },
    computed: {
    },
    methods: {
        btnSaveSetting() {
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

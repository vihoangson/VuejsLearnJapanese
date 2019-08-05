<template>
    <div class="modal-group">
        <b-modal
            id="modal-prevent-show-user"
            ref="modal"
            size= "lg"
            title="Add user to room"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk">
            <form ref="form" class="form-rooms">
                <div class="row">
                    <div class="col-md-12">
                       
                    </div>
                </div>
            </form>
            <div slot="modal-footer" class="w-100">
                <b-button variant="outline-secondary"
                :disabled="!(selected.length > 0) || disableButton"
                size="md" @click="btnUpdateRoom"> Ok </b-button>
                <b-button variant="outline-secondary" size="md" @click="btnCancel"> Cancel </b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import { API } from '../../services/api';
    import { ApiConst } from '../../common/ApiConst';
    import { AppConst } from '../../common/AppConst';
    export default {
        name: "Group",
        data() {
            return {
                roomId: 0,
            }
        },
        mounted() {
        },
        created: function(){
            let user = JSON.parse(localStorage.getItem(AppConst.LOCAL_USER));
            this.userId = user.user_id;
        },
        computed: {
        },
        methods: {
        }
    }
</script>

<style>
</style>

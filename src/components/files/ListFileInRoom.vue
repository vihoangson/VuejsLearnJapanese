<template>
    <div>
        <i class="fa fa-spin fa-refresh" v-if="isLoading"></i>
        <span class="icon-file-all" @click="toggleListFile">
            <svg viewBox="0 0 10 10" id="icon_menuFile" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M.417.417v2.5h9.167v-1.25H4.167L2.917.417h-2.5zM0 3.75l.417 5.833h9.167l.417-5.833h-10zm.781.73h8.438l-.313 4.375H1.093L.78 4.48z"
                />
            </svg>
        </span>
        <div class="list-file">
            <div ref="listFile" class="dropdown-content popup" style="display: none">
                <div v-if="errorMessage.length > 0" class="alert alert-danger">{{errorMessage}}</div>
                <div v-for="(file, index) in ListFiles" :key="index">
                    <show-file :file="file"></show-file>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { API } from '../../services/api';
import { ApiConst } from '../../common/ApiConst';

import showFile from './showFile';

export default {
    name: 'ListFileInRoom',

    data() {
        return {
            isLoading: false,
            showListFile: false,
            isActive: false,
            isActiveSelect: false,
            ListFiles: [],
            errorMessage: []
        };
    },
    created: function() {
        // document.addEventListener('click', this.documentClick);
    },
    destroyed() {
        // document.removeEventListener('click', this.documentClick);
    },
    components: {
        showFile
    },
    methods: {
        documentClick(e) {
            let el2 = this.$refs.toggleOption;
            let target = e.target;
            if (el2 !== target && !el2.contains(target)) {
                this.showListFile = false;
            }
        },
        toggleListFile() {
            this.getFileInApi();
        },
        getFileInApi() {
            this.isLoading = true;
            this.ListFiles = [];
            this.errorMessage = '';
            API.GET(
                ApiConst.MY_LIST_FILE +
                    '/' +
                    this.$store.getters.get_current_room.room_id
            ).then(res => {
                this.isLoading = false;
                if (res.error_code === 0 && res.data.length > 0) {
                    this.ListFiles = res.data;
                } else {
                    this.errorMessage = "Don't have any file";
                }
                this.$refs.listFile.style.display = 'block';
            });
        }
    }
};
</script>

<style>
.list-file {
    position: relative;
}
.show-file button.btn.btn-success {
    position: absolute;
    top: 26px;
    right: 17px;
}
.list-file .alert.alert-danger {
    margin-top: 50px;
}
</style>

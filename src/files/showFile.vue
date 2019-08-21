<template>
    <div class="show-file">
        <!--<div>file_extension: {{file.file_extension}}</div>-->
        <!--<div @click="downloadFile(file.id)">Id: {{file.id}}</div>-->
        <div class="filename">{{file.file_name}}</div>
        <!--<div>created_at: {{file.created_at}}</div>-->
        <div class="toolbox">
            <button class="btn btn-sm btn-default" @click="downloadFile(file.id)" type="button"><i class="fa fa-download"></i></button>
            <button class="btn btn-sm btn-default" @click="deleteFile(file.id)" v-if="file.user_id == $store.getters.get_current_user_info.id" type="button"><i class="fa fa-trash"></i></button>
        </div>
        <!--<div>file_name_storage: {{file.file_name_storage}}</div>-->
        <!--<div>file_size: {{file.file_size}}</div>-->
        <!--<div>file_storage_type: {{file.file_storage_type}}</div>-->
        <!--<div>message_id: {{file.message_id}}</div>-->
        <!--<div>path: {{file.path}}</div>-->
        <!--<div>room_id: {{file.room_id}}</div>-->
        <!--<div>updated_at: {{file.updated_at}}</div>-->
        <!--<div>user_id: {{file.user_id}}</div>-->
    </div>
</template>

<script>


    import { API } from '../services/api';
    import { ApiConst } from '../common/ApiConst';

    export default {
        name: 'showFile',
        data() {
            return {
                showListFile:false,
                isActive: false,
                isActiveSelect: false,
                ListFiles :[]
            };
        },
        props:['file'],
        created: function() {
        },
        destroyed() {
        },
        components:["ListFileInRoom"],
        methods: {
            downloadFile(id) {
                API.GET(ApiConst.GET_LINK_DOWNLOAD_FILE + '/' + id).then(res => {
                    window.open(
                        process.env.ROOT_API +
                        ApiConst.DOWNLOAD_FILE +
                        '/' +
                        id +
                        '/' +
                        res.data.token_file +
                        '/' +
                        res.data.user_id
                    );
                });
            },
            deleteFile(id) {
                this.$bvModal
                    .msgBoxConfirm('Do you really want to delete file ?', {
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'success',
                        centered: true
                    })
                    .then(value => {
                        if(value === true){
                            let obj = {
                                delete_id: id
                            };
                            API.POST(ApiConst.DELETE_FILE, obj).then(res => {
                                this.showListFile = !this.showListFile;
                                // this.showMyListFile();
                            });
                        }

                    })
                    .catch(err => {
                        this.$root.$emit('push-notice', {
                            message: 'Open model error',
                            alert: 'alert-danger'
                        });
                    });
            },
        }
    };
</script>

<style>

    div.filename {
        width: 247px;
        overflow-wrap: inherit;
        -ms-flex-wrap: unset;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-wrap: unset;
        white-space: nowrap;
    }
    .toolbox{
        position:absolute;
        top:7px;
        right:6px;

    }
    .show-file {
        padding: 10px;
    }
    .show-file {
        border-top: 1px solid #ccc;
        position: relative;
    }
</style>

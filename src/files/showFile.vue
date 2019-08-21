<template>
    <div class="show-file">
        <!--<div>file_extension: {{file.file_extension}}</div>-->

        <div @click="downloadFile(file.id)">Id: {{file.id}}</div>
        <div>File_name: {{file.file_name}}</div>
        <div>created_at: {{file.created_at}}</div>
        <button class="btn btn-success" @click="downloadFile(file.id)" type="button">Download</button>
        <!--<div>file_name_storage: {{file.file_name_storage}}</div>-->
        <!--<div>file_size: {{file.file_size}}</div>-->
        <!--<div>file_storage_type: {{file.file_storage_type}}</div>-->
        <!--<div>message_id: {{file.message_id}}</div>-->
        <!--<div>path: {{file.path}}</div>-->
        <!--<div>room_id: {{file.room_id}}</div>-->
        <!--<div>updated_at: {{file.updated_at}}</div>-->
        <!--<div>user_id: {{file.user_id}}</div>-->
        <hr>
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
        }
    };
</script>

<style>

    div {}

    .show-file {
        padding: 10px;
    }
</style>

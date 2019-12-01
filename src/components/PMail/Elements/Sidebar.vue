<template>

    <aside class="sm-side">
        <div class="user-head">
            <img src="/static/images/profile.png">

            <div class="user-name">
                <h5>Bo Andersen</h5>
                <span class="email-address">info@codingexplained.com</span>
            </div>
        </div>


        <div class="compose-wrapper">
            <app-compose></app-compose>
        </div>
        <ul class="inbox-nav">
            <li class="active">
                <a href="#" @click.prevent="navigate('appInbox','Inbox',inboxMessage    )">
                    <i class="fa fa-inbox"></i>Inbox <span class="label label-danger pull-right">{{unreadMessage.length}}/{{inboxMessage.length}}</span>
                </a>
            </li>

            <li>
                <a href="#" @click.prevent="navigate('appSent','Sent',sentMessage)">
                    <i class="fa fa-envelope-o"></i>Sent <span class="label label-default pull-right">{{sentMessage.length}}</span>
                </a>
            </li>

            <li>
                <a href="#" @click.prevent="navigate('appImportant','Important',importantMessage)">
                    <i class="fa fa-bookmark-o"></i>Important <span class="label label-warning pull-right">{{importantMessage.length}}</span>
                </a>
            </li>

            <li>
                <a href="#" @click.prevent="navigate('appTrash','Trash',trashMessage)">
                    <i class=" fa fa-trash-o"></i>Trash <span class="label label-default pull-right">{{trashMessage.length}}</span>
                </a>
            </li>
        </ul>
    </aside>
</template>


<script>
    import {eventBusEmail} from '../../../main';
    import Compose from "./Compose";

    export default {
        props:{
            messages:{
                type: Array,
                required:true
            }
        },
        methods: {
            navigate(newView, title, data) {
                eventBusEmail.$emit('changeView', {
                    tag: newView,
                    title: title,
                    data: data,
                })
            }
        },
        computed:{
            inboxMessage() {
                return this.messages.filter(e => {
                    return e.type === "incoming" &&  e.isDeleted === false;
                })
            },
            unreadMessage() {
                return this.messages.filter(e => {
                    return e.type === "incoming" && e.isRead === false &&  e.isDeleted === false;
                })
            },
            sentMessage() {
                return this.messages.filter(e => {
                    return e.type === "outgoing";
                })
            },
            importantMessage() {
                return this.messages.filter(e => {
                    return e.type === "incoming" && e.isImportant === true;
                })
            },
            trashMessage() {
                return this.messages.filter(e => {
                    return e.isDeleted === true;
                })
            },

        },
        components:{
            'appCompose':Compose
        },

    }
</script>



<template>

    <aside class="sm-side">
        <div class="user-head">
            <img src="/static/images/profile.png">

            <div class="user-name">
                <h5>Bo Andersen</h5>
                <span class="email-address">info@codingexplained.com</span>
            </div>
        </div>

        <ul class="inbox-nav">
            <li class="active">
                <a href="#" @click.prevent="navigate('appInbox','Inbox')">
                    <i class="fa fa-inbox"></i>Inbox <span class="label label-danger pull-right">{{unreadMessage.length}}</span>
                </a>
            </li>

            <li>
                <a href="#" @click.prevent="navigate('appSent','Sent')">
                    <i class="fa fa-envelope-o"></i>Sent <span class="label label-default pull-right">{{sentMessage.length}}</span>
                </a>
            </li>

            <li>
                <a href="#" @click.prevent="navigate('appImportant','Important')">
                    <i class="fa fa-bookmark-o"></i>Important <span class="label label-warning pull-right">{{importantMessage.length}}</span>
                </a>
            </li>

            <li>
                <a href="#" @click.prevent="navigate('appTrash','Trash')">
                    <i class=" fa fa-trash-o"></i>Trash <span class="label label-default pull-right">{{trashMessage.length}}</span>
                </a>
            </li>
        </ul>
    </aside>
</template>


<script>
    import {eventBusEmail} from '../../../main';

    export default {
        props:{
            messages:{
                type: Array,
                required:true
            }
        },
        methods: {
            navigate(newView, title) {
                eventBusEmail.$emit('changeView', {
                    tag: newView,
                    title: title,
                })
            }
        },
        computed:{
            unreadMessage() {
                return this.messages.filter(e => {
                    return e.type === "incoming" && e.isRead === true;
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

        }

    }
</script>



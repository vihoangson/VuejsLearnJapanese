<template>
    <aside class="lg-side">
        <div class="inbox-head">
            <h3>{{currentView.title}}</h3>
        </div>
        <keep-alive>
            <component :is="currentView.tag"></component>
        </keep-alive>
    </aside>
</template>


<script>
    import Inbox from "./Inbox";
    import Sent from "./Sent";
    import Important from "./Important";
    import Trash from "./Trash";
    import {eventBusEmail} from '../../../main';

    export default {
        data() {
            return {
                history: [
                    {
                        tag: 'app-inbox',
                        title: 'inbox'
                    }
                ]
            }
        },
        created() {
            eventBusEmail.$on('changeView', (data) => {
                let temp = [
                    {
                        tag: data.tag,
                        title: data.title,
                    }
                ]
                this.history = temp.concat(this.history.splice(0));
            })
        },
        computed: {
            currentView() {
                return this.history[0]
            }
        },
        components: {
            'appInbox': Inbox,
            'appSent': Sent,
            'appImportant': Important,
            'appTrash': Trash,

        }

    }
</script>



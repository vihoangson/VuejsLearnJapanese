<template>
    <aside class="lg-side">
        <div class="inbox-head">
            <h3>{{currentView.title}}</h3>
        </div>
        <keep-alive>
            <component :is="currentView.tag" :data="currentView.data"></component>
        </keep-alive>
    </aside>
</template>


<script>
    import Inbox from "./Inbox";
    import Sent from "./Sent";
    import Important from "./Important";
    import Trash from "./Trash";
    import ViewMessages from "./ViewMessages";
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
        props: {
            messages: {
                type: Array,
                required: true,
            }
        },
        created() {
            eventBusEmail.$on('changeView', (data) => {
                console.log("data.data")
                console.log(data.data)
                let temp = [
                    {
                        tag: data.tag,
                        title: data.title,
                        data: data.data || {},
                    }
                ]
                this.history = temp.concat(this.history.splice(0));
            })
        },
        computed: {
            currentView() {
                return this.history[0]
            },
            previousView(){
                return this.history[1]
            }
        },
        components: {
            'appInbox': Inbox,
            'appSent': Sent,
            'appImportant': Important,
            'appTrash': Trash,
            'appViewMessages':ViewMessages,
        }

    }
</script>



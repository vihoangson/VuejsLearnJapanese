<template>
    <div>
        <div class="container">
            <div class="mail-box">
                <app-sidebar :messages="messages"></app-sidebar>
                <app-content></app-content>
            </div>

        </div>
    </div>
</template>


<script>
    import Sidebar from "./Elements/Sidebar";
    import Content from "./Elements/Content";
    import data from "./data/data";

    export default {
        data() {
            return {
                messages: data,
            }
        },
        components: {
            'appSidebar': Sidebar,
            'appContent': Content,
        },
    }
</script>



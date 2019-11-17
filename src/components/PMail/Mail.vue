<template>
    <div>
        <div class="container">
            <div class="mail-box">
                <app-sidebar></app-sidebar>
                <app-content></app-content>
            </div>

        </div>
    </div>
</template>


<script>
    import Sidebar from "./Elements/Sidebar";
    import Content from "./Elements/Content";

    export default {
        components: {
            'appSidebar': Sidebar,
            'appContent': Content,
        }
    }
</script>



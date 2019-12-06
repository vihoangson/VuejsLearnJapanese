<template>
    <div id="home">
        <hr>
        <div class="text-center">
            <a href="/mail" class="btn btn-primary"><i class="fas fa-mail-bulk"></i> Feature Mail</a>
            <a href="/timeline" class="btn btn-primary"><i class="fas fa-mail-bulk"></i> Time line</a>
            <a href="/socket" class="btn btn-primary"><i class="fas fa-mail-bulk"></i> Socket</a>
        </div>

        <hr>
        <status></status>
    </div>
</template>


<script>
    import Status from "../japanese/Status";

    export default {
        name: 'Home',
        components: {
            Status
        },
        data() {

        }


    };
</script>

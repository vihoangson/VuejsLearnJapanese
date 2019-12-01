<template>
    <div>
        <div class="container text-center">
            <button class="btn btn-primary m-3" @click.prevent="show = !show">Click</button>
            <transition>
                <div v-if="show" class="content m-3">Textasdas</div>
            </transition>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Transition1',
        data() {
            return {
                show: true
            }
        },
        created() {

        }
    }
</script>
<style>
    .v-enter, .v-leave-to{
        opacity: 0;
    }
    .v-enter-active, .v-leave-action{
        transition:opacity 1s;
    }
</style>


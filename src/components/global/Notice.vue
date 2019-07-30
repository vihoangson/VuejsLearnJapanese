<template>
  <div v-bind:class="{active: isActive, notice: true}">
      <div v-bind:class="[alertClass, alertStatus]">
        {{message}}
     </div>
  </div>
</template>
<style>
.notice{
    position: absolute;
    z-index: 10;
    width: 100%;
    top: -50px;
    transition: 0.5s;
}
.alert{
    text-align: center;
    padding: 9px;
    margin: 0;
    color: #216493;
    text-transform: capitalize;
}
.notice.active{
    top: 0px;
    transition: 0.5s;
    display: block;
}
</style>

<script>
export default {
  name: 'notice',
  data () {
    return {
      alertClass: 'alert',
      message : '',
      alertStatus: '',
      isActive: false,
    }
  },
  mounted() {
    this.$root.$on('push-notice', data => {
        this.message = data.message;
        this.alertStatus = data.alert;
        this.isActive = true;
        setTimeout(()=>{ this.isActive = false;}, 3000);
    });
  }
}
</script>
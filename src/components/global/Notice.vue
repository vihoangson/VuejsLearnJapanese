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
    top: -150px;
    transition: 0.5s;
}
.alert{
    text-align: center;
    padding: 5px 20px;
    margin: 0;
    color: #333;
    text-transform: capitalize;
    width: 200px;
    margin: auto;
    border-radius: 11px;
    margin-top: 5px;
    border: 1px #ccc solid;
}
.notice.active{
    top: 0px;
    transition: 0.5s;
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
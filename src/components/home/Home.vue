<template>
  <div id="home">
    <Header></Header>
    <div class="content">
      <Room></Room>
      <Chat></Chat>
    </div>
    <Group></Group>
  </div>
</template>
<style>
.content {
  position: relative;
  top: 42px;
  width: 100%;
  height: calc(100% - 42px);
  z-index: 1;
}
</style>

<script>
import Header from '../global/Header'
import Room from '../chat/RoomChat'
import Chat from '../chat/ChatBox'
import Group from '../group/Group'
export default {
  name: "Home",
  components: {
    Header,
    Room,
    Chat,
    Group
  }
};
</script>

<template>
  <div class="search">
    <form action="" class="search-form">
      <span class="icon-search">
       <svg viewBox="0 0 10 10" id="icon_search" xmlns="http://www.w3.org/2000/svg"><path d="M2.237 5.995a2.656 2.656 0 1 1 3.757-3.756 2.656 2.656 0 0 1-3.757 3.756m6.739 2.099L7.164 6.281a3.743 3.743 0 0 0-.397-4.817 3.75 3.75 0 0 0-5.303 5.304 3.742 3.742 0 0 0 4.816.397l1.812 1.812a.625.625 0 0 0 .884-.884"></path></svg>
      </span>
      <input type="text" placeholder="Type to search for chat/message" autocomplete="off" role="search">
    </form>
  </div>
</template>
<style>
.search{
  position: absolute;
  top: 2px;
  left: 257px;
}
.search-form{
  box-sizing: border-box;
  height: 40px;
  padding: 0px 25px 0 40px;
  background: #33455b;
  border: 1px solid transparent;
  border-radius: 2px;
}
.search-form:focus{
  border-color: #0084b2;
  box-shadow: 0 0 5px #74b9f0;
}
.search-form input{
  padding: 0;
  color: #fff;
  border: 0;
  border-radius: 0;
  background: #33455b;
  box-shadow: none;
  font-size: 14px;
  line-height: 39px;
  vertical-align: middle;
  height: auto;
  width: 250px;
}
.search-form input:focus{
  outline: none;
}
.search-form input::placeholder{
  color: #adadad;
}
.icon-search{
  position: absolute;
  z-index: 1;
  left: 5px;
  width: 24px;
  height: 24px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  top: 7px;
  background-color: rgb(19, 32, 47);
  fill: rgb(136, 135, 135);
  border-radius: 14px;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(19, 32, 47);
  border-image: initial;
}
.icon-search svg{
  width: 16px;
  height: 16px;
}
</style>
<script>
export default {
  
}
</script>

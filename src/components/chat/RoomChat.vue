<template>
  <div id="room" class="room">
    <div class="room-header">
      <div class="my-chat">
        <span>
          <svg viewBox="0 0 10 10" id="icon_home" xmlns="http://www.w3.org/2000/svg"><path d="M8.438 8.438H6.563V6.563a1.563 1.563 0 1 0-3.126 0v1.875H1.562V5.469L5 2.031l3.438 3.438v2.969zM5 .625L.625 5v4.375h3.751V6.562a.625.625 0 1 1 1.25 0v2.813h3.751V5L5.002.625z"></path></svg>
        </span>
      </div>
      <div class="filter-list">
        <div id="roomInfoSelectRole" class="selectCommonRole">
          <div v-bind:class="{active: isActiveSelect}" @click="selectBoxClicks">
            <div class="selectboxDefault">
                <span class="selectbox"> {{ selectItems }} </span>
                <span class="icon">
                  <svg viewBox="0 0 10 10" width="16" height="16" >
                    <use fill-rule="evenodd" xlink:href="#icon_triangleDown"></use>
                  </svg>
                </span>
            </div>
            <ul role="list" class="selectboxContent">
              <li class="category"> Category
                 <b-button v-b-modal.modal-prevent-group>
                    <svg class="sc-bwzfXH jhCIfQ" viewBox="0 0 10 10" width="16" height="16">
                      <use fill-rule="evenodd" xlink:href="#icon_plus"></use>
                    </svg>
                 </b-button>
              </li>
              <li v-for="(s, index) in datascript" :class="{ 'active': activeIndex === index}" :key="s.id" @click="setActive(index, s.name)">
                  {{ s.name }}
                  <div class="option-icon">
                      <span class="edit" aria-label="Edit" @click="iconEdit(s.id)">
                        <svg viewBox="0 0 10 10" id="icon_edit" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.33 7.432L2.566 5.661 7.322.917a.469.469 0 0 1 .663.001l1.103 1.107a.47.47 0 0 1-.001.663L4.331 7.432zM1.462 8.537l.554-2.097L3.56 7.989l-2.098.548z"></path>
                        </svg>
                      </span>
                      <span class="delete" aria-label="Delete" @click="iconDelete(s.id)">
                        <svg viewBox="0 0 10 10" id="icon_delete" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.88 1.25V.63H3.13v.63H1.25V2.5h.63v6.88h6.25V2.5h.63V1.25zm.31 7.19H2.81V2.5h4.38zM3.75 3.12h.63V7.5h-.63zm1.88 0h.63V7.5h-.63z">
                          </path>
                        </svg>
                      </span>
                  </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="create-room" v-bind:class="{ active: isActive, 'create-room': true }" @click="toggleOption">
        <span>
          <svg viewBox="0 0 10 10" id="icon_plus" xmlns="http://www.w3.org/2000/svg"><path d="M4.375.625v3.75H.625v1.25h3.75v3.75h1.25v-3.75h3.75v-1.25h-3.75V.625z"></path></svg>
          <div class="add-option">
              <b-button v-b-modal.modal-prevent-rooms>Add Rooms</b-button>
          </div>
        </span>
      </div>
    </div>
    <div class="room-body">
      <ul>
        <li>
          <div class="name">
            <div class="room-image">
              <img src="https://appdata.chatwork.com/icon/736/736137.rsz.jpg" alt="">
            </div>
            <div class="room-name">
              <span>SNS TOOL</span>
            </div>
          </div>
        </li>
        <li>
          <div class="name">
            <div class="room-image">
              <img src="https://appdata.chatwork.com/icon/736/736137.rsz.jpg" alt="">
            </div>
            <div class="room-name">
              <span>SNS TOOL</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style>
.option-icon{
  position: absolute;
  z-index: 1000;
  right: -5px;
  top: 7px;
  width: 50px;
}
.option-icon svg{
  width: 20px;
  padding: 0 2px;
  color: #fff;
}
.option-icon span{
  float: left;
}
.room-header{
  position: relative;
}
.room-header .selectboxDefault{
    position: absolute;
    left: 40px;
    top: 7px;
    align-items: center;
    justify-content: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 2px;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    padding: 0px 12px;
    line-height: 26px;
    font-size: 13px;
    border-color: #b3b3b3;
    background-color: #fff;
    width: 180px;
    z-index: 10;
}
.room-header .selectboxDefault .icon {
    top: 0;
    width: 10px;
    display: inline-block;
    position: absolute;
    right: 15px;
}
.room-header .selectboxContent{
    display: none;
    position: absolute;
    left: 40px;
    top: 32px;
    z-index: 10;
    right: 10px;
    font-size: 13px;
    width: 180px;
    list-style: none;
    border: 1px #b6b6b6 solid;
    padding: 0;
    background: #fff;
    -webkit-box-shadow: 1px 2px 5px -3px rgba(0,0,0,0.75);
    -moz-box-shadow: 1px 2px 5px -3px rgba(0,0,0,0.75);
    box-shadow: 1px 2px 5px -3px rgba(0,0,0,0.75);
    cursor: pointer;
    position: absolute;
    z-index: 1;
}
.selectboxContent button svg{
    padding: 0;
    position: relative;
    top: -10px;
    left: -6px;
}
.selectboxContent button{
    height: 20px;
    width: 20px;
    float: right;
    background: unset !important;
    border: 0;
}
.selectboxContent button:hover, 
.selectboxContent button:focus{
    height: 20px;
    width: 20px;
    float: right;
    background: unset;
    border: 0;
    color: #fff;
}
.room-header .active .selectboxContent{
        display: inline-block;
  position: absolute;
  z-index: 1;
}
.room-header .selectboxContent li:hover{
    background: #0a8abd;
    color: #fff;
    transition: .5s;
}
.room-header .selectboxContent li{
    padding: 8px 5px;
    padding-left: 12px;
    position: relative;
}

.room-header .selectboxContent li>span{
    float: right;
}
.room{
  position: absolute;
  left: 0;
  top: 0;
  width: 256px;
  height: 100%;
  background-color: #f2f2f2;
  z-index: 2;
}
.room-header{
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 8px;
  height: 41px;
  background-color: #fff;
  border-bottom: 1px solid #cccccc;
}

.room-header .my-chat{
  box-sizing: border-box;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 2px;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  width: 24px;
  height: 24px;
  padding: 0;
  border-color: transparent;
  background-color: transparent;
  color: #1a1a1a;
  fill: #1a1a1a;
  margin-right: 4px;
}
.room-header .create-room{
  box-sizing: border-box;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 2px;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  width: 24px;
  height: 24px;
  padding: 0;
  border-color: transparent;
  background-color: transparent;
  color: #1a1a1a;
  fill: #1a1a1a;
}
.create-room:hover,
.my-chat:hover{
  background-color: rgba(0, 0, 0, 0.1);
  border-color: transparent;
  color: #1a1a1a;
  fill: #1a1a1a;
}
.create-room svg,
.my-chat svg{
  width: 16px;
  height: 16px;
}
.filter-list{
  margin-right: auto;
  width: calc( 100% - 24px * 2 - 4px * 2);
  flex-grow: 0;
  flex-shrink: 1;
}
.filter-list select{
  width: 100%;
}
.room-body{
  height: calc(100% - 41px);
}
.room-body ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
.room-body ul li{
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  fill-opacity: 0;
  background-color: rgb(242, 242, 242);
  padding: 8px calc(28px) 8px 8px;
  transition: background 0.2s linear 0s;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  border-image: initial;
}
.room-body ul li .name{
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
}
.room-image{
  margin-right: 8px;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}
.room-image img{
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.room-name{
  width: calc((100% - 32px) - 8px);
}

.create-room .add-option{
  display: none;
  position: absolute;
  top: 30px;
  right: -263px;
  width: 300px;
  z-index: 20;
}

.create-room.active .add-option{
  display: block;
}
.create-room .add-option button{

}
</style>
<script>
import modalMixin from '@/mixins/modal'
import axios from 'axios'
export default {
  name: 'Room',
  data () {
    return {
      isActive : false,
      isActiveSelect : false,
      selectItems: "All Chat",
      datascript: [],
      activeIndex: undefined,
    }
  },
  created: function(){
      this.getAllGroup().then(response => {
          this.datascript = response;
      });
  },
  methods: {
    toggleOption: function(){
      // Check value
      if(this.isActive){
        this.isActive = false;
      }else{
        this.isActive = true;
      }
      this.isActiveSelect = false;
    },
    selectBoxClicks(){
      if(this.isActiveSelect){
          this.isActiveSelect = false;
      }else{
          this.isActiveSelect = true;
      }
      this.getAllGroup().then(response => {
        this.datascript = response;
      });
      this.isActive = false;
    },
    setActive(index, criptions) {
        this.activeIndex = index;
        this.selectItems = criptions;
    },
    getAllGroup(){
      return axios.get("http://sns-api.local.vn:81/api/v1/group/getAllGroup", {
      },{
          headers: {Accept: "application/json"}
      }).then(function (response) {
          return response.data;
      }).catch(function (error) {
         return null;
      });
    },
    iconEdit(id){
      this.$bvModal.show('modal-prevent-group')
    },
    iconDelete(id){
      this.deleteGroup(id).then(data => {
        this.getAllGroup().then(response => {
          this.datascript = response;
        });
      });
    },
    deleteGroup(id){
      return axios.post("http://sns-api.local.vn:81/api/v1/group/delete", {
          id: id,
      },{
          //headers: {Authorization: "Bearer " + token}
      }).then(function (response) {
          return response;
      }).catch(function (error) {
          return error;
      });
    },
    editGroup(id){
      return axios.post("http://sns-api.local.vn:81/api/v1/group/edit", {
          id: id,
      },{
          //headers: {Authorization: "Bearer " + token}
      }).then(function (response) {
          return response;
      }).catch(function (error) {
          return error;
      });
    }
  }
}

</script>

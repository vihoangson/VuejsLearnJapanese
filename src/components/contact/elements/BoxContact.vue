<template>
    <div id="_contactElement" class="" style="">

        <div class="ele-box-contact">
            <div class="contain-header">
                <img v-bind:src="item.icon_img===null?'http://via.placeholder.com/150x150':item.icon_img">
                <div class="title-contact">
                    <b>{{item.name}}</b>
                    <div>{{item.company}}</div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="contain-footer">
                <button-add-contact v-bind:id="item.id" v-bind:email="item.email" v-bind:status="item.contact_status"></button-add-contact>
            </div>
            <div class="clearfix"></div>
        </div>
        <!--<div>id: {{item.id}}</div>-->
        <!--<div>company: {{item.company}}</div>-->
        <!--<div>name: {{item.name}}</div>-->
        <!--<div>icon_img:  </div>-->
        <!--<div>contact_status: {{item.contact_status}}</div>-->
        <!--<div></div>-->
        <!--<div>email: {{item.email}}</div>-->
    </div>
</template>

<script>
    import ButtonAddContact from './ButtonAddContact';

    export default {
        name: "BoxContact.vue",
        components: {ButtonAddContact},
        component:{
            ButtonAddContact
        },
        props:['item'],
    }
</script>

<style scoped>

.ele-box-contact {
    width: 97%;
    background: white;
    margin: 7px 0;
    padding: 10px;
    border-radius: 11px;
    border-bottom: 2px solid #ccc;
}
.contain-header img{
    float:left;
    max-width: 150px;
}
.contain-header .title-contact {
    padding: 5px 10px 10px 15px;
    float: left;
}
</style>
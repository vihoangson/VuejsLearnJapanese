<template>
    <div class="header">
        <div class="inner">
            <div class="branding" @click="goHome">
                <img
                    class="logo"
                    src="https://lampart-vn.com/wp-content/uploads/2019/02/logo.png"
                    alt="LAMPART"
                />
            </div>
            <HeaderSearch></HeaderSearch>
            <Navigation></Navigation>
        </div>
    </div>
</template>
<style>
.header {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    height: 45px;
    width: 100%;
    background-color: #13202f;
    z-index: 2;
}
.inner {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 45px;
    padding-left: 10px;
}
.branding {
    display: flex;
    align-items: center;
    width: 144px;
    height: 45px;
}
.logo {
    height: 40px;
    width: auto;
}
</style>

<script>
import HeaderSearch from './HeaderSearch';
import Navigation from './Navigation';
export default {
    name: 'header',
    components: {
        HeaderSearch,
        Navigation
    },
    created(){
    },
    methods: {
        goHome(){
            if(this.$store.getters.get_current_user_info.id !== undefined){
                this.$router.push({ path: '/' });
            }else{
                this.$router.push({ path: '/login' });
            }
        }
    }
};
</script>

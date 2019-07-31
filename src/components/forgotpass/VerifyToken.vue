<template>
</template>

<script>
    import { API } from '../../services/api';
    import { ApiConst } from '../../common/ApiConst';

    export default {
        name: 'VerifyToken',
        mounted(){
            let data = {'token':this.$route.params.token}
            API.POST(ApiConst.FORGOT_PASS_CHECK_TOKEN,data).then(res=>{
                if(res.error_code === 0){
                    this.$router.push({ name: 'forgotpasschange' });
                }else{
                    this.$router.push({ name: 'home' });
                }
            });
        }

    };
</script>

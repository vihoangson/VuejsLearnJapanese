<template>
<div id='checktoken'></div>
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

                    localStorage.setItem(
                        'token_resetpass',
                        this.$route.params.token
                    );
                }else{
                    alert('Token doesn\'t exists, please recheck.')
                    this.$router.push({ name: 'login' });
                }
            });
        }

    };
</script>

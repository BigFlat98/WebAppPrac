<template>
<div class="container">
    <form action="" id="login-form" @submit.prevent="login">
        <div class="input-group">
            <label for="id">ID : </label>
            <input type="text" v-model="loginData.snsId" id="id" name="id" required>
        </div>
        <div class="input-group">
            <label for="password">Password : </label>
            <input type="password" v-model="loginData.password" id="password" name="password" required>
        </div>
        <router-link to="/signup">회원가입</router-link>
        <button id="login-btn" type="submit" class="btn">로그인</button>
    </form>
</div>
</template>


<script>
import axios from 'axios';
export default{ 
    name:'',
    components:{},
    computed:{},
    data(){
        return{
            loginData:{
                snsId:'',
                password:''
            },
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        async login(){
            try{
                const response = await axios.post('http://localhost:3000/auth/login',this.loginData,{withCredentials: true});// 이 옵션이 반드시 필요합니다!
                console.log("로그인 성공",response);
            }catch(error){
                alert('로그인 실패');
                console.error('로그인 실패',error);
            }
        }
    },
    watch:{}
}
</script>
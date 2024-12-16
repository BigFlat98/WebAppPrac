<template>
<div class="timeline">
    <form id="join-form" @submit.prevent="signUp">
        <div class="input-group">
            <label for="join-email">Email</label>
            <input type="email" v-model="joinData.email" id="join-email" name="email" required>
        </div>
        <div class="input-group">
            <label for="join-id">ID</label>
            <input type="text" v-model="joinData.snsId" id="join-id" name="id" required>
        </div>
        <div class="input-group">
            <label for="join-pw">PW</label>
            <input type="password" v-model="joinData.password" id="join-pw" name="pw" required>
        </div>
        <div class="input-group">
            <label for="join-confirm-pw">confirm PW</label>
            <input type="password" v-model="checkPassword" id="join-confirm-pw" name="confirm-pw" required style="-webkit-text-security: disc;">
            <p v-if="checkPassword !== '' && checkPassword !== joinData.password" class="error-msg">비밀번호가 일치하지 않습니다.</p>
        </div>
        <div class="input-group">
            <label for="join-nickname">Nickname</label>
            <input type="text" v-model="joinData.nick" id="join-nickname" name="nickname" required>
        </div>
        <div class="input-group">
            <label for="join-phone">Phone Number</label>
            <input type="text" v-model="joinData.phoneNumber" id="join-phone" name="phone" required>
        </div>
        <button id="join-btn" type="submit" class="btn">Sign Up</button>
    </form>

</div>
</template>


<script>
import axios from 'axios';
export default{ 
    name:'signUpComponent',
    components:{},
    computed:{},
    data(){
        return{
            joinData:{
                snsId:'',
                password:'',
                email:'',
                nick:'',
                phoneNumber:''
            },
            checkPassword:''
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        async signUp(){
            try{
                if(this.joinData.password !== this.checkPassword){
                    alert('비밀번호가 일치하지 않습니다.');
                    return;
                }
                await axios.post('http://localhost:3000/auth/signup',this.joinData);
                alert('회원가입 완료');
                this.joinData = {
                    snsId:'',
                    password:'',
                    email:'',
                    nick:'',
                    phoneNumber:''
                };
                this.checkPassword = '';
                await axios.get("http://localhost:3000/");
            }
            catch(error){
                console.log(error);
                if(error.response && error.response.data.error === 'exist'){
                    alert('이미 존재하는 아이디 또는 이메일 또는 전화번호입니다.');
                }
                else{
                    alert('회원가입 실패');
                }
            }
        }
    },
    watch:{}
}
</script>

<style scoped>
.error-msg{
    color:red;
    font-size: 10px;
    margin-top: 5px;
}
.timeline {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.input-group {
  margin-bottom: 15px;
}
.input-group label {
  display: block;
  margin-bottom: 5px;
}
.input-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}
.btn:hover {
  background-color: #0056b3;
}
</style>
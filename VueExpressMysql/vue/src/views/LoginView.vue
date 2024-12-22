<template>
<div>
    <a href="https://front.codes/" class="logo" target="_blank">
        <img src="https://assets.codepen.io/1462889/fcy.png" alt="">
    </a>

    <div class="section">
        <div class="container">
            <div class="row full-height justify-content-center">
                <div class="col-12 text-center align-self-center py-5">
                    <div class="section pb-5 pt-5 pt-sm-2 text-center">
                        <h6 class="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                        <input class="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                        <label for="reg-log"></label>
                        <div class="card-3d-wrap mx-auto">
                            <div class="card-3d-wrapper">
                                <div class="card-front">
                                    <div class="center-wrap">
                                        <div class="section text-center">
                                            <h4 class="mb-4 pb-3">Log In</h4>
                                            <div class="form-group">
                                                <input type="email" name="logemail" v-model="login.email" class="form-style" placeholder="Your Email" id="logemail" autocomplete="off">
                                                <i class="input-icon uil uil-at"></i>
                                            </div>  
                                            <div class="form-group mt-2">
                                                <input type="password" name="logpass" v-model="login.password" class="form-style" placeholder="Your Password" id="logpass" autocomplete="off">
                                                <i class="input-icon uil uil-lock-alt"></i>
                                            </div>
                                            <button v-show="!isLoggedIn" @click="" class="btn mt-4">submit</button><br/>
                                            <button v-show="!isLoggedIn" @click="googleLogin" class="btn mt-4 api-login-btn">google login</button>
                                            <button v-show="!isLoggedIn" @click="facebookLogin" class="btn mt-4 api-login-btn">facebook login</button>
                                            <button v-show="!isLoggedIn" @click="kakaoLogin" class="btn mt-4 api-login-btn">kakao login</button>
                                            <button v-show="isLoggedIn" @click="logout" class="btn mt-4">logout</button>
                                            <p class="mb-0 mt-4 text-center"><a href="#0" class="link">Forgot your password?</a></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-back">
                                        <div class="center-wrap">
                                            <div class="section text-center">
                                                <h4 class="mb-4 pb-3">Sign Up</h4>
                                                <div class="form-group">
                                                    <input type="text" name="logname" v-model="signup.name" class="form-style" placeholder="Your Full Name" id="logname" autocomplete="off">
                                                    <i class="input-icon uil uil-user"></i>
                                                </div>  
                                                <div class="form-group mt-2">
                                                    <input type="email" name="logemail" v-model="signup.email" class="form-style" placeholder="Your Email" id="logemail" autocomplete="off">
                                                    <i class="input-icon uil uil-at"></i>
                                                </div>  
                                                <div class="form-group mt-2">
                                                    <input type="password" name="logpass" v-model="signup.password" class="form-style" placeholder="Your Password" id="logpass" autocomplete="off">
                                                    <i class="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <a href="#" class="btn mt-4">submit</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default{ 
    name:'',
    
    components:{},
    computed:{},
    directives:{
        email_format:{
            mounted(el) {
                el.addEventListener('input', () => {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(el.value)) {
                        el.setCustomValidity('올바른 이메일 형식을 입력하세요.');
                    } 
                    else {
                        el.setCustomValidity('');
                    }
                });
            }
        },
        number_format:{
            mounted(el) {
                el.addEventListener('input', () => {
                    // 한국 핸드폰 번호 형식: 010-XXXX-XXXX
                    const phonePattern = /^010-\d{4}-\d{4}$/;
                    el.value = el.value.replace(/[^0-9-]/g, ""); // 숫자와 '-'만 허용
                    if (!phonePattern.test(el.value)) {
                        el.setCustomValidity('올바른 한국 핸드폰 번호 형식을 입력하세요. 예: 010-1234-5678');
                    } else {
                        el.setCustomValidity('');
                    }
                });
            }
        },
        password_format:{
            mounted(el) {
                el.addEventListener('input', () => {
                    // 비밀번호는 12-16��리, 특수문자 최소 1개 포함
                    const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,16}$/;
                    if (!passwordPattern.test(el.value)) {
                        el.setCustomValidity('비밀번호는 12자리 이상 16자리 이하이어야 하며, 특수문자를 최소 1회 이상 포함해야 합니다.');
                    } else {
                        el.setCustomValidity('');
                    }
                });
            }
        }
    },
    data(){
        return{
            login:{
                email:'',
                password:''
            },
            signup:{
                name:'',
                email:'',
                number:'',
                address:'',
                gender:true,
                password:''
            },
            isLoggedIn:false,
        };
    },
    setup(){},
    created(){},
    mounted(){
      this.getUserInfo();
    },
    unmounted(){},
    methods:{
      googleLogin(){
        //const response = await axios.get('http://localhost:3003/login/googleLogin',{withCredentials:true});
        //여기서 axios요청을 보내면 반드시 응답을 받아야 함. 
        //하지만 외부 로그인 api 사용시 로그인 페이지로 이동하고 응답을 백 서버로 보냄. 때문에 axios요청을 여기서 백에 보내게 되면 외부 api측에서 cors에러가 발생함
        // ex) axios요청을 하면 front -> back -> 외부 api -> back -> front 이런 흐름에서 외부 api측에서 응답을 받아야 하는데 이때 외부 api측에서 응답을 받지 못하고 바로 로그인 페이지로 이동하게 되어 외부 api측에서 cors에러가 발생함
        // 그래서 프론트 측에서 응받을 받을 필요 없이 그냥 다른 url을 호출하는 redirect 방식을 사용해야 함.

        // google 인증 페이지로 이동해야 하는데,
        // axios는 현재 페이지에 머물러 있으려고 합니다
        // 결과적으로 인증 흐름이 제대로 동작하지 않습니다
        window.location.href = 'http://localhost:3003/login/googleLogin';
      },
      facebookLogin(){
        window.location.href = 'http://localhost:3003/login/facebookLogin';
      },
      kakaoLogin(){
        window.location.href = 'http://localhost:3003/login/kakaoLogin';
      },
      async logout(){
        await axios.get('http://localhost:3003/login/signout',{withCredentials:true});
        this.isLoggedIn = false;
      },
      async getUserInfo(){
        const response = await axios.get('http://localhost:3003/login/getUserInfo',{withCredentials:true});
        if(response.data.isLoggedIn){
          console.log(response.data.user);
          this.isLoggedIn = true;
        }
        else{
          console.log('로그인 필요');
          this.isLoggedIn = false;
        }
      },
      

    },
    watch:{}
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900');

body{
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 15px;
  line-height: 1.7;
  color: #c4c3ca;
  background-color: #1f2029;
  overflow-x: hidden;
}
a {
  cursor: pointer;
  transition: all 200ms linear;
}
a:hover {
  text-decoration: none;
}
.link {
  color: #c4c3ca;
}
.link:hover {
  color: #ffeba7;
}
p {
  font-weight: 500;
  font-size: 14px;
  line-height: 1.7;
}
h4 {
  font-weight: 600;
}
h6 span{
  padding: 0 20px;
  text-transform: uppercase;
  font-weight: 700;
}
.section{
  position: relative;
  width: 100%;
  display: block;
}
.full-height{
  min-height: 100vh;
}
[type="checkbox"]:checked,
[type="checkbox"]:not(:checked){
  position: absolute;
  left: -9999px;
}
.checkbox:checked + label,
.checkbox:not(:checked) + label{
  position: relative;
  display: block;
  text-align: center;
  width: 60px;
  height: 16px;
  border-radius: 8px;
  padding: 0;
  margin: 10px auto;
  cursor: pointer;
  background-color: #ffeba7;
}
.checkbox:checked + label:before,
.checkbox:not(:checked) + label:before{
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #ffeba7;
  background-color: #102770;
  font-family: 'unicons';
  content: '\eb4f';
  z-index: 20;
  top: -10px;
  left: -10px;
  line-height: 36px;
  text-align: center;
  font-size: 24px;
  transition: all 0.5s ease;
}
.checkbox:checked + label:before {
  transform: translateX(44px) rotate(-270deg);
}


.card-3d-wrap {
  position: relative;
  width: 440px;
  max-width: 100%;
  height: 400px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  perspective: 800px;
  margin-top: 60px;
}
.card-3d-wrapper {
  width: 100%;
  height: 100%;
  position:absolute;    
  top: 0;
  left: 0;  
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all 600ms ease-out; 
}
.card-front, .card-back {
  width: 100%;
  height: 100%;
  background-color: #2a2b38;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  position: absolute;
  border-radius: 6px;
  left: 0;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}
.card-back {
  transform: rotateY(180deg);
}
.checkbox:checked ~ .card-3d-wrap .card-3d-wrapper {
  transform: rotateY(180deg);
}
.center-wrap{
  position: absolute;
  width: 100%;
  padding: 0 35px;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  z-index: 20;
  display: block;
}


.form-group{ 
  position: relative;
  display: block;
    margin: 0;
    padding: 0;
}
.form-style {
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
  outline: none;
  color: #c4c3ca;
  background-color: #1f2029;
  border: none;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
}
.form-style:focus,
.form-style:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
}
.input-icon {
  position: absolute;
  top: 0;
  left: 18px;
  height: 48px;
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  color: #ffeba7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}

.form-group input:-ms-input-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input::-moz-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:-moz-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input::-webkit-input-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus:-ms-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus::-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus:-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus::-webkit-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}

.btn{  
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  -webkit-transition : all 200ms linear;
  transition: all 200ms linear;
  padding: 0 30px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
  border: none;
  background-color: #ffeba7;
  color: #102770;
  box-shadow: 0 8px 24px 0 rgba(255,235,167,.2);
}
.btn:active,
.btn:focus{  
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}
.btn:hover{  
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}




.logo {
  position: absolute;
  top: 30px;
  right: 30px;
  display: block;
  z-index: 100;
  transition: all 250ms linear;
}
.logo img {
  height: 26px;
  width: auto;
  display: block;
}

.api-login-btn{
  width: 100px;
  margin: 0 10px;
}
</style>
<template>
<div class="container">
    <!-- add user -->
    <div class="add_user_container con_padding">
        <form @submit.prevent="addUsers">
            <div class="mb-3">
                <label for="name_text" class="form-label">Name</label>
                <input type="text" class="form-control" v-model='addUser.name' id="name_text" aria-describedby="emailHelp" required>
                <div id="emailHelp" class="form-text">Enter your name</div>
            </div>
            <div class="mb-3">
                <label class="form-label">Gender</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="male" v-model='addUser.gender' :value="true" checked>
                    <label class="form-check-label" for="male">
                        Male
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="female" v-model='addUser.gender' :value="false">
                    <label class="form-check-label" for="female">
                        Female
                    </label>
                </div>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" v-email_format v-model='addUser.email' aria-describedby="emailHelp" required>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-password_format v-model='addUser.password' required>
            </div>
            <div class="mb-3">
                <label for="phone_number" class="form-label">Phone Number</label>
                <input type="text" class="form-control" id="phone_number" v-number_format v-model='addUser.number' required>
            </div>
            <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input type="text" class="form-control" id="address" v-model='addUser.address' required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
    
    
    <!-- user list -->
    <div class="md-3 con_padding">
        <div class="user_list_container">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">name</th>
                        <th scope="col">gender</th>
                        <th scope="col">email</th>
                        <th scope="col">number</th>
                        <th scope="col">address</th>
                        <th scope="col">add comment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.gender }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.number }}</td>
                        <td>{{ user.address }}</td>
                        <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_modify_comment_modal" @click="addCommentSet(user.id)">add comment</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- comment list -->
    <div class="md-3 con_padding">
        <div class="comment_list_container">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">comment number</th>
                        <th scope="col">author</th>
                        <th scope="col">comment</th>
                        <th scope="col">modify</th>
                        <th scope="col">delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="comment in comments" :key="comment.id">
                        <td>{{ comment.id }}</td>
                        <td>{{ comment.User.name }}</td>
                        <td>{{ comment.comment }}</td>
                        <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_modify_comment_modal" @click="modifyCommentSet(comment.id)">modify</button></td>
                        <td><button type="button" class="btn btn-danger"@click="deleteComment(comment.id)">delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    

<!-- add and modify comment modal -->
<div class="modal fade" id="add_modify_comment_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Comment</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Message:</label>
            <textarea class="form-control" id="message-text" v-model='comment_text'></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-if="modalCheck" @click="addComment">add comment</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-else @click="modifyComment">modify comment</button>
      </div>
    </div>
  </div>
</div>
    <br /><br /><br />

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
            users:[], //받아온 유저 저장
            addUser:{ //유저 추가 시 사용
                name:'',
                gender:true,
                email:'',
                password:'',
                number:'',
                address:''
            },
            comments:[], //받아온 댓글 저장
            user_comments:[], //유저 댓글 저장
            comment_text:'', //댓글 내용 바인딩으로 저장
            modalCheck:false, //모달 추가 또는 수정 여부 확인
            userID_for_addComment:'', //댓글 추가 시 사용
            commentID_for_modifyComment:'', //댓글 수정 시 사용
        };
    },
    setup(){},
    created(){
        this.getUsers();
        this.getComments();
    },
    mounted(){},
    unmounted(){},
    methods:{
        async getUsers(){
            try{
                const res = await axios.get('http://localhost:3003/');
                this.users = res.data;
                console.log(res);
            }
            catch(err){
                console.error(err);
            }
        },
        async addUsers(){
            try{
                const res = await axios.post('http://localhost:3003/user',this.addUser);
                this.users =res.data;
                console.log(res);
                this.addUser = {
                    name:'',
                    gender:true,
                    email:'',
                    password:'',
                    number:'',
                    address:''
                };
            }
            catch(err){
                console.error(err);
            }
        },
        async getComments(){
            try{
                const res = await axios.get('http://localhost:3003/comment');
                this.comments = res.data;
                console.log(res);
            }
            catch(err){
                console.error(err);
            }
        },
        async addComment(){
            try{
                await axios.post('http://localhost:3003/comment',{user_id:this.userID_for_addComment,comment:this.comment_text});
                this.getComments();
                this.comment_text = '';
            }
            catch(err){
                console.error(err);
            }
        },
        async modifyComment(){
            try{
                await axios.patch('http://localhost:3003/comment',{comment_id:this.commentID_for_modifyComment,comment:this.comment_text});
                this.getComments();
                this.modalCheck = false;
                this.comment_text = '';
            }
            catch(err){
                console.error(err);
            }
        },
        async deleteComment(commentID){
            try{
                await axios.delete(`http://localhost:3003/comment/${commentID}`);
                this.getComments();
            }
            catch(err){
                console.error(err);
            }
        },
        addCommentSet(userID){
            this.userID_for_addComment = userID;
            this.modalCheck = true;
        },
        modifyCommentSet(commentID){
            this.commentID_for_modifyComment = commentID;
            this.modalCheck = false;
        }
    },
    watch:{}
}
</script>
<style scoped>
.container{
    width: 80%;
    height: 100%;
    margin: 0 auto;
    text-align: left;
}
.con_padding{
    padding: 30px;
}
</style>
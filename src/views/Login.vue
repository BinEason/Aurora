<template>
  <div class="login-wrapper">
    <div class="modal">
        <el-form :model="user" :rules="rules" status-icon ref="userForm">
            <div class="title">Aurora</div>
            <el-form-item prop="userName">
                <el-input type="text"  prefix-icon="user" v-model="user.userName"></el-input>
            </el-form-item>
            <el-form-item prop="userPwd">
                
                <el-input type="password" prefix-icon="lock" v-model="user.userPwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  class="login-btn" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import {loginAPI} from '../api/index'
export default {
  name:'login',
  data(){
    return{
        user:{
            userName:'',
            userPwd:''
        },
        rules:{
            userName:[
                {
                    required:true,message:"请输入用户名",trigger:'blur'
                }
            ],
            userPwd:[
                {
                    required:true,message:"请输入密码",trigger:'blur'
                }
            ]
        }

    }
  },
  methods:{
     login(){
        this.$refs.userForm.validate( async (valid)=>{
            if(valid){
               const res= await loginAPI(this.user)
               this.$store.commit('saveUserInfo',res)
               this.$router.push('/welcome')
            }else{
                return
            }

        })

    }
  }
}
</script>

<style lang="scss">
.login-wrapper{
     display: flex;
     justify-content: center;
     align-items: center;
     width: 100vw;
     height: 100vh;
     background-color:   #76A65E;
    .modal{
        width: 500px;
        padding: 50px;
        background-color:  #EFE8E0;
        border-radius: 4px;
        box-shadow: 0px 0px 20px rgb(68, 66, 66);

        .title{
            font-size: 50px;
            line-height: 1.5;
            text-align: center;
            margin-bottom: 30px;
            color:#76A65E;
            
        }
        .login-btn{
            width: 100%;
            background-color: #76A65E;
            color: #fff;
        }
    }
}
</style>
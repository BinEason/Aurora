<template>
    <div class="login-wrapper">
        <div class="modal">
            <el-form :model="user" :rules="rules" status-icon ref="userForm">
                <div class="title">Aurora</div>
                <el-form-item prop="userName">
                    <el-input type="text" prefix-icon="user" v-model="user.userName"></el-input>
                </el-form-item>
                <el-form-item prop="userPwd">

                    <el-input type="password" prefix-icon="lock" v-model="user.userPwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-btn" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
            <div>
                <div class="admin"><span>默认账号：admin </span><span>默认密码：admin</span></div>
                <div class="create"><span>新增用户账号：用户名</span><span>新增用户密码：123456</span></div>
            </div>
        </div>
    </div>
</template>

<script>
import { loginAPI, getPermissionListAPI } from '../api/index'
import { mapMutations } from 'vuex'
// import utils from '../utils/utils'
const modules = import.meta.glob('../views/*.vue')
export default {
    name: 'login',
    data() {
        return {
            user: {
                userName: 'admin',
                userPwd: 'admin'
            },
            rules: {
                userName: [
                    {
                        required: true, message: "请输入用户名", trigger: 'blur'
                    }
                ],
                userPwd: [
                    {
                        required: true, message: "请输入密码", trigger: 'blur'
                    }
                ]
            }

        }
    },
    methods: {
        ...mapMutations('m_user', ['setUser']),
        login() {
            this.$refs.userForm.validate(async (valid) => {
                if (valid) {
                    const res = await loginAPI(this.user)

                    this.setUser(res)

                    this.$router.replace('/welcome')
                } else {
                    return
                }

            })

        },
        // async loadAsyncRoutes() {
        //     // console.log(22);
        //     let userInfo = JSON.parse(localStorage.getItem('cgb')) || {}

        //     if (userInfo.token) {
        //         try {
        //             // console.log(13);
        //             const { menuList } = await getPermissionListAPI()
        //             // console.log(menuList);
        //             let routes = utils.generateRoute(JSON.parse(JSON.stringify(menuList)))
        //             // console.log(routes);
        //             routes.map(route => {

        //                 route.component = modules[`./${route.component}.vue`]
        //                 console.log(modules);
        //                 // console.log(11);
        //                 // console.log(route);
        //                 this.$router.addRoute("home", route);
        //             })
        //         } catch (error) {

        //         }
        //     }
        // }
    }
}
</script>

<style lang="scss">
.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #3c9566;

    .modal {
        width: 500px;
        padding: 50px;
        background-color: #EFE8E0;
        border-radius: 4px;
        box-shadow: 0px 0px 20px rgb(68, 66, 66);

        .title {
            font-size: 50px;
            line-height: 1.5;
            text-align: center;
            margin-bottom: 30px;
            color: #3c9566;

        }

        .login-btn {
            width: 100%;
            background-color: #3c9566;
            color: #fff;
        }

        div {
            font-size: 12px;
            display: flex;
            justify-content: space-around;



            .admin {
                display: flex;
                flex-direction: column;

            }

            .create {
                display: flex;
                flex-direction: column;


            }

        }
    }
}
</style>
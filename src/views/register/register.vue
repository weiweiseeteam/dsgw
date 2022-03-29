<template>
    <div class="registerBack">
        <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="user_img">
        <div class="user_name_input">
            <input type="text" placeholder="请输入手机号" v-model="data.username">
        </div>
        <div class="user_password_input">
            <form action="">
            <input autocomplete="" type="password" placeholder="请输入密码" v-model="data.password">
            </form>
        </div>
        <div class="user_password_input">
            <form action="">
            <input autocomplete="" type="password" placeholder="请再次输入输入密码" v-model="data.repassword">
            </form>
        </div>
        <div class="login_button" @click='handleRegister'>注册</div>
        <div class="login_register" @click='handleLogin'>已有账号去登录</div>
        <Toast :message='toastData.message' v-if="toastData.showToast" />
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive } from '@vue/reactivity'
import { post } from '../../utils/request'
import Toast, { showToastData } from '../../components/toast'

const useRegisterEffect = () => {
  const data = reactive({
    username: '',
    password: '',
    repassword: ''
  })
  // 登录成功后跳转到首页
  const router = useRouter()
  const { toastData, showToast } = showToastData()
  const handleRegister = async () => {
    try {
      const result = await post('/register', { username: data.username, password: data.password, repassword: data.repassword })
      console.log(result)
      if (result.result === 'success') {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast((result && result.message) || '注册失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }

  return { data, toastData, handleRegister }
}

const handleLoginEffect = () => {
  const router = useRouter()
  const handleLogin = () => {
    router.push({ name: 'Login' })
  }
  return { handleLogin }
}

export default {
  name: 'jdLogin',
  components: {
    Toast: Toast
  },
  setup () {
    // 已有账号去登录
    const { handleLogin } = handleLoginEffect()
    const { data, toastData, handleRegister } = useRegisterEffect()
    return { handleRegister, handleLogin, data, toastData }
  }
}
</script>

<style lang="scss" scoped>
    .registerBack
    {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
        .user_img
        {
            width: .66rem;
            height: .66rem;
            margin: 0 auto .4rem auto;
            display: block;
        }
        .user_name_input, .user_password_input
        {
            border: solid .01rem rgba(0, 0, 0, 0.10);
            line-height: .48rem;
            margin: 0 .4rem .16rem .4rem;
            background: #F9F9F9;
            border-radius: .06rem;
            font-size: .16rem;
            & input
            {
                box-sizing: border-box;
                width: 100%;
                line-height: inherit;
                background: #F9F9F9;
                border: none;
                outline: none;
                padding: 0 .16rem;
                &::placeholder
                {
                    font-size: .16rem;
                }
            }
        }
        .login_button
        {
            background: #0091FF;
            box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
            color: white;
            border-radius: .04rem;
            margin: .16rem .4rem;
            line-height: .48rem;
            font-size: .16rem;
            text-align: center;
        }
        .login_register
        {
            text-align: center;
            font-size: .14rem;
            color: rgba(0, 0, 0, 0.5);
        }
    }
</style>

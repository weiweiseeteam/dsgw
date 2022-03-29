<template>
    <div class="loginBack">
        <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="user_img">
        <div class="user_name_input">
            <input type="text" placeholder="请输入手机号" v-model='data.username'>
        </div>
        <div class="user_password_input">
            <form action="">
                <input autocomplete="" type="password" placeholder="请输入密码" v-model="data.password">
            </form>
        </div>
        <div class="login_button" @click='handleLogin'>登录</div>
        <div class="login_register" @click='handleRegister'>立即注册</div>
    </div>
    <Toast :message='toastData.message' v-if="toastData.showToast" />
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { showToastData } from '../../components/toast'

const useLoginEffect = () => {
  // 登录成功后跳转到首页
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const { toastData, showToast } = showToastData()
  const handleLogin = async () => {
    try {
      const result = await post('/login', data)
      if (result.result === 'success') {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast(result && result.message ? result.message : '登录失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  return { data, toastData, handleLogin }
}

const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegister }
}

export default {
  name: 'jdLogin',
  components: { Toast },
  setup () {
    // 登录
    const { data, toastData, handleLogin } = useLoginEffect()

    // 去注册
    const { handleRegister } = useRegisterEffect()
    return { handleLogin, handleRegister, data, toastData }
  }
}
</script>

<style lang="scss" scoped>
    .loginBack
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

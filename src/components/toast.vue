<template>
  <div class="toast">
    {{message}}
  </div>
</template>

<script>

import { reactive } from '@vue/reactivity'

export default {
  name: 'jdToast',
  props: ['message']
}

export const showToastData = () => {
  const toastData = reactive({
    message: '',
    showToast: false
  })
  const showToast = (message) => {
    toastData.message = message
    toastData.showToast = true
    setTimeout(() => {
      toastData.showToast = false
      toastData.message = ''
    }, 2000)
  }
  return { toastData, showToast }
}

</script>

<style lang="scss" scoped>
  .toast{
    background: rgba(108, 108, 108, 0.5);
    color: white;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%);
    font-size: .20rem;
    z-index: 100;
    padding: .15rem;
    border-radius: .15rem;
  }
</style>

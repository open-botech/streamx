<template>
  <div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'EmptyView',
  mounted() {
    setTimeout(() => {
      localStorage.removeItem('STREAMX_TOKEN')

      // 访问系统更新token
      this.$store.dispatch('SignIn',{
        username: 'admin',
        password: 'streamx'
      })
    })


    // 每隔四小时 自动调用登录接口 更新token,防止长时间无操作token超时
    setInterval(() => {
      this.$store.dispatch('SignIn',{
        username: 'admin',
        password: 'streamx'
      })
    }, 1000 * 60 * 60 * 4)
  }
}
</script>

<style scoped>

</style>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouteCacheStore, useUserStore } from '@/stores'
import Suplink from '@suplink/jssdk'
import { setToken } from '@/utils/auth'

const userStore = useUserStore()
// const userInfo = computed(() => userStore.userInfo)

useHead({
  title: '设备管理',
  meta: [
    {
      name: 'description',
      content: '设备管理的suplink端',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})

const routeCacheStore = useRouteCacheStore()

const keepAliveRouteNames = computed(() => {
  return routeCacheStore.routeCaches
})

const mode = computed(() => {
  return isDark.value ? 'dark' : 'light'
})
onMounted(() => {
  // suplink-jssdk 使用示例 更改头部导航栏标题
  Suplink.setNavigationBar({ title: '设备管理' })
  // suplink-jssdk 使用示例 获取suplink登陆用户信息
  Suplink.getUserInfo().then((res) => {
    userStore.setInfo(res.data)
    setToken(res.data.suposToken)
  })
  // supLink调试模式下刷新应用（建议保留）
  // window.suplinkDebug.refresh = () => {
  //   // state.appAlive = false
  //   // appAlive.value = false
  //   nextTick(() => {
  //     // state.appAlive = true
  //     // appAlive.value = true
  //   })
  // }
})
</script>

<template>
  <van-config-provider :theme="mode">
    <nav-bar />
    <router-view v-slot="{ Component }">
      <section class="app-wrapper">
        <keep-alive :include="keepAliveRouteNames">
          <component :is="Component" />
        </keep-alive>
      </section>
    </router-view>
    <tab-bar />
  </van-config-provider>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  position: relative;
  padding: 16px;
}
</style>

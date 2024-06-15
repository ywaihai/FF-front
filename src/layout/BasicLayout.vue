<template>
  <van-nav-bar :title="title" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft"
    @click-right="onClickRight">
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div id="content">
    <RouterView></RouterView>
  </div>

  <van-tabbar route @change="onChange">
    <van-tabbar-item replace to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item replace to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item replace to="/talk" icon="comment-o" name="talk">聊天</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="user-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import routes from "../config/route";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const DEFAULT_TITLE = '伙伴匹配';

const title = ref(DEFAULT_TITLE);

router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})

const onClickLeft = () => {
  router.back();
}

const onClickRight = () => {
  router.push('/search')
}
</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>

<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading" />
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import myAxios from "../plugins/myAxios.ts";
import { showFailToast, showSuccessToast } from "vant";
import UserCardList from "../components/UserCardList.vue";
import { UserType } from "../models/user";
//默认不开启匹配模式
const isMatchMode = ref<boolean>(false);
//定义用户列表
const userList = ref([]);
const loading = ref(false);
const loadData = async () => {
  let userListData;
  loading.value = true;
  //心动模式：根据标签匹配用户
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
      .then(function (response) {
        console.log('/user/recommend', response);
        showSuccessToast('请求成功');
        return response?.data;
      })
      .catch(function (error) {
        console.log('/user/recommend', error);
        showFailToast('请求失败');
      })
  } else {
    //普通模式：直接分页查询用户
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
      .then(function (response) {
        console.log('/user/recommend', response);
        showSuccessToast('请求成功');
        return response?.data?.records;
      })
      .catch(function (error) {
        console.log('/user/recommend', error);
        showFailToast('请求失败');
      })
  }
  if (userListData) {
    userListData.forEach((user: UserType) => {
      user.tags = JSON.parse(user.tags);
    })
    userList.value = userListData;
  }
  loading.value = false;
}
watchEffect(() => {
  loadData();
})
</script>
<style scoped></style>
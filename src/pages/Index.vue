<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Toast, showFailToast, showSuccessToast } from "vant";

import myAxios from "../plugins/myAxios";
import UserCardList from "../components/UserCardList.vue";

import qs from 'qs';

const route = useRoute();
const { tags } = route.query;
const userList = ref([]);



onMounted(async () => {
  // 为给定 ID 的 user 创建请求
  const userListData = await myAxios.get('/user/recommend', {
    withCredentials: true,
    params: {
      pageSize: 8,
      pageNum: 1,
    },
  })
    .then(function (response) {
      console.log('/user/recommend succeed', response);
      showSuccessToast('请求成功');
      return response?.data.records;
    })
    .catch(function (error) {
      console.log('/user/recommend error', error);
      showFailToast('请求失败');
    });
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})



</script>

<style scoped></style>
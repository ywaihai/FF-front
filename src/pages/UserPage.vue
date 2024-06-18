<template>
  <van-cell title="昵称" is-link to='/user/edit' :value="user?.username"
    @click="toEdit('username', '昵称', user?.username)" />
  <van-cell title="账号" is-link to='/user/edit' :value="user?.userAccount"
    @click="toEdit('userAccount', '账号', user?.userAccount)" />
  <van-cell title="头像" is-link to='/user/edit'>
    <img style="height: 48px" :src="user?.avatarUrl" />
  </van-cell>
  <van-cell title="性别" is-link to='/user/edit' :value="user?.gender === 0 ? '男' : '女'"
            @click="toEdit('gender', '性别', user?.gender === 0 ? '男' : '女')" />
  <van-cell title="电话" is-link to='/user/edit' :value="user?.phone" @click="toEdit('phone', '电话', user?.phone)" />
  <van-cell title="邮箱" is-link to='/user/edit' :value="user?.email" @click="toEdit('email', '邮箱', user?.email)" />
  <van-cell title="星球编号" :value="user?.planetCode" @click="toEdit('planetCode', '星球编号', user?.planetCode)" />
  <van-cell title="注册时间" :value="moment(user?.createTime).format('YYYY-MM-DD')"
    @click="toEdit('createTime', '注册时间', moment(user?.createTime).format('YYYY-MM-DD'))" />
</template>

<script setup lang="ts">

import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { getCurrentUser } from "../services/user";
import moment from 'moment/moment.js'

const user = ref();
const router = useRouter();

onMounted(async () => {
  //获取用户信息
  user.value = await getCurrentUser();
  // if (res.data) {
  //   user?.value = res.data;
  //   showSuccessToast('获取用户信息成功');
  // } else {
  //   showFailToast('获取用户信息失败')
  // }
})

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
</script>

<style scoped></style>

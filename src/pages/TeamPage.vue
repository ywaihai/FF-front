<template>
    <div id="teamPage">
        <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
        <van-tabs v-model:active="active" @change="onTabChange">
            <van-tab title="公开" name="public" />
            <van-tab title="加密" name="private" />
        </van-tabs>
        <div style="margin-bottom:16px"></div>
        <van-button class="add-button" type="primary" icon="plus" @click="toAddTeam"></van-button>
        <team-card-list :team-list="teamList" />
        <van-empty v-if="teamList?.length < 1" description="数据为空" />
    </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import { onMounted, ref } from "vue";
import myAxios from "../plugins/myAxios.ts";
import { showFailToast } from "vant";
const router = useRouter();
const searchText = ref('');
const active = ref('public')

/**
 * 切换查询状态
 */

const onTabChange = (name) => {
    // 查公开
    if (name === 'public') {
        listTeam(searchText.value, 0);
    } else {
        listTeam(searchText.value, 2);
    }
}

//跳转到加入队伍页面
const toAddTeam = () => {
    router.push({
        path: '/team/add',
    })
}
const teamList = ref([]);
/**
* 搜索队伍
* @param val
* @returns {Promise<void>}
*/
const listTeam = async (val = ' ', status = 0) => {
    const res = await myAxios.get("/team/list", {
        params: {
            searchText: val,
            pageNum: 1,
            status,
        }
    });
    if (res.code === 0) {
        teamList.value = res.data;
    } else {
        showFailToast("获取队伍列表失败，请刷新重试");
    }
}
//只会在页面加载时触发一次
onMounted(() => {
    listTeam();
})
const onSearch = (val) => {
    listTeam(val);
}
</script>
<style scoped>
#teamPage {}
</style>
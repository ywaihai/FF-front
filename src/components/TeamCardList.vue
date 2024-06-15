<template>
  <div id="teamCardList">
    <van-card v-for="team in props.teamList"
      thumb="https://cn.bing.com/images/search?view=detailV2&ccid=v3ywLkq%2f&id=D89204E4B84C3538E42281C942CDE6AAE41008BD&thid=OIP.v3ywLkq_yuiisLQpDZ9wagHaGk&mediaurl=https%3a%2f%2fpic2.zhimg.com%2fv2-02f9c90b9f573e814ce413d8446098b5_r.jpg&exph=958&expw=1080&q=ikun&simid=608006111018950374&FORM=IRPRST&ck=6A255D91B3340A2CE8078891AB8B9AF2&selectedIndex=5&itb=0"
      :desc="team.description" :title="`${team.name}`">
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{
      teamStatusEnum[team.status]
    }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ '队伍人数: ' + team.hasJoinNum + " / " + team.maxNum }}
        </div>
        <div>
          {{ '最大人数: ' + team.maxNum }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间: ' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <!-- 加入队伍： 仅非队伍创建人、且未加入队伍的人可见-->
        <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id &&
      !team.hasJoin" plain @click="preJoinTeam(team)">加入队伍</van-button>
        <!-- 更新队伍：仅创建人可见-->
        <van-button v-if="team.userId === currentUser?.id" size="small" plain
          @click="doUpdateTeam(team.id)">更新队伍</van-button>
        <!-- 解散队伍：仅创建人可见-->
        <van-button size="small" v-if="team.userId !== currentUser?.id && team.hasJoin" plain
          @click="doQuitTeam(team.id)">退出队伍</van-button>
        <!-- 退出队伍：创建人不可见，仅已加入队伍的人可见-->
        <van-button v-if="team.userId === currentUser?.id" size="small" plain type="danger"
          @click="doDeleteTeam(team.id)">解散队伍</van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam"
      @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>
  </div>
</template>
<script setup lang="ts">
import { TeamType } from "../models/team";
import { teamStatusEnum } from "../constants/team";
import myAxios from "../plugins/myAxios";
import { showFailToast, showSuccessToast } from "vant";
import { getCurrentUser } from "../services/user";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentUser = ref();
const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref(0);

const props = withDefaults(defineProps<TeamCardListProps>(), {
  //@ts-ignore
  teamList: [] as TeamType[]
});

interface TeamCardListProps {
  teamList: TeamType[];
}


onMounted(async () => {
  currentUser.value = await getCurrentUser()
})

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam();
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

//加入队伍
const doJoinTeam = async () => {
  if (!joinTeamId) {
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value,
  });
  if (res?.code === 0) {
    showSuccessToast("加入队伍成功");
    doJoinCancel();
  } else {
    showFailToast('加入失败' + (res.description ? `，${res.description}` : ''))
  }
}
/**
* 跳转至更新队伍页面
* @param id
*/
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}
/**
* 退出队伍
* @param id
*/
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res?.code === 0) {
    showSuccessToast('操作成功');
  } else {
    showFailToast('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}
/**
* 解散队伍
* @param id
*/
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id,
  });
  if (res?.code === 0) {
    showSuccessToast('操作成功');
  } else {
    showFailToast('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}
</script>
<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 90px;
  object-fit: unset;
}
</style>
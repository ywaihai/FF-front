import Index from "../pages/Index.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import TalkingPage from "../pages/TalkingPage.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/team', titie:'找队伍', component: TeamPage },
    { path: '/team/add', titie:'创建队伍', component: TeamAddPage },
    { path: '/team/update', titie:'更新队伍', component: TeamUpdatePage },
    { path: '/user', titie:'个人信息', component: UserPage },
    { path: '/search', titie:'找伙伴', component: SearchPage },
    { path: '/user/list', titie:'用户列表', component: SearchResultPage },
    { path: '/user/edit', titie:'编辑信息', component: UserEditPage },
    { path: '/user/login', titie:'登录', component: UserLoginPage },
    { path: '/talk', titie:'聊天', component: TalkingPage},
    // { path: '/user/update', titie:'更新信息', component: UserUpdatePage },
    { path: '/user/team/join', titie:'我加入的队伍', component: UserTeamJoinPage },
    { path: '/user/team/create', titie:'我创建的队伍', component: UserTeamCreatePage },
]

export default routes;

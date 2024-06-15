<template>
    <h1>聊天室</h1>
    <el-scrollbar height="400px" style="border:1px solid #1813131f">
        <div v-for="item in list" :key="item" class="scrollbar-demo-item" :style="{ justifyContent: item.type === 'left' ? 'flex-start' : 'flex-end' }">
            <div class="message-container" :class="{ 'self': item.type === 'right' }">
                <img :src="item.avatarUrl" class="avatar" v-if="item.type === 'left'">
                <div class="message-content">
                    <div class="username">{{ item.name }}</div>
                    <div class="message-text">{{ item.content }}</div>
                </div>
            </div>
        </div>
    </el-scrollbar>
    发送消息：<el-input v-model="msg"></el-input>
    <el-button @click="sendMessage">发送消息</el-button>
</template>

<script setup>
import { reactive, ref, onBeforeUnmount, onMounted } from 'vue'
import { getCurrentUser } from "../services/user";
import { ElMessage } from 'element-plus'

const list = reactive([]);
let socket = null;

const msg = ref("");
const name = ref("");
const user = ref();
const avatarUrl = ref();

onMounted(async () => {
    user.value = await getCurrentUser();
    name.value = user.value.username;
    avatarUrl.value = user.value.avatarUrl;
    console.log(user.value);
    createSocket();
})

const createSocket = () => {
    const wsurl = "ws://localhost:8080/api/chat/" + name.value;
    socket = new WebSocket(wsurl);
    socket.onmessage = websocketOnMessage;
};

const sendMessage = () => {
    if (name.value === "") {
        ElMessage.warning("未登录，无法发送消息");
    } else {
        ElMessage.success("发送消息：" + msg.value);
        const newMessage = {
            name: name.value,
            content: msg.value,
            type: 'right',
            avatarUrl: avatarUrl.value
        };
        socket.send(JSON.stringify(newMessage));
        list.push(newMessage);
        console.log(list);
    }
};

const websocketOnMessage = (res) => {
    if (res.data) {
        ElMessage.success("接收到消息：" + res.data.content);
        const message = {
            name: JSON.parse(res.data).name,
            content: res.data.content,
            type: 'left',
            avatarUrl: JSON.parse(res.data).avatarUrl
        };
        list.push(message);
        console.log(list);
    }
};

onBeforeUnmount(() => {
    if (socket) {
        socket.close();
        socket = null;
    }
});
</script>

<style scoped>
.read-the-docs {
    color: #888;
}

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    margin: 10px;
}

.message-container {
    display: flex;
    align-items: center;
}

.message-container.self {
    flex-direction: row-reverse;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 10px;
}

.message-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.message-content .username {
    font-weight: bold;
}

.message-content .message-text {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 10px;
}
</style>

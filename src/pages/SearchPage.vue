<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

  <div style="padding: 16px;">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>

</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from "vue-router";

const router = useRouter();

const searchText = ref('');
const originTagList = [{
  text: '性别',
  children: [
    {text: '男', id: '男'},
    {text: '女', id: '女'},
  ],
},
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'},
      {text: '毕业', id: '毕业'},
      {text: '工作', id: '工作'},
    ],
  },
  {
    text: '学习方向',
    children: [
      {text: 'java', id: 'java'},
      {text: 'python', id: 'python'},
      {text: 'Go', id: 'Go'},
      {text: '建模', id: '建模'},
    ],
  },
  {
    text: '爱好',
    children: [
      {text: '编程', id: '编程'},
      {text: '看动漫', id: '看动漫'},
      {text: '画画', id: '画画'},
      {text: '歌剧', id: '歌剧'},
      {text: '舞蹈', id: '舞蹈'},
      {text: '赛车', id: '赛车'},
    ],
  },
  {
    text: '运动',
    children: [
      {text: '乒乓球', id: '乒乓球'},
      {text: '羽毛球', id: '羽毛球'},
      {text: '排球', id: '排球'},
      {text: '足球', id: '足球'},
      {text: '篮球', id: '篮球'},
    ],
  },
]

// 标签列表
let tagList = ref(originTagList);

/**
 * 搜索过滤
 */
const onSearch = () => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  });

}
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};

// 已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);

// 移除标签
const doClose = (tag: string) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}

const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}
</script>

<style scoped>

</style>

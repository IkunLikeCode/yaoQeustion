<script setup lang="ts">
import { ElMenu, ElMenuItem } from "element-plus";
import type { ManageLayoutProps } from "../type";
import { useRoute } from "vue-router";
const route = useRoute();
const menuList: ManageLayoutProps["menuList"] = [
  {
    title: "新建问卷",
    path: "question/edit",
    icon: "icon-jia"
  },
  {
    title: "我的问卷",
    path: "manage/list",
    icon: "icon-wode"
  },
  {
    title: "星标问卷",
    path: "manage/star",
    icon: "icon-biaoxing"
  },
  {
    title: "回收站",
    path: "manage/recycle",
    icon: "icon-huishouzhan"
  }
];
</script>

<template>
  <el-menu class="menu-list">
    <el-menu-item class="first-item" :index="menuList[0]!.path">
      <i class="iconfont" :class="menuList[0]!.icon"></i>
      <span>{{ menuList[0]!.title }}</span>
    </el-menu-item>
    <el-menu-item
      v-for="menuItem in menuList.slice(1)"
      :key="menuItem.path"
      class="menu-item"
      :index="menuItem.path"
      :class="route.path === menuItem.path ? 'active' : ''"
    >
      <i class="iconfont" :class="menuItem.icon"></i>
      <span>{{ menuItem.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang="less" scoped>
.menu-list {
  height: 100%;
  border: none;
  width: 150px;
  padding: 10px;
  box-sizing: border-box;
  .first-item {
    background-color: var(--menu-item-bg-color);
    font-size: 20px;
    color: var(--menu-item-font-color);
    border-radius: 10px;
    height: 40px;
    display: flex;
    align-items: center;
    font-weight: 600px;
    user-select: none;
    justify-content: center;
    span {
      margin-left: 5px;
    }
  }
  .menu-item {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 10px 0;
    border: 1px solid #c6c6c6;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600px;
    span {
      margin-left: 5px;
    }
  }
}
.active {
  background-color: var(--menu-item-bg-color);
  color: var(--menu-item-font-color);
}
</style>

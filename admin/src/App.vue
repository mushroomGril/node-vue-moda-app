<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style >
html,
body,
#app,
.el-container {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
}
.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>



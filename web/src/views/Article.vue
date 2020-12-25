<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <i class="iconfont icon-back text-blue"></i>
      <strong class="flex-1 text-blue pl-2">
        {{ model.title }}
      </strong>
      <div class="text-gery fs-xs">{{ model.createAt }}</div>
    </div>
    <div v-html="model.body" class="px-3 article-body"></div>
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-Menu"></i>
        <span class="text-blue fs-lg ml-1">相关资讯</span>
      </div>
      <div class="pt-2">
        <router-link
          class="py-1"
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="item in model.related"
          :key="item._id"
        >
          {{ item.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
    };
  },
  watch: {
    id: "fetch",
    // id(){
    //     this.fetch()
    // }
  },
  methods: {
    async fetch() {
      const res = await this.$axios(`articles/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>
<style lang="scss">
.page-article {
  .icon-back {
    font-size: 1.375rem;
  }
  .article-body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
      margin: -50px 0;
    }
  }
}
</style>
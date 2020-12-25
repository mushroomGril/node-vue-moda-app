<template>
  <div class="">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/4cf0ecba44fbb677b67e2bdd8da5c873.jpeg"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/975a098947ad476f0296d1b0b22aa831.jpeg"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/b8d27b1c132b2396f89bc1d3925672c2.jpeg"
          alt=""
        />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <CardList icon="Menu" title="新闻资讯" :categories="newCats">
      <!-- 用#号表示跟名为items的slot相关并取到绑定的变量 （数据） 这样在父组件就可以不通过循环就能直接拿到子组件的某个变量  -->
      <template #items="{ category }">
        <router-link tag="div" :to="`/articles/${item._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(item, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ item.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
            item.title
          }}</span>
          <span class="text-grey-1 fs-sm">{{ item.createdAt | date }}</span>
        </router-link>
      </template>
    </CardList>
    <CardList icon="card-hero" title="英雄列表" :categories="heroCats">
      <!-- 用#号表示跟名为items的slot相关并取到绑定的变量 （数据） 这样在父组件就可以不通过循环就能直接拿到子组件的某个变量  -->
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="marign:0 -0.5rem">
          <router-link tag="div" :to="`heroes/${hero._id}`" class="p-2 text-center" style="width:20%;" v-for="(hero, i) in category.heroList" :key="i">
            <img class="w-100" :src="hero.avatar" alt="" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </CardList>
  </div>
</template>

<script>
import CardList from "../components/CardList";
import dayjs from "dayjs";
export default {
  //日期过滤器
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  data() {
    return {
      swiperOptions: {
        notNextTick: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        pagination: {
          el: ".pagination-home",
        },
        loop: true, //循环
        autoplay: {
          disableOnInteraction: false,
          delay: 2000,
        },
      },
      newCats: [],
      heroCats: [],
    };
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
  methods: {
    //获取新闻分类
    async fetchNewsCats() {
      const res = await this.$axios.get("news/list");
      this.newCats = res.data;
    },
    //获取英雄fenl
    async fetchHeroCats() {
      const res = await this.$axios.get("heroes/list");
      this.heroCats = res.data;
    },
  },
  components: {
    CardList,
  },
};
</script>
<style lang="scss">
@import "../assets/scss/variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>

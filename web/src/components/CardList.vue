<template>
  <Card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{ active: active === index }"
        v-for="(category, index) in categories"
        :key="index"
        @click="$refs.list.$swiper.slideTo(index)"
      >
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <div class="pt-3">
      <!-- 把swiper上真实的索引值赋值给active -->
      <swiper
        :options="{ autoHeight: true }"
        ref="list"
        @slide-change="() => (active = $refs.list.$swiper.activeIndex)">
        <swiper-slide v-for="(category, index) in categories" :key="index">
          <!-- 插槽 -->
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </Card>
</template>
<script>
import Card from "@/components/Card";

export default {
 
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array },
  },
  data() {
    return {
      active: 0,
    };
  },

  components: {
    Card,
  },
};
</script>

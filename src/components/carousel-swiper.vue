<template>
  <div class="carousel-wrap">
    <div
      class="carousel-container"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div
        class="carousel-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(image, index) in images"
          :key="index"
          class="carousel-item"
        >
          <img
            :src="image"
            :alt="`轮播图${index + 1}`"
            class="carousel-img"
          >
        </div>
      </div>
    </div>

    <!-- 指示器 -->
    <div class="carousel-indicators">
      <span
        v-for="(image, index) in images"
        :key="index"
        class="indicator"
        :class="{ active: currentIndex === index }"
        @click="goToSlide(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Props {
  images: string[];
  autoplay?: boolean;
  interval?: number;
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: true,
  interval: 3000,
});

const currentIndex = ref(0);
let autoplayTimer: number | null = null;
let touchStartX = 0;
let touchEndX = 0;

// 下一张
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

// 上一张
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
};

// 自动播放
const startAutoplay = () => {
  if (!props.autoplay) return;
  autoplayTimer = window.setInterval(() => {
    nextSlide();
  }, props.interval);
};

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

// 跳转到指定幻灯片
const goToSlide = (index: number) => {
  currentIndex.value = index;
  stopAutoplay();
  startAutoplay();
};

// 触摸事件处理
const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX;
  stopAutoplay();
};

const handleTouchMove = (e: TouchEvent) => {
  touchEndX = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  const diff = touchStartX - touchEndX;
  const threshold = 50; // 滑动阈值

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      // 向左滑动，下一张
      nextSlide();
    } else {
      // 向右滑动，上一张
      prevSlide();
    }
  }

  startAutoplay();
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style scoped>
.carousel-wrap {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.carousel-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.carousel-track {
  display: flex;
  transition: transform 0.3s ease;
  will-change: transform;
}

.carousel-item {
  width: 100%;
  flex-shrink: 0;
}

.carousel-img {
  width: 100%;
  height: auto;
  display: block;
}

.carousel-indicators {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: #fff;
  width: 20px;
  border-radius: 3px;
}
</style>

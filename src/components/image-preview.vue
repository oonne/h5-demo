<template>
  <transition name="image-preview-fade">
    <div
      v-if="modelValue"
      class="image-preview-mask"
      @click="handleClose"
    >
      <div
        class="image-preview-content"
        @click.stop
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <img
          :src="currentImageUrl"
          alt="预览图片"
          class="preview-img"
          :style="{ transform: `translateX(${translateX}px)` }"
          @click.stop
        >
        <div
          v-if="images.length > 1"
          class="image-preview-indicator"
        >
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
        <button
          class="image-preview-close"
          @click="handleClose"
        >
          ×
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Props {
  modelValue: boolean;
  images: string[];
  initialIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  initialIndex: 0,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  close: [];
}>();

const currentIndex = ref(props.initialIndex);

// 触摸相关状态
const touchStartX = ref(0);
const touchStartY = ref(0);
const translateX = ref(0);
const isSwiping = ref(false);

// 监听 initialIndex 变化，更新当前索引
watch(() => props.initialIndex, (newIndex) => {
  if (newIndex >= 0 && newIndex < props.images.length) {
    currentIndex.value = newIndex;
  }
}, { immediate: true });

// 监听 visible 变化，重置索引
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    // 打开时重置索引为初始索引
    if (props.initialIndex >= 0 && props.initialIndex < props.images.length) {
      currentIndex.value = props.initialIndex;
    } else {
      currentIndex.value = 0;
    }
    // 重置触摸状态
    translateX.value = 0;
    isSwiping.value = false;
  }
});

const currentImageUrl = computed(() => {
  if (props.images.length === 0) return '';
  return props.images[currentIndex.value] || props.images[0];
});

const handleClose = () => {
  emit('update:modelValue', false);
  emit('close');
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

// 触摸开始
const handleTouchStart = (e: TouchEvent) => {
  if (props.images.length <= 1) return;
  const touch = e.touches[0];
  touchStartX.value = touch.clientX;
  touchStartY.value = touch.clientY;
  isSwiping.value = true;
  translateX.value = 0;
};

// 触摸移动
const handleTouchMove = (e: TouchEvent) => {
  if (!isSwiping.value || props.images.length <= 1) return;
  const touch = e.touches[0];
  const deltaX = touch.clientX - touchStartX.value;
  const deltaY = touch.clientY - touchStartY.value;

  // 判断是否为水平滑动（水平滑动距离大于垂直滑动距离）
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    e.preventDefault(); // 阻止默认滚动行为
    translateX.value = deltaX;
  }
};

// 触摸结束
const handleTouchEnd = (e: TouchEvent) => {
  if (!isSwiping.value || props.images.length <= 1) {
    isSwiping.value = false;
    translateX.value = 0;
    return;
  }

  const touch = e.changedTouches[0];
  const deltaX = touch.clientX - touchStartX.value;
  const deltaY = touch.clientY - touchStartY.value;

  // 判断是否为水平滑动
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      // 向右滑动，显示上一张
      prevImage();
    } else {
      // 向左滑动，显示下一张
      nextImage();
    }
  }

  // 重置状态
  isSwiping.value = false;
  translateX.value = 0;
};
</script>

<style scoped>
.image-preview-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-preview-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
  transition: transform 0.3s ease;
  touch-action: pan-y;
}

.image-preview-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  z-index: 10;
}

.image-preview-close:active {
  opacity: 0.7;
}

.image-preview-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  z-index: 10;
}

/* 图片预览动画 */
.image-preview-fade-enter-active,
.image-preview-fade-leave-active {
  transition: opacity 0.3s;
}

.image-preview-fade-enter-from,
.image-preview-fade-leave-to {
  opacity: 0;
}
</style>

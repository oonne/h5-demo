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
      >
        <img
          :src="currentImageUrl"
          alt="预览图片"
          class="preview-img"
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
        <button
          v-if="images.length > 1"
          class="image-preview-prev"
          @click.stop="prevImage"
        >
          ‹
        </button>
        <button
          v-if="images.length > 1"
          class="image-preview-next"
          @click.stop="nextImage"
        >
          ›
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

.image-preview-prev,
.image-preview-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  z-index: 10;
}

.image-preview-prev {
  left: 20px;
}

.image-preview-next {
  right: 20px;
}

.image-preview-prev:active,
.image-preview-next:active {
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

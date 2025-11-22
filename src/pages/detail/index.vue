<template>
  <div class="page-wrap">
    <!-- 顶部横幅轮播图 -->
    <Carousel
      :images="bannerImages"
      @image-click="handleBannerImageClick"
    />

    <!-- 店铺信息 -->
    <div class="store-info-wrap">
      <div class="store-title">
        【雨花区】盛欣沐足
      </div>
      <div class="store-location">
        长沙雨花万家丽贵宾楼内
      </div>
      <div class="store-desc">
        K歌沐足・女神沐足,环境舒适‧服务热情,老罗粉丝享优惠
      </div>
      <div class="store-tags">
        <span class="tag">K歌沐足</span>
        <span class="tag tag-new">最新入驻</span>
      </div>
    </div>

    <!-- 店铺介绍 -->
    <div class="intro-wrap">
      <div class="intro-title">
        店铺介绍
      </div>
      <div class="intro-images">
        <div
          v-for="(image, index) in displayedImages"
          :key="index"
          class="intro-img-item"
          @click="handleIntroImageClick(image, index)"
        >
          <img
            :src="image"
            alt="店铺图片"
          >
        </div>
      </div>
      <div
        v-if="showMoreBtn"
        class="show-more-btn"
        @click="showAllImages"
      >
        查看更多
      </div>
    </div>

    <!-- 店铺介绍图片预览弹窗 -->
    <transition name="image-preview-fade">
      <div
        v-if="showIntroImagePreview"
        class="image-preview-mask"
        @click="closeIntroImagePreview"
      >
        <div
          class="image-preview-content"
          @click.stop
        >
          <img
            :src="previewIntroImageUrl"
            alt="预览图片"
            class="preview-img"
            @click.stop
          >
          <div class="image-preview-indicator">
            {{ previewIntroImageIndex + 1 }} / {{ introImages.length }}
          </div>
          <button
            class="image-preview-close"
            @click="closeIntroImagePreview"
          >
            ×
          </button>
          <button
            v-if="introImages.length > 1"
            class="image-preview-prev"
            @click.stop="prevIntroImage"
          >
            ‹
          </button>
          <button
            v-if="introImages.length > 1"
            class="image-preview-next"
            @click.stop="nextIntroImage"
          >
            ›
          </button>
        </div>
      </div>
    </transition>

    <!-- 客服 -->
    <div class="service-wrap">
      <div class="service-title">
        客服
      </div>
      <div class="service-desc">
        长按识别二维码添加客服
      </div>
      <div class="qrcode-wrap">
        <img
          src="./img/qrcode.png"
          alt="客服二维码"
          class="qrcode-img"
        >
      </div>
    </div>

    <!-- 底部固定栏 -->
    <div class="bottom-bar">
      <div class="nav-buttons">
        <div class="nav-btn">
          <div class="nav-icon">
            📤
          </div>
          <div class="nav-text">
            分享
          </div>
        </div>
        <div class="nav-btn">
          <div class="nav-icon">
            🏠
          </div>
          <div class="nav-text">
            首页
          </div>
        </div>
      </div>
      <button
        class="contact-btn"
        @click="showContactModal = true"
      >
        查看联系方式
      </button>
    </div>

    <!-- 联系方式弹窗 -->
    <transition name="fade">
      <div
        v-if="showContactModal"
        class="modal-mask"
        @click="showContactModal = false"
      >
        <div
          class="modal-content"
          @click.stop
        >
          <div class="modal-header">
            <div class="modal-title">
              联系方式
            </div>
            <button
              class="modal-close"
              @click="showContactModal = false"
            >
              ×
            </button>
          </div>
          <div class="modal-body">
            <div class="contact-item">
              <div class="contact-label">
                电话
              </div>
              <div class="contact-value">
                13166058387
              </div>
              <button
                class="contact-action-btn"
                @click="handleDial('13166058387')"
              >
                拨打
              </button>
            </div>
            <div class="contact-divider" />
            <div class="contact-item">
              <div class="contact-label">
                微信号
              </div>
              <div class="contact-value">
                19373127569
              </div>
              <button
                class="contact-action-btn"
                @click="handleCopy('19373127569')"
              >
                复制
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 图片预览弹窗 -->
    <transition name="image-preview-fade">
      <div
        v-if="showImagePreview"
        class="image-preview-mask"
        @click="closeImagePreview"
      >
        <div
          class="image-preview-content"
          @click.stop
        >
          <img
            :src="previewImageUrl"
            alt="预览图片"
            class="preview-img"
            @click.stop
          >
          <div class="image-preview-indicator">
            {{ previewImageIndex + 1 }} / {{ bannerImages.length }}
          </div>
          <button
            class="image-preview-close"
            @click="closeImagePreview"
          >
            ×
          </button>
          <button
            v-if="bannerImages.length > 1"
            class="image-preview-prev"
            @click.stop="prevImage"
          >
            ‹
          </button>
          <button
            v-if="bannerImages.length > 1"
            class="image-preview-next"
            @click.stop="nextImage"
          >
            ›
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Carousel from '@/components/carousel-swiper.vue';

const showContactModal = ref(false);
const showImagePreview = ref(false);
const previewImageUrl = ref('');
const previewImageIndex = ref(0);
const showIntroImagePreview = ref(false);
const previewIntroImageUrl = ref('');
const previewIntroImageIndex = ref(0);
const showAllImagesFlag = ref(false);

// 轮播图图片（使用同一张图片三张）
const bannerImages = ref([
  'https://cdn.seovx.com/?mom=302',
  'https://cdn.seovx.com/?mom=302',
  'https://cdn.seovx.com/?mom=302',
]);

// 店铺介绍图片（示例：9张图片）
const introImages = ref([
  'https://cdn.seovx.com/?mom=302',
  'https://cdn.seovx.com/?mom=302',
  'https://cdn.seovx.com/?mom=302',
  'https://cdn.seovx.com/?mom=302',
  'https://cdn.seovx.com/?mom=302',
  'https://cdn.seovx.com/?mom=302',
  'https://cdn.seovx.com/?mom=302',
  'https://cdn.seovx.com/?mom=302',
  'https://cdn.seovx.com/?mom=302',
]);

// 显示的图片列表（默认最多6张，即两行）
const displayedImages = computed(() => {
  if (showAllImagesFlag.value) {
    return introImages.value;
  }
  return introImages.value.slice(0, 6);
});

// 是否显示"查看更多"按钮
const showMoreBtn = computed(() => introImages.value.length > 6 && !showAllImagesFlag.value);

// 显示所有图片
const showAllImages = () => {
  showAllImagesFlag.value = true;
};

// 处理轮播图点击
const handleBannerImageClick = (data: { image: string; index: number }) => {
  previewImageUrl.value = data.image;
  previewImageIndex.value = data.index;
  showImagePreview.value = true;
};

// 关闭图片预览
const closeImagePreview = () => {
  showImagePreview.value = false;
};

// 上一张图片
const prevImage = () => {
  previewImageIndex.value = (previewImageIndex.value - 1 + bannerImages.value.length) % bannerImages.value.length;
  previewImageUrl.value = bannerImages.value[previewImageIndex.value];
};

// 下一张图片
const nextImage = () => {
  previewImageIndex.value = (previewImageIndex.value + 1) % bannerImages.value.length;
  previewImageUrl.value = bannerImages.value[previewImageIndex.value];
};

// 处理店铺介绍图片点击
const handleIntroImageClick = (image: string, index: number) => {
  // 找到原始索引
  const originalIndex = introImages.value.findIndex((img) => img === image);
  previewIntroImageUrl.value = image;
  previewIntroImageIndex.value = originalIndex >= 0 ? originalIndex : index;
  showIntroImagePreview.value = true;
};

// 关闭店铺介绍图片预览
const closeIntroImagePreview = () => {
  showIntroImagePreview.value = false;
};

// 上一张店铺介绍图片
const prevIntroImage = () => {
  previewIntroImageIndex.value = (previewIntroImageIndex.value - 1 + introImages.value.length) % introImages.value.length;
  previewIntroImageUrl.value = introImages.value[previewIntroImageIndex.value];
};

// 下一张店铺介绍图片
const nextIntroImage = () => {
  previewIntroImageIndex.value = (previewIntroImageIndex.value + 1) % introImages.value.length;
  previewIntroImageUrl.value = introImages.value[previewIntroImageIndex.value];
};

// 拨打电话
const handleDial = (phone: string) => {
  window.location.href = `tel:${phone}`;
};

// 复制微信号
const handleCopy = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert('已复制到剪贴板');
    });
  } else {
    // 兼容旧浏览器
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('已复制到剪贴板');
  }
};
</script>

<style scoped>
.page-wrap {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 80px;
}

/* 顶部横幅轮播图样式由组件内部处理 */

/* 店铺信息 */
.store-info-wrap {
  padding: 16px 6.4vw;
  background-color: #fff;
}

.store-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.store-location {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.store-desc {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 12px;
}

.store-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  background-color: #f5f5f5;
  color: #666;
}

.tag-new {
  background-color: #fff3cd;
  color: #856404;
}

/* 店铺介绍 */
.intro-wrap {
  padding: 16px 6.4vw;
  background-color: #fff;
  margin-top: 8px;
}

.intro-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
}

.intro-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.intro-img-item {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5f5f5;
}

.intro-img-item {
  cursor: pointer;
}

.intro-img-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 0.2s;
}

.intro-img-item:active img {
  opacity: 0.8;
}

.show-more-btn {
  margin-top: 12px;
  padding: 10px;
  text-align: center;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  transition: all 0.2s;
}

.show-more-btn:active {
  background-color: #f5f5f5;
  color: #333;
}

/* 店铺信息 */
.store-detail-wrap {
  padding: 16px 6.4vw;
  background-color: #fff;
  margin-top: 8px;
}

.store-detail-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
}

.store-detail-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.store-detail-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.store-detail-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.detail-label {
  font-size: 14px;
  color: #666;
  min-width: 70px;
  flex-shrink: 0;
}

.detail-value {
  font-size: 14px;
  color: #333;
  flex: 1;
  line-height: 1.5;
}

/* 客服 */
.service-wrap {
  padding: 16px 6.4vw;
  background-color: #fff;
  margin-top: 8px;
}

.service-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
}

.service-desc {
  font-size: 14px;
  color: #666;
}

.qrcode-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0;
}

.qrcode-img {
  max-width: 200px;
  width: 100%;
  height: auto;
  display: block;
}

/* 底部固定栏 */
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  z-index: 100;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.nav-buttons {
  display: flex;
  gap: 24px;
  align-items: center;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.nav-icon {
  font-size: 20px;
}

.nav-text {
  font-size: 12px;
  color: #666;
}

.contact-btn {
  flex: 1;
  max-width: 200px;
  height: 44px;
  background-color: #f9e449;
  color: #333;
  border: none;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 16px;
  transition: background-color 0.2s;
}

.contact-btn:active {
  opacity: 0.9;
}

/* 联系方式弹窗 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.modal-content {
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  border-radius: 16px 16px 0 0;
  max-height: 80vh;
  overflow-y: auto;
  transform: translateY(0);
  transition: transform 0.3s ease-out;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.modal-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.modal-close {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 24px;
  color: #333;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.modal-close:active {
  opacity: 0.6;
}

.modal-body {
  padding: 20px 16px;
  padding-bottom: max(20px, env(safe-area-inset-bottom));
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  gap: 12px;
}

.contact-label {
  font-size: 16px;
  color: #333;
  min-width: 60px;
}

.contact-value {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.contact-action-btn {
  padding: 8px 20px;
  background-color: #f9e449;
  color: #333;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s;
}

.contact-action-btn:active {
  opacity: 0.9;
}

.contact-divider {
  height: 1px;
  background-color: #f0f0f0;
  margin: 0;
}

/* 弹窗动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-active .modal-content,
.fade-leave-active .modal-content {
  transition: transform 0.3s ease-out;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-from .modal-content {
  transform: translateY(100%);
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-to .modal-content {
  transform: translateY(100%);
}

/* 图片预览弹窗 */
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

/* 手机端适配 (默认样式，小于 768px) */
@media screen and (max-width: 767px) {
  .store-title {
    font-size: 18px;
  }

  .store-location {
    font-size: 14px;
  }

  .store-desc {
    font-size: 14px;
  }

  .tag {
    font-size: 12px;
  }

  .intro-title {
    font-size: 16px;
  }

  .service-title {
    font-size: 18px;
  }

  .service-desc {
    font-size: 14px;
  }

  .nav-icon {
    font-size: 20px;
  }

  .nav-text {
    font-size: 12px;
  }

  .contact-btn {
    font-size: 16px;
  }

  .modal-title {
    font-size: 18px;
  }

  .contact-label {
    font-size: 16px;
  }

  .contact-value {
    font-size: 16px;
  }

  .contact-action-btn {
    font-size: 14px;
  }
}

/* iPad 端适配 (768px - 1024px) */
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .store-info-wrap {
    padding: 20px 6.4vw;
  }

  .store-title {
    font-size: 22px;
    margin-bottom: 10px;
  }

  .store-location {
    font-size: 16px;
    margin-bottom: 14px;
  }

  .store-desc {
    font-size: 16px;
    margin-bottom: 14px;
    line-height: 1.6;
  }

  .store-tags {
    gap: 10px;
  }

  .tag {
    font-size: 14px;
    padding: 5px 14px;
    border-radius: 14px;
  }

  .intro-wrap {
    padding: 20px 6.4vw;
    margin-top: 10px;
  }

  .intro-title {
    font-size: 18px;
    margin-bottom: 14px;
  }

  .intro-images {
    gap: 10px;
  }

  .intro-img-item {
    border-radius: 10px;
  }

  .service-wrap {
    padding: 20px 6.4vw;
    margin-top: 10px;
  }

  .service-title {
    font-size: 20px;
    margin-bottom: 14px;
  }

  .service-desc {
    font-size: 16px;
  }

  .qrcode-wrap {
    padding: 24px 0;
  }

  .qrcode-img {
    max-width: 240px;
  }

  .bottom-bar {
    padding: 14px 20px;
  }

  .nav-buttons {
    gap: 28px;
  }

  .nav-icon {
    font-size: 24px;
  }

  .nav-text {
    font-size: 14px;
  }

  .contact-btn {
    height: 48px;
    font-size: 18px;
    border-radius: 24px;
    max-width: 220px;
    margin-left: 20px;
  }

  .modal-header {
    padding: 20px;
  }

  .modal-title {
    font-size: 20px;
  }

  .modal-close {
    font-size: 28px;
    width: 36px;
    height: 36px;
    right: 20px;
  }

  .modal-body {
    padding: 24px 20px;
  }

  .contact-item {
    padding: 18px 0;
    gap: 16px;
  }

  .contact-label {
    font-size: 18px;
    min-width: 70px;
  }

  .contact-value {
    font-size: 18px;
  }

  .contact-action-btn {
    padding: 10px 24px;
    font-size: 16px;
    border-radius: 22px;
  }
}

/* 大屏 iPad 和桌面端适配 (大于 1024px) */
@media screen and (min-width: 1025px) {
  .store-info-wrap {
    padding: 24px 6.4vw;
    max-width: 1200px;
    margin: 0 auto;
  }

  .store-title {
    font-size: 24px;
    margin-bottom: 12px;
  }

  .store-location {
    font-size: 17px;
    margin-bottom: 16px;
  }

  .store-desc {
    font-size: 17px;
    margin-bottom: 16px;
    line-height: 1.6;
  }

  .store-tags {
    gap: 12px;
  }

  .tag {
    font-size: 15px;
    padding: 6px 16px;
    border-radius: 16px;
  }

  .intro-wrap {
    padding: 24px 6.4vw;
    margin-top: 12px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .intro-title {
    font-size: 20px;
    margin-bottom: 16px;
  }

  .intro-images {
    gap: 12px;
  }

  .intro-img-item {
    border-radius: 12px;
  }

  .service-wrap {
    padding: 24px 6.4vw;
    margin-top: 12px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .service-title {
    font-size: 22px;
    margin-bottom: 16px;
  }

  .service-desc {
    font-size: 17px;
  }

  .qrcode-wrap {
    padding: 28px 0;
  }

  .qrcode-img {
    max-width: 280px;
  }

  .bottom-bar {
    padding: 16px 24px;
    max-width: 1200px;
    left: 50%;
    transform: translateX(-50%);
  }

  .nav-buttons {
    gap: 32px;
  }

  .nav-icon {
    font-size: 26px;
  }

  .nav-text {
    font-size: 15px;
  }

  .contact-btn {
    height: 50px;
    font-size: 18px;
    border-radius: 25px;
    max-width: 240px;
    margin-left: 24px;
  }

  .contact-btn:hover {
    opacity: 0.9;
  }

  .modal-content {
    max-width: 600px;
    border-radius: 20px 20px 0 0;
  }

  .modal-header {
    padding: 24px;
  }

  .modal-title {
    font-size: 22px;
  }

  .modal-close {
    font-size: 30px;
    width: 40px;
    height: 40px;
    right: 24px;
  }

  .modal-close:hover {
    opacity: 0.7;
  }

  .modal-body {
    padding: 28px 24px;
  }

  .contact-item {
    padding: 20px 0;
    gap: 20px;
  }

  .contact-label {
    font-size: 18px;
    min-width: 80px;
  }

  .contact-value {
    font-size: 18px;
  }

  .contact-action-btn {
    padding: 12px 28px;
    font-size: 17px;
    border-radius: 24px;
  }

  .contact-action-btn:hover {
    opacity: 0.9;
  }
}
</style>

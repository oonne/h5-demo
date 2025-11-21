<template>
  <div class="page-wrap">
    <!-- 顶部横幅 -->
    <div class="banner-wrap">
      <img
        src="https://cdn.seovx.com/?mom=302"
        alt="店铺横幅"
        class="banner-img"
      >
    </div>

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
          v-for="i in 6"
          :key="i"
          class="intro-img-item"
        >
          <img
            src="https://cdn.seovx.com/?mom=302"
            alt="店铺图片"
          >
        </div>
      </div>
    </div>

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
      <button class="contact-btn">
        查看联系方式
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.page-wrap {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 80px;
}

/* 顶部横幅 */
.banner-wrap {
  width: 100%;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: auto;
  display: block;
}

/* 店铺信息 */
.store-info-wrap {
  padding: 16px;
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
  padding: 16px;
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

.intro-img-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 客服 */
.service-wrap {
  padding: 16px;
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
  background-color: #ffd700;
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
  background-color: #ffc700;
}
</style>

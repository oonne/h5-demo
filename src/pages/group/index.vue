<template>
  <div class="page-wrap">
    <div class="content">
      <h2>交流群</h2>
      <p>交流群页面</p>
    </div>
  </div>

  <BottomNav />
</template>

<script setup lang="ts">
import BottomNav from '@/components/bottom-nav.vue';
</script>

<style scoped>
.page-wrap {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px 16px;
  padding-bottom: 80px; /* 为底导航留出空间 */
}

.content {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 12px;
}

p {
  font-size: 14px;
  color: #666;
}
</style>

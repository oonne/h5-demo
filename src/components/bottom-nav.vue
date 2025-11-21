<template>
  <div class="bottom-nav">
    <div
      v-for="item in bottomNavConfig"
      :key="item.routeName"
      class="nav-item"
      :class="{ active: $route.name === item.routeName }"
      @click="goToPage(item.path)"
    >
      <div class="nav-icon">
        <svg
          v-if="$route.name === item.routeName"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path :d="item.activeIconPath" />
        </svg>
        <svg
          v-else
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path :d="item.inactiveIconPath" />
        </svg>
      </div>
      <span class="nav-text">{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { bottomNavConfig } from '@/config/bottom-nav';

const router = useRouter();

const goToPage = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  padding: 8px 0;
  z-index: 1000;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;
  padding: 4px 0;
}

.nav-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
}

.nav-item:not(.active) .nav-icon {
  color: #999;
}

.nav-item.active .nav-icon {
  color: #333;
}

.nav-text {
  font-size: 12px;
  line-height: 1;
}

.nav-item:not(.active) .nav-text {
  color: #999;
}

.nav-item.active .nav-text {
  color: #333;
  font-weight: 500;
}
</style>

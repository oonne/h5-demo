<template>
  <div class="bottom-nav">
    <div
      class="nav-item"
      :class="{ active: $route.name === 'index' }"
      @click="goToPage('/index')"
    >
      <div class="nav-icon">
        <svg
          v-if="$route.name === 'index'"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <svg
          v-else
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </div>
      <span class="nav-text">首页</span>
    </div>
    <div
      class="nav-item"
      :class="{ active: $route.name === 'group' }"
      @click="goToPage('/group')"
    >
      <div class="nav-icon">
        <svg
          v-if="$route.name === 'group'"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
        </svg>
        <svg
          v-else
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
        </svg>
      </div>
      <span class="nav-text">交流群</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

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

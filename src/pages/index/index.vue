<template>
  <div class="page-wrap">
    <!-- Banner 轮播图 -->
    <Carousel :images="bannerImages" />

    <!-- 搜索框 -->
    <div class="search-wrap">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          placeholder="请输入店铺名称"
          class="search-input"
        >
        <button class="search-btn">
          搜索
        </button>
      </div>
    </div>

    <!-- 功能按钮 -->
    <div class="action-buttons">
      <div class="action-btn white-btn">
        <div class="btn-content">
          <div class="btn-main">
            <span>店铺入驻</span>
            <span class="arrow">→</span>
          </div>
          <div class="btn-desc">
            诚邀商家共创热店传奇
          </div>
        </div>
      </div>
      <div class="action-btn yellow-btn">
        <div class="btn-content">
          <div class="btn-main">
            <span>最新入驻</span>
            <span class="arrow">→</span>
          </div>
          <div class="btn-desc">
            新鲜出炉的潜力好店
          </div>
        </div>
      </div>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-wrap">
      <div
        v-if="selectedCity"
        class="filter-item"
        @click="clearCity"
      >
        <span class="filter-tag">{{ selectedCity }} ×</span>
      </div>
      <div
        class="filter-item"
        @click="toggleFilterModal('city')"
      >
        <span>{{ selectedDistrict }} ▾</span>
      </div>
      <div
        class="filter-item"
        @click="toggleFilterModal('sort')"
      >
        <span>{{ selectedSort.label }} ▾</span>
      </div>
      <div
        class="filter-item"
        @click="toggleFilterModal('filter')"
      >
        <span>{{ selectedFilter.label }} ▾</span>
      </div>
    </div>

    <!-- 筛选底部弹窗 -->
    <transition name="filter-fade">
      <div
        v-if="showFilterModal"
        class="filter-modal-mask"
        @click="closeFilterModal"
      >
        <div
          class="filter-modal-content"
          @click.stop
        >
          <div class="filter-modal-header">
            <div class="filter-modal-title">
              {{ getFilterModalTitle() }}
            </div>
            <button
              class="filter-modal-close"
              @click="closeFilterModal"
            >
              ×
            </button>
          </div>
          <div class="filter-modal-body">
            <!-- 区县选择 -->
            <template v-if="currentFilterType === 'city'">
              <div
                v-for="district in districts"
                :key="district"
                class="filter-modal-item"
                :class="{ active: selectedDistrict === district }"
                @click="selectDistrict(district)"
              >
                {{ district }}
              </div>
            </template>
            <!-- 排序选择 -->
            <template v-if="currentFilterType === 'sort'">
              <div
                v-for="option in sortOptions"
                :key="option.value"
                class="filter-modal-item"
                :class="{ active: selectedSort.value === option.value }"
                @click="selectSort(option)"
              >
                {{ option.label }}
              </div>
            </template>
            <!-- 筛选选择 -->
            <template v-if="currentFilterType === 'filter'">
              <div
                v-for="option in filterOptions"
                :key="option.value"
                class="filter-modal-item"
                :class="{ active: selectedFilter.value === option.value }"
                @click="selectFilter(option)"
              >
                {{ option.label }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </transition>

    <!-- 列表 -->
    <div class="list-wrap">
      <div
        v-for="store in filteredStores"
        :key="store.id"
        class="store-card"
        @click="goToDetail(store.id)"
      >
        <div class="store-image">
          <img
            :src="store.image"
            :alt="store.name"
          >
        </div>
        <div class="store-info">
          <div class="store-title">
            【{{ store.district }}】{{ store.name }}
          </div>
          <div class="store-location">
            {{ store.province }}·{{ store.city }}
          </div>
          <div class="store-tags">
            <span class="tag rank-tag">#{{ store.rank }}</span>
            <span
              v-for="tag in store.tags"
              :key="tag"
              class="tag"
              :class="getTagClass(tag)"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="store-arrow">
          →
        </div>
      </div>
    </div>
  </div>

  <BottomNav />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import mockData from '@/constant/mockData.json';
import Carousel from '@/components/carousel-swiper.vue';
import BottomNav from '@/components/bottom-nav.vue';
import banner1 from './img/banner.png';

const router = useRouter();

// 轮播图图片（使用同一张图片三张）
const bannerImages = ref([
  banner1,
  banner1,
  banner1,
]);

// 数据
const stores = ref(mockData.stores);
const districts = ref(mockData.districts);
const sortOptions = ref(mockData.sortOptions);
const filterOptions = ref(mockData.filterOptions);

// 筛选状态
const selectedCity = ref('东莞市');
const selectedDistrict = ref('全部');
const selectedSort = ref(sortOptions.value[0]);
const selectedFilter = ref(filterOptions.value[0]);
const showFilterModal = ref(false);
const currentFilterType = ref<'city' | 'sort' | 'filter' | null>(null);

// 关闭筛选弹窗
const closeFilterModal = () => {
  showFilterModal.value = false;
  currentFilterType.value = null;
};

// 打开筛选弹窗
const toggleFilterModal = (type: 'city' | 'sort' | 'filter') => {
  if (showFilterModal.value && currentFilterType.value === type) {
    closeFilterModal();
  } else {
    currentFilterType.value = type;
    showFilterModal.value = true;
  }
};

// 获取弹窗标题
const getFilterModalTitle = () => {
  if (currentFilterType.value === 'city') return '选择区县';
  if (currentFilterType.value === 'sort') return '选择排序';
  if (currentFilterType.value === 'filter') return '选择筛选';
  return '';
};

// 清除城市
const clearCity = () => {
  selectedCity.value = '';
};

// 选择区县
const selectDistrict = (district: string) => {
  selectedDistrict.value = district;
  closeFilterModal();
};

// 选择排序
const selectSort = (option: { label: string; value: string }) => {
  selectedSort.value = option;
  closeFilterModal();
};

// 选择筛选
const selectFilter = (option: { label: string; value: string }) => {
  selectedFilter.value = option;
  closeFilterModal();
};

// 获取标签样式类
const getTagClass = (tag: string) => {
  const tagMap: Record<string, string> = {
    最新入驻: 'tag-new',
    热门店铺: 'tag-hot',
    好评店铺: 'tag-good',
  };
  return tagMap[tag] || '';
};

// 过滤后的店铺列表
const filteredStores = computed(() => {
  let result = [...stores.value];

  // 区县筛选
  if (selectedDistrict.value !== '全部') {
    result = result.filter(
      (store) => store.district === selectedDistrict.value,
    );
  }

  // 筛选条件
  if (selectedFilter.value.value !== 'all') {
    result = result.filter((store) => store.tags.includes(selectedFilter.value.label));
  }

  // 排序
  if (selectedSort.value.value === 'newest') {
    result = result.filter((store) => store.tags.includes('最新入驻'));
  } else if (selectedSort.value.value === 'popular') {
    result = result.filter((store) => store.tags.includes('热门店铺'));
  } else if (selectedSort.value.value === 'rating') {
    result = result.filter((store) => store.tags.includes('好评店铺'));
  }

  return result;
});

// 跳转详情
const goToDetail = (id: number) => {
  router.push(`/detail?id=${id}`);
};
</script>

<style scoped>
.page-wrap {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 80px; /* 为底导航留出空间 */
}

/* Banner 轮播图样式由组件内部处理 */

/* 搜索框 */
.search-wrap {
  padding: 12px 6.4vw;
  background-color: #fff;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 8px 12px;
  gap: 8px;
}

.search-icon {
  font-size: 16px;
  color: #999;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  color: #333;
}

.search-input::placeholder {
  color: #999;
}

.search-btn {
  background-color: #f9e449;
  color: #333;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

/* 功能按钮 */
.action-buttons {
  display: flex;
  gap: 12px;
  padding: 12px 6.4vw;
  background-color: #fff;
}

.action-btn {
  flex: 1;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.white-btn {
  background-color: #fff;
  border: 1px solid #e0e0e0;
}

.yellow-btn {
  background-color: #f9e449;
}

.btn-content {
  position: relative;
  z-index: 1;
}

.btn-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.arrow {
  font-size: 16px;
}

.btn-desc {
  font-size: 11px;
  color: #666;
}

/* 筛选栏 */
.filter-wrap {
  display: flex;
  gap: 8px;
  padding: 12px 6.4vw;
  background-color: #fff;
  flex-wrap: wrap;
}

.filter-item {
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  position: relative;
}

.filter-tag {
  color: #333;
}

/* 筛选底部弹窗 */
.filter-modal-mask {
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

.filter-modal-content {
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  border-radius: 16px 16px 0 0;
  max-height: 70vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform: translateY(0);
  transition: transform 0.3s ease-out;
}

.filter-modal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
  flex-shrink: 0;
}

.filter-modal-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  text-align: center;
}

.filter-modal-close {
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

.filter-modal-close:active {
  opacity: 0.6;
}

.filter-modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
  max-height: calc(70vh - 60px);
}

.filter-modal-item {
  padding: 14px 6.4vw;
  font-size: 15px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: center;
  position: relative;
}

.filter-modal-item:active {
  background-color: #f5f5f5;
}

.filter-modal-item.active {
  color: #f9e449;
  font-weight: 500;
}

.filter-modal-item.active::after {
  content: '✓';
  position: absolute;
  right: 6.4vw;
  top: 50%;
  transform: translateY(-50%);
  color: #f9e449;
}

/* 弹窗动画 */
.filter-fade-enter-active,
.filter-fade-leave-active {
  transition: opacity 0.3s;
}

.filter-fade-enter-active .filter-modal-content,
.filter-fade-leave-active .filter-modal-content {
  transition: transform 0.3s ease-out;
}

.filter-fade-enter-from {
  opacity: 0;
}

.filter-fade-enter-from .filter-modal-content {
  transform: translateY(100%);
}

.filter-fade-leave-to {
  opacity: 0;
}

.filter-fade-leave-to .filter-modal-content {
  transform: translateY(100%);
}

/* 列表 */
.list-wrap {
  padding: 12px 6.4vw;
}

.store-card {
  display: flex;
  gap: 12px;
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: box-shadow 0.2s;
  min-height: 120px;
}

.store-card:active {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.store-image {
  width: 100px;
  height: 100px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
}

.store-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.store-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100px;
}

.store-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
  margin-bottom: 6px;
}

.store-location {
  font-size: 12px;
  color: #999;
  margin-bottom: auto;
}

.store-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 44px;
  overflow: hidden;
  align-items: flex-end;
}

.tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  background-color: #f5f5f5;
  color: #666;
}

.rank-tag {
  background-color: #f9e449;
  color: #333;
  font-weight: 500;
}

.tag-new {
  background-color: #fff3cd;
  color: #856404;
}

.tag-hot {
  background-color: #f8d7da;
  color: #721c24;
}

.tag-good {
  background-color: #d4edda;
  color: #155724;
}

.store-arrow {
  font-size: 18px;
  color: #ccc;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

/* 手机端适配 (默认样式，小于 768px) */
@media screen and (max-width: 767px) {
  .search-icon {
    font-size: 16px;
  }

  .search-input {
    font-size: 13px;
  }

  .search-btn {
    font-size: 13px;
  }

  .btn-main {
    font-size: 14px;
  }

  .arrow {
    font-size: 16px;
  }

  .btn-desc {
    font-size: 11px;
  }

  .filter-item {
    font-size: 13px;
  }

  .dropdown-item {
    font-size: 13px;
  }

  .store-title {
    font-size: 15px;
  }

  .store-location {
    font-size: 12px;
  }

  .tag {
    font-size: 10px;
  }

  .store-arrow {
    font-size: 18px;
  }
}

/* iPad 端适配 (768px - 1024px) */
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .search-wrap {
    padding: 14px 6.4vw;
  }

  .search-icon {
    font-size: 18px;
  }

  .search-input {
    font-size: 15px;
  }

  .search-btn {
    font-size: 15px;
    padding: 7px 18px;
  }

  .action-buttons {
    padding: 14px 6.4vw;
  }

  .action-btn {
    padding: 14px;
  }

  .btn-main {
    font-size: 17px;
  }

  .arrow {
    font-size: 20px;
  }

  .btn-desc {
    font-size: 13px;
  }

  .filter-wrap {
    padding: 14px 6.4vw;
  }

  .filter-item {
    font-size: 15px;
    padding: 8px 14px;
  }

  .dropdown-item {
    font-size: 15px;
    padding: 12px 18px;
  }

  .list-wrap {
    padding: 14px 6.4vw;
  }

  .store-card {
    padding: 16px;
    gap: 16px;
  }

  .store-image {
    width: 120px;
    height: 120px;
  }

  .store-title {
    font-size: 17px;
  }

  .store-location {
    font-size: 13px;
  }

  .tag {
    font-size: 11px;
    padding: 3px 10px;
  }

  .store-arrow {
    font-size: 22px;
  }
}

/* 大屏 iPad 和桌面端适配 (大于 1024px) */
@media screen and (min-width: 1025px) {
  .search-wrap {
    padding: 16px 6.4vw;
    max-width: 1200px;
    margin: 0 auto;
  }

  .search-icon {
    font-size: 20px;
  }

  .search-input {
    font-size: 16px;
  }

  .search-btn {
    font-size: 16px;
    padding: 8px 20px;
  }

  .action-buttons {
    padding: 16px 6.4vw;
    max-width: 1200px;
    margin: 0 auto;
  }

  .action-btn {
    padding: 16px;
  }

  .btn-main {
    font-size: 18px;
  }

  .arrow {
    font-size: 22px;
  }

  .btn-desc {
    font-size: 14px;
  }

  .filter-wrap {
    padding: 16px 6.4vw;
    max-width: 1200px;
    margin: 0 auto;
  }

  .filter-item {
    font-size: 16px;
    padding: 8px 16px;
  }

  .dropdown-item {
    font-size: 16px;
    padding: 12px 20px;
  }

  .list-wrap {
    padding: 16px 6.4vw;
    max-width: 1200px;
    margin: 0 auto;
  }

  .store-card {
    padding: 18px;
    gap: 18px;
  }

  .store-image {
    width: 140px;
    height: 140px;
  }

  .store-title {
    font-size: 18px;
  }

  .store-location {
    font-size: 14px;
  }

  .tag {
    font-size: 12px;
    padding: 4px 12px;
  }

  .store-arrow {
    font-size: 24px;
  }
}
</style>

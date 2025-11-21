/*
 * 底部导航配置
 */

export interface BottomNavItem {
  // 显示名称
  name: string;
  // 路由名称（用于判断是否激活）
  routeName: string;
  // 路由路径
  path: string;
  // 激活状态的 SVG path
  activeIconPath: string;
  // 未激活状态的 SVG path
  inactiveIconPath: string;
}

export const bottomNavConfig: BottomNavItem[] = [
  {
    name: '首页',
    routeName: 'index',
    path: '/index',
    activeIconPath: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    inactiveIconPath: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  },
  {
    name: '交流群',
    routeName: 'group',
    path: '/group',
    activeIconPath: 'M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z',
    inactiveIconPath: 'M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z',
  },
];

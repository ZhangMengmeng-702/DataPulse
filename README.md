# DataPulse · 数据脉动

> 生产实习——数据脉动
>
> 一个公开的数据可视化大屏项目

DataPulse（数据脉动）是一个用于构建实时数据可视化大屏的开源项目，以"脉动数据、实时感知、全局洞察"为核心理念，主打未来科技风、极简大气、动态流畅，适配企业级全局数据监控、业务态势研判、数据运营展示场景。

## ✨ 特性

- 📊 丰富的可视化图表组件（ECharts 5.4）
- 🖥️ 1920×1080 基准自适应缩放，适配任意大屏尺寸
- ⚡ 5 秒脉动刷新，数据实时跳动更新
- 🎨 未来科技风设计：深空底色 + 冰蓝脉动主色 + 星空粒子背景
- 🔌 工程化架构（Vue3 + Vite + Pinia），易于扩展与二次开发
- 🗺️ 全国态势地图，数据活跃点位持续向外扩散光圈（脉动特效）

## 🧱 技术架构（方案二：Vue3 + Vite 现代化架构）

| 维度     | 选型                                 |
| -------- | ------------------------------------ |
| 前端框架 | Vue 3（`<script setup>` 组合式 API） |
| 构建工具 | Vite 5                               |
| 状态管理 | Pinia                                |
| 可视化   | ECharts 5.4                          |
| 样式     | Tailwind CSS 3 + 原生 CSS 变量/动画  |
| 数据请求 | Axios（已预留真实接口切换点）        |

## 🚀 快速开始

```bash
# 克隆仓库
git clone git@github.com:ZhangMengmeng-702/DataPulse.git

# 进入项目目录
cd DataPulse

# 安装依赖（如全局缓存无权限，可指定缓存目录）
npm install --cache C:\Users\你的用户名\.npm-cache

# 启动开发服务（默认 5173 端口，自动唤起浏览器）
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview
```

## 📁 项目结构

```
DataPulse/
├── index.html                 # 入口 HTML
├── package.json               # 依赖与脚本
├── vite.config.js             # Vite 配置（含自动打开浏览器）
├── tailwind.config.js         # Tailwind 主题（DataPulse 色彩体系）
├── postcss.config.js
├── src/
│   ├── main.js                # 应用入口（挂载 Pinia）
│   ├── App.vue                # 根组件（布局 + 自适应缩放 + 5秒刷新）
│   ├── style.css              # 全局设计系统（色彩/字体/动效）
│   ├── stores/
│   │   └── dashboard.js       # Pinia 数据仓库（5秒脉动刷新）
│   ├── utils/
│   │   └── mockData.js        # 模拟数据生成器
│   └── components/
│       ├── BaseChart.vue      # ECharts 通用封装
│       ├── StarfieldBg.vue    # 星空粒子背景
│       ├── DashboardHeader.vue# 顶部通栏（品牌/主题/时间）
│       ├── CoreMetrics.vue    # 中上核心指标区
│       ├── MetricCard.vue     # 指标卡片（脉动数字 + 趋势曲线）
│       ├── MainVisualization.vue # 中部三分栏容器
│       ├── BottomPanel.vue    # 底部辅助数据区
│       └── panels/
│           ├── LeftPanel.vue  # 数据来源/流量排行/日志滚动
│           ├── CenterMap.vue  # 全国态势地图（脉动扩散）
│           └── RightPanel.vue # 趋势/类型占比/系统状态
├── LICENSE                    # MIT 开源协议
└── README.md
```

## 🎨 视觉规范

- 主背景色：`#081021`（深空深蓝）
- 主品牌色：`#00D8FF`（冰蓝脉动）
- 辅助色：`#00E4C8`（科技青）、`#7B61FF`（活力紫）
- 警示色：`#FF5D73`
- 文字：主色 `#FFFFFF`、辅色 `#B0C4DE`

## 🗺️ 布局结构（1920×1080）

- 顶部通栏（8%）：品牌 LOGO + 核心主题 + 实时时间/刷新提示
- 中上核心指标区（15%）：5 个脉动指标卡片
- 中部主体可视化区（55%）：左（25%）明细看板 / 中（50%）态势地图 / 右（25%）趋势监控
- 底部辅助数据区（22%）：细分业务 / 预警统计 / 接口态势

## 🔌 对接真实数据

`src/stores/dashboard.js` 中已预留 `USE_API` 开关与 `API_BASE` 配置，将 `USE_API` 改为 `true` 并配置后端接口即可从模拟数据切换为真实业务数据，无需改动任何组件。

## 🤝 贡献

欢迎通过 Issue 和 Pull Request 参与项目共建。本项目将持续维护与迭代。

## 📄 开源协议

本项目基于 [MIT 协议](./LICENSE) 开源，可自由使用、修改和分发。

---

Copyright © 2026 DataPulse 数据脉动

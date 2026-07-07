// ============================================================
// DataPulse 数据脉动 · 模拟数据生成器
// 提供 5 秒脉动刷新所需的随机合理波动数据
// 后续可替换为 Axios 真实接口（store 中已预留切换点）
// ============================================================

const rand = (min, max) => Math.random() * (max - min) + min
const randInt = (min, max) => Math.floor(rand(min, max + 1))

// 核心指标：5 大通用指标
export function genCoreMetrics(prev) {
    const defs = [
        { key: 'throughput', name: '数据总吞吐量', unit: 'TB', base: 1280 },
        { key: 'nodes', name: '实时在线节点', unit: '个', base: 326 },
        { key: 'increment', name: '今日数据增量', unit: '万条', base: 89 },
        { key: 'accuracy', name: '数据准确率', unit: '%', base: 99.2 },
        { key: 'alarm', name: '异常告警数量', unit: '条', base: 12 }
    ]
    return defs.map((d) => {
        const old = prev?.find((p) => p.key === d.key)?.value ?? d.base
        let value = old + rand(-d.base * 0.04, d.base * 0.04)
        value = Math.max(d.base * 0.6, value)
        if (d.key === 'accuracy') value = Math.min(100, value)
        const trendData = Array.from({ length: 12 }, () => rand(d.base * 0.8, d.base * 1.2))
        const trend = value > old ? 'up' : value < old ? 'down' : 'flat'
        return {
            ...d,
            value: +value.toFixed(d.key === 'accuracy' ? 1 : 0),
            trend,
            trendData
        }
    })
}

// 数据来源分布（饼图）
export function genDataSource() {
    return [
        { name: '传感器采集', value: randInt(280, 360) },
        { name: '业务 API', value: randInt(220, 300) },
        { name: '日志流', value: randInt(160, 240) },
        { name: '数据库同步', value: randInt(120, 200) },
        { name: '第三方接入', value: randInt(60, 120) }
    ]
}

// 时段数据流量排行 TOP10（横向柱状图）
export function genTrafficRank() {
    const hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
    return hours
        .map((h) => ({ hour: h, value: randInt(120, 980) }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10)
}

// 最新数据日志（滚动列表）
const LOG_TEMPLATES = [
    { level: 'info', msg: '节点 node-{n} 数据上报成功' },
    { level: 'info', msg: 'API 网关吞吐正常，延迟 {n}ms' },
    { level: 'warn', msg: '区域 {r} 数据延迟升高，请关注' },
    { level: 'error', msg: '采集任务 task-{n} 连接超时' },
    { level: 'info', msg: '数据质量校验通过，准确率 {n}%' },
    { level: 'warn', msg: '存储水位达到 {n}%，建议扩容' }
]
const REGIONS = ['华东', '华北', '华南', '西南', '东北', '西北']
export function genLog() {
    const t = LOG_TEMPLATES[randInt(0, LOG_TEMPLATES.length - 1)]
    const msg = t.msg
        .replace('{n}', randInt(10, 999))
        .replace('{r}', REGIONS[randInt(0, REGIONS.length - 1)])
    const now = new Date()
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
    return { id: now.getTime() + randInt(0, 999), time, level: t.level, msg }
}

// 24 小时数据波动趋势（折线面积图）
export function genTrend24h(prev) {
    const base = prev ?? Array.from({ length: 24 }, () => randInt(200, 800))
    return base.map((v) => Math.max(120, Math.round(v + rand(-80, 80))))
}

// 数据类型占比（环形图）
export function genDataType() {
    return [
        { name: '结构化数据', value: randInt(420, 520) },
        { name: '半结构化数据', value: randInt(260, 340) },
        { name: '非结构化数据', value: randInt(180, 260) }
    ]
}

// 系统运行状态监控（进度条 + 状态）
export function genSystemStatus(prev) {
    const defs = [
        { name: '采集服务', base: 96 },
        { name: '计算引擎', base: 92 },
        { name: '存储集群', base: 88 },
        { name: '消息队列', base: 95 },
        { name: '告警中心', base: 99 }
    ]
    return defs.map((d) => {
        const old = prev?.find((p) => p.name === d.name)?.percent ?? d.base
        const percent = Math.min(100, Math.max(60, Math.round(old + rand(-3, 3))))
        return { name: d.name, percent, status: percent > 80 ? 'normal' : 'error' }
    })
}

// 底部辅助区：细分业务数据
export function genBizData() {
    return [
        { name: '交易业务', value: randInt(1200, 1800), unit: '万' },
        { name: '用户行为', value: randInt(800, 1400), unit: '万' },
        { name: '设备遥测', value: randInt(600, 1200), unit: '万' },
        { name: '风控事件', value: randInt(80, 260), unit: '件' }
    ]
}

// 底部辅助区：数据预警统计
export function genAlarmStat() {
    return [
        { name: '已处理', value: randInt(40, 80), color: 'var(--dp-cyan)' },
        { name: '处理中', value: randInt(10, 30), color: 'var(--dp-brand)' },
        { name: '待处理', value: randInt(2, 12), color: 'var(--dp-warn)' }
    ]
}

// 底部辅助区：接口调用态势
export function genApiStat(prev) {
    const base = prev ?? Array.from({ length: 7 }, () => randInt(200, 900))
    return base.map((v, i) => ({
        day: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'][i],
        success: Math.max(150, Math.round(v + rand(-60, 60))),
        fail: Math.max(2, Math.round(rand(2, 40)))
    }))
}

// 地图活跃点位（含经纬度，用于 ripple 扩散特效）
export function genMapPoints() {
    const cities = [
        { name: '北京', coord: [116.4, 39.9] },
        { name: '上海', coord: [121.47, 31.23] },
        { name: '广州', coord: [113.26, 23.13] },
        { name: '深圳', coord: [114.06, 22.55] },
        { name: '成都', coord: [104.07, 30.57] },
        { name: '杭州', coord: [120.15, 30.27] },
        { name: '武汉', coord: [114.3, 30.6] },
        { name: '西安', coord: [108.95, 34.27] },
        { name: '沈阳', coord: [123.43, 41.8] },
        { name: '乌鲁木齐', coord: [87.62, 43.82] },
        { name: '昆明', coord: [102.71, 25.04] },
        { name: '哈尔滨', coord: [126.53, 45.8] }
    ]
    return cities.map((c) => ({
        name: c.name,
        value: [...c.coord, randInt(40, 100)]
    }))
}

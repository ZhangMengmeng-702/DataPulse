import { defineStore } from 'pinia'
import axios from 'axios'
import * as mock from '../utils/mockData'

// ============================================================
// DataPulse 数据脉动 · 全局数据仓库（Pinia）
// 统一管理大屏所有数据，支持 5 秒脉动刷新
// 数据来源：默认模拟数据；预留 Axios 真实接口切换（USE_API）
// ============================================================

const USE_API = false // 改为 true 并配置 API_BASE 即可对接真实后端
const API_BASE = '/api'

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        refreshRate: 5, // 秒
        lastUpdate: new Date(),
        coreMetrics: [],
        dataSource: [],
        trafficRank: [],
        logs: [],
        trend24h: [],
        dataType: [],
        systemStatus: [],
        bizData: [],
        alarmStat: [],
        apiStat: [],
        mapPoints: []
    }),

    actions: {
        // 初始化全部数据
        init() {
            this.coreMetrics = mock.genCoreMetrics()
            this.dataSource = mock.genDataSource()
            this.trafficRank = mock.genTrafficRank()
            this.logs = Array.from({ length: 12 }, () => mock.genLog())
            this.trend24h = mock.genTrend24h()
            this.dataType = mock.genDataType()
            this.systemStatus = mock.genSystemStatus()
            this.bizData = mock.genBizData()
            this.alarmStat = mock.genAlarmStat()
            this.apiStat = mock.genApiStat()
            this.mapPoints = mock.genMapPoints()
        },

        // 5 秒脉动刷新（随机合理波动）
        async refresh() {
            if (USE_API) {
                try {
                    const { data } = await axios.get(`${API_BASE}/dashboard`)
                    Object.assign(this, data)
                    this.lastUpdate = new Date()
                    return
                } catch (e) {
                    // 接口异常时回退模拟数据，保证大屏不中断
                }
            }
            this.coreMetrics = mock.genCoreMetrics(this.coreMetrics)
            this.dataSource = mock.genDataSource()
            this.trafficRank = mock.genTrafficRank()
            this.logs = [mock.genLog(), ...this.logs].slice(0, 12)
            this.trend24h = mock.genTrend24h(this.trend24h)
            this.dataType = mock.genDataType()
            this.systemStatus = mock.genSystemStatus(this.systemStatus)
            this.bizData = mock.genBizData()
            this.alarmStat = mock.genAlarmStat()
            this.apiStat = mock.genApiStat(this.apiStat)
            this.mapPoints = mock.genMapPoints()
            this.lastUpdate = new Date()
        }
    }
})

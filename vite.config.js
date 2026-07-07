import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// DataPulse 数据脉动 - Vite 配置
export default defineConfig({
    plugins: [vue()],
    server: {
        host: true,
        port: 5173,
        open: true
    },
    build: {
        chunkSizeWarningLimit: 1500
    }
})

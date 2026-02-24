import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,      // Mở cổng localhost ra toàn mạng
    port: 5173       // Giữ mặc định port 5173
  }
})

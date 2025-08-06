import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 청크 크기 경고 임계값
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // AI 로직을 별도 청크로 분리
          'ai-engine': ['/src/ai/OthelloAI.ts'],
        }
      }
    }
  },
  // 기본 메타데이터 설정
  server: {
    port: 3000,
    host: true
  }
})
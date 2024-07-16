import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';      // импорт из nodejs
import { fileURLToPath } from 'url';

// для версии nodejs <20: 
//const __filename = fileURLToPath(import.meta.url); 
//const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), //  вместо src используем @
      "@scss": path.resolve(__dirname, "src/scss"),  // вместо src/scss используем  @scss
    }
  }
})

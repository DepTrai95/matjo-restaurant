import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const apiKeys = [
  'SENDGRID_API_KEY',
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  apiKeys.forEach(key => processEnv[key] = env[key]);

  return {
    plugins: [vue()],
    css: { 
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/assets/style/style.scss";`,
        },
      },
    },
    define: {
      'process.env': processEnv,
    },
  }
})

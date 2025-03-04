import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const apiKeys = [
  'INSTAGRAM_APP_ID',
  'INSTAGRAM_SECRET_CODE',
  'INSTAGRAM_ACCOUNT_ID',
  'INSTAGRAM_API',
  'SENDGRID_API_KEY',
  'POSTMARK_API_KEY'
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  apiKeys.forEach(key => processEnv[key] = env[key]);

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), 
      },
    },
    css: { 
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: `@import "@/assets/style/global.scss";`,
        },
      },
    },
    define: {
      'process.env': processEnv,
    },
    build: {
      cssCodeSplit: true,
    },
  }
})

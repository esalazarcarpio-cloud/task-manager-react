// playwright.config.js
import { defineConfig } from '@playwright/test'
 
export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5173',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 4 * 1000,    
    env: {
        //...process.env,
        VITE_API_URL: process.env.VITE_API_URL
     },     
  },
})

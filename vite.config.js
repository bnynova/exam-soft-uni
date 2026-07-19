import { defineConfig } from 'vite';
import { resolve } from 'path';

// Multi-page app: every screen is its own real .html file (per assignment
// requirement: "multi-page navigation instead of single page with popups").
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'pages/login.html'),
        register: resolve(__dirname, 'pages/register.html'),
        recipeDetail: resolve(__dirname, 'pages/recipe-detail.html'),
        recipeForm: resolve(__dirname, 'pages/recipe-form.html'),
        profile: resolve(__dirname, 'pages/profile.html'),
        admin: resolve(__dirname, 'pages/admin.html'),
      },
    },
  },
});

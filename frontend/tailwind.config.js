import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss()
  ],
  daisyui: {
    themes: [
      {
        minimalist: {
          "primary": "#111111",
          "primary-content": "#F5F5F2",
          "secondary": "#6B6B67",
          "secondary-content": "#F5F5F2",
          "accent": "#111111",
          "accent-content": "#F5F5F2",
          "neutral": "#EAEAE5",
          "neutral-content": "#111111",
          "base-100": "#F5F5F2",
          "base-200": "#EAEAE5",
          "base-300": "#D9D9D3",
          "base-content": "#111111",
          "info": "#111111",
          "info-content": "#F5F5F2",
          "success": "#111111",
          "success-content": "#F5F5F2",
          "warning": "#111111",
          "warning-content": "#F5F5F2",
          "error": "#111111",
          "error-content": "#F5F5F2",
        }
      }
    ]
  }
});
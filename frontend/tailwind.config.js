import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss()
  ],
  daisyui: {
    themes: [
      {
        notion: {
          "primary": "#315E9D",
          "primary-content": "#FFFFFF",
          "secondary": "#171717",
          "secondary-content": "#FFFFFF",
          "accent": "#315E9D",
          "accent-content": "#FFFFFF",
          "neutral": "#FAF9F6",
          "neutral-content": "#171717",
          "base-100": "#FFFFFF",
          "base-200": "#FAF9F6",
          "base-300": "#F0EFEB",
          "base-content": "#171717",
          "info": "#315E9D",
          "info-content": "#FFFFFF",
          "success": "#315E9D",
          "success-content": "#FFFFFF",
          "warning": "#315E9D",
          "warning-content": "#FFFFFF",
          "error": "#315E9D",
          "error-content": "#FFFFFF",
        }
      }
    ]
  }
});
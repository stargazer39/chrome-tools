import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./dist",
    rollupOptions: {
      input: {
        main: 'index.html',
        contentScript: 'src/contentScript/contentScript.ts', // Add this line for the content script
        worker: 'src/serviceWorker/worker.ts'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: {
          contentScript: ['src/contentScript/contentScript.ts'], // Bundle the content script separately
          worker: ['src/serviceWorker/worker.ts']
        },
      },
    },
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "manifest.json",
          dest: ".",
        },
        {
          src: "contentScript/contentStyles.css",
          dest: ".",
        },
      ],
    }),
  ],
});
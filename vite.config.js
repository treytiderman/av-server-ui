import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [svelte()],
  build: {outDir: '../av-server/public/av-server-ui'}
})

/*

Folder Structure expected to build right into av-server

path_to_your_folders
├── av-server
│   ├── private
│   ├── public
│   │   └── av-server-ui
│   └── server
└── av-server-ui
    ├── public
    ├── src
    └-- vite.config.js

*/


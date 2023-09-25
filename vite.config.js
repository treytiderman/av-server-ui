import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const prefix = 'monaco-editor/esm/vs'

export default defineConfig({
base: './',
    plugins: [svelte()],
    build: {
        outDir: '../av-server/server/frontend',
        rollupOptions: {
            output: {
                manualChunks: {
                    jsonWorker: [`${prefix}/language/json/json.worker`],
                    cssWorker: [`${prefix}/language/css/css.worker`],
                    htmlWorker: [`${prefix}/language/html/html.worker`],
                    tsWorker: [`${prefix}/language/typescript/ts.worker`],
                    editorWorker: [`${prefix}/editor/editor.worker`],
                },
            },
        },
    }
})

/*
Folder Structure expected to build right into av-server

/path_to_your_folders
├── av-server
│   ├── server
│   │   └── frontend
└── av-server-ui
    ├── public
    ├── src
    └── vite.config.js
*/

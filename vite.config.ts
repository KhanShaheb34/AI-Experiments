import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'astar-search': resolve(__dirname, 'algorithms/astar-search.html'),
        'greedy-search': resolve(__dirname, 'algorithms/greedy-search.html'),
        bfs: resolve(__dirname, 'algorithms/bfs.html'),
        ucs: resolve(__dirname, 'algorithms/ucs.html'),
        dfs: resolve(__dirname, 'algorithms/dfs.html'),
      },
    },
  },
});

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";

// 将脚本通过 Vite 钩子执行（开发和构建）
function RouterPathPlugin() {
  return {
    name: "router-path-plugin",
    async configureServer(server: any) {
      // 开发服务器启动时执行一次
      await import(new URL("./scripts/routerPath.js", import.meta.url).href);
      server.config.logger.info("[router-path-plugin] routerPath.js 已执行", { timestamp: true });
    },
    async buildStart() {
      // 构建开始时执行一次
      await import(new URL("./scripts/routerPath.js", import.meta.url).href);
      console.log("[router-path-plugin] routerPath.js 已执行");
    }
  };
}
export default defineConfig({
  plugins: [
    RouterPathPlugin(),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: "css" })]
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "css" })]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        changeOrigin: true
      }
    },
    host: "0.0.0.0"
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (/node_modules\/vue(\/|$)/.test(id) || /node_modules\/@vue\//.test(id)) return "vendor-vue";
            if (/node_modules\/vue-router\//.test(id)) return "vendor-vue-router";
            if (/node_modules\/pinia\//.test(id)) return "vendor-pinia";
            if (/node_modules\/element-plus\//.test(id)) return "vendor-element-plus";
            if (/node_modules\/axios(\/|$)/.test(id)) return "vendor-axios";
            if (/node_modules\/vue-data-ui\//.test(id)) return "vendor-charts";
            return "vendor";
          }
          // 保持应用代码按路由懒加载默认切分，避免强制合并引发执行顺序问题
        }
      }
    }
  }
});

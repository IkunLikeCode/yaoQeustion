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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
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
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  }
});

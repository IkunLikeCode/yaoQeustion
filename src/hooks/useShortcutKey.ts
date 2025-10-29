import { useQuestionStore } from "@/store/module/question";
import { onMounted, onUnmounted } from "vue";

/**
 * 统一的快捷键 hook：支持单键/组合键，自动在卸载清理，并提供 start/stop 手动控制。
 * @param key 快捷键字符串，例如："s"、"ctrl+s"、"shift+delete"、"alt+p"
 * @param fn 回调函数，默认会将当前选中组件的 id 作为参数传入
 * @param options 可选项：{ preventDefault?: boolean, stopPropagation?: boolean, target?: Document | HTMLElement, autoStart?: boolean }
 */
export default function useShortCutKey(
  key: string,
  fn: (selectedId: string) => any,
  options?: {
    preventDefault?: boolean; //是否阻止默认事件
    stopPropagation?: boolean; //是否阻止冒泡
    target?: Document | HTMLElement; //绑定的那个目标
    autoStart?: boolean; //是否自动启动
  }
) {
  const questionStore = useQuestionStore();
  const keyParts = key.toLowerCase().split("+");
  const target: Document | HTMLElement = options?.target ?? document;
  const autoStart = options?.autoStart ?? true;

  let started = false; //正在监听或者移除

  const handler = (event: KeyboardEvent) => {
    if (!questionStore.selectedId) return;

    const pressedKey = (event.key || "").toLowerCase();
    // 是否需要 ctrl 键
    const needCtrl = keyParts.includes("ctrl");
    // 主键
    const mainKey = keyParts.find(k => !["ctrl", "shift", "alt"].includes(k));
    if (needCtrl && !event.ctrlKey) return;
    // 如果有主键 并且主键不等于 按下的键
    if (mainKey && pressedKey !== mainKey) {
      return;
    }

    if (options?.preventDefault) event.preventDefault();
    if (options?.stopPropagation) event.stopPropagation();
    fn(questionStore.selectedId);
  };

  const start = () => {
    if (started) return;
    target.addEventListener("keydown", handler as any);
    started = true;
  };

  const stop = () => {
    if (!started) return;
    target.removeEventListener("keydown", handler as any);
    started = false;
  };

  onMounted(() => {
    if (autoStart) start();
  });

  onUnmounted(() => {
    stop();
  });

  return { start, stop };
}

import { watch, reactive, nextTick } from "vue";
import deepClone from "@/utils/deepClone";

/**
 * 监听用户输入函数
 * @author yao
 */
export default function useMonitorUserInput<T extends Record<string, any>>(
  props: T,
  emit: (event: "change", value: T) => void
) {
  // 创建响应式表单数据，进行深克隆
  const formData = reactive(deepClone(props)) as T;

  // 添加标志位防止递归更新
  let isUpdatingFromProps = false;

  // 监听 props 变化，同步到 formData
  watch(
    () => props,
    newProps => {
      isUpdatingFromProps = true;
      // 深克隆新的 props 并更新 formData
      const clonedProps = deepClone(newProps);
      Object.keys(formData).forEach(key => {
        delete formData[key];
      });
      Object.assign(formData, clonedProps);
      // 使用 nextTick 确保更新完成后再重置标志位
      nextTick(() => {
        isUpdatingFromProps = false;
      });
    },
    { immediate: true, deep: true }
  );

  // 监听 formData 变化，发射事件
  watch(
    formData,
    newVal => {
      // 只有在不是从 props 更新时才发射事件
      if (!isUpdatingFromProps) {
        emit("change", deepClone(newVal) as T);
      }
    },
    { deep: true }
  );

  return {
    formData
  };
}

import { ref, shallowRef } from "vue";
import { debounce } from "@/utils/debounce";
// 自定义请求hooks
export function useRequest<T>(
  fn: (...args: any[]) => Promise<T>,
  options: { debounceDelay?: number; isDebounce?: boolean } = {
    debounceDelay: 500
  }
) {
  const isLoading = shallowRef(false);
  const result = ref<T>([] as T);
  const error = ref<any>(null);
  async function callBack(...args: any[]) {
    try {
      isLoading.value = true;
      result.value = await fn(...args);
      isLoading.value = false;
    } catch (err: any) {
      error.value = err;
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  let debounceCallBack: any = null;
  if (options.isDebounce) {
    debounceCallBack = debounce(callBack, options.debounceDelay || 500);
  }
  return {
    result,
    error,
    callBack: debounceCallBack || callBack,
    isLoading
  };
}

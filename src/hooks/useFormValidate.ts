// 表单验证
import type { FormInstance } from "element-plus";

export async function useFormValidate(
  formRef: FormInstance | null,
  rules: Record<string, any>,
  callback: (valid: boolean) => void
) {
  if (formRef) {
    const valid = await formRef.validate();
    callback(valid);
    return valid;
  }
}

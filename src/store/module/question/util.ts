import type { ComponentInfoType, QuestionState } from ".";

/**
 * 获取当前选中的组件的下一个组件
 * @param state 状态
 * @returns 下一个组件
 */
export function getNextComponent(state: QuestionState): string {
  // 过滤掉隐藏了的组件
  const noHeidComponents = state.componentsList.filter(item => !item.isHide);
  const index = noHeidComponents.findIndex(item => item.fe_id === state.selectedId);
  let newId = "";
  if (index < 0) {
    return newId;
  } else {
    // 如果删除了当前组件那么要选中当前被删除组件的下一个组件
    if (index === noHeidComponents.length - 1) {
      // 如果删除的是最后一个组件那么要选中上一个组件
      newId = noHeidComponents[index - 1]?.fe_id || "";
    } else {
      // 如果删除了当前组件那么要选中当前被删除组件的下一个组件
      newId = noHeidComponents[index + 1]?.fe_id || "";
    }
  }
  return newId;
}

/**
 * 添加组件
 * @param state 状态
 * @param component 组件配置
 */
export function addComponentUtil(state: QuestionState, component: ComponentInfoType) {
  // 找到当前选中的组件
  const index = state.componentsList.findIndex(item => item.fe_id === state.selectedId);
  if (index < 0) {
    state.componentsList.push(component);
  } else {
    // 找到了就在当前选中的组件后面插入
    state.componentsList.splice(index + 1, 0, component);
  }
  state.selectedId = component.fe_id;
}

/**
 * 深拷贝组件
 * @param component 组件配置
 * @returns 深拷贝后的组件配置
 * @author 姚博
 */
export function deepClone(component: ComponentInfoType): ComponentInfoType {
  const cloneProps = (obj: any): any => {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }

    if (obj instanceof Array) {
      return obj.map(item => cloneProps(item));
    }

    if (typeof obj === "object") {
      const cloned: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          cloned[key] = cloneProps(obj[key]);
        }
      }
      return cloned;
    }
    return obj;
  };
  return {
    fe_id: component.fe_id,
    title: component.title,
    type: component.type,
    isHide: component.isHide,
    isLock: component.isLock,
    props: cloneProps(component.props)
  };
}

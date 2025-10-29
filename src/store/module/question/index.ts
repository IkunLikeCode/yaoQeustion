import { defineStore } from "pinia";
import type { ComponentPropsType } from "@/components/QuestionComponents";
import { addComponentUtil, deepClone, getNextComponent } from "./util";
import randomId from "@/utils/radomId";
// 组件的信息类型
export interface ComponentInfoType {
  fe_id: string;
  title: string;
  type: string;
  isHide?: boolean; //当前组件是否隐藏
  isLock?: boolean; //当前组件是否锁定
  props: ComponentPropsType; //组件的属性
}

export interface QuestionState {
  componentsList: ComponentInfoType[];
  // 当前被选中的组件的id
  selectedId: string;
  copyComponent: ComponentInfoType | null; //当前复制的组件
  // questionTitle: string;
  questionInfo: {
    questionTitle: string;
    questionDesc: string;
    backgroundColor: string;
    fontColor: string;
  };
}

export const useQuestionStore = defineStore("question", {
  state: (): QuestionState => ({
    componentsList: [],
    selectedId: "",
    copyComponent: null,
    questionInfo: {
      questionTitle: "",
      questionDesc: "",
      backgroundColor: "#f5f7fa",
      fontColor: "#000000"
    }
  }),
  actions: {
    /**
     * 添加组件
     * @param component 组件的信息
     */
    addComponent(component: ComponentInfoType) {
      addComponentUtil(this, component);
    },
    /**
     * 选择组件
     * @param fe_id 组件的id
     */
    selectComponent(fe_id: string) {
      this.selectedId = fe_id;
    },

    /**
     * 删除组件
     * @param fe_id 组件id
     */
    deleteComponent(fe_id: string) {
      const index = this.componentsList.findIndex(item => item.fe_id === fe_id || item.fe_id === this.selectedId);
      this.selectedId = getNextComponent(this);
      if (index < 0) {
        return;
      }
      this.componentsList.splice(index, 1);
    },
    /**
     * 隐藏组件
     * @param fe_id 组件id
     */
    hideComponent(fe_id: string) {
      const component = this.componentsList.find(item => item.fe_id === fe_id || item.fe_id === this.selectedId);
      if (!component) {
        return;
      }
      this.selectedId = getNextComponent(this);
      component.isHide = !component.isHide;
    },
    /**
     * 锁定组件
     * @param fe_id 组件id
     */
    lockComponent(fe_id: string) {
      const component = this.componentsList.find(item => item.fe_id === fe_id || item.fe_id === this.selectedId);
      if (!component) return;
      component.isLock = !component.isLock;
    },
    /**
     * 获取当前组件
     */
    getSelectComponent() {
      return this.componentsList.find(item => item.fe_id === this.selectedId);
    },
    /**
     * 复制当前选中组件
     * @param fe_id
     */
    copyComponentHandle() {
      const component = this.componentsList.find(item => item.fe_id === this.selectedId);
      if (!component) return;
      this.copyComponent = { ...deepClone(component) };
    },
    /**
     * 粘贴组件
     * @param fe_id:组件id
     */
    niantieComponent() {
      if (!this.copyComponent) return;
      if (this.copyComponent) {
        // 深拷贝组件
        this.copyComponent = { ...deepClone(this.copyComponent) };
        this.copyComponent.fe_id = randomId();
        addComponentUtil(this, this.copyComponent);
      }
    },
    /**
     * 上移组件
     */
    upComponent() {
      const index = this.componentsList.findIndex(item => item.fe_id === this.selectedId);
      if (index <= 0) {
        return;
      } else {
        if (index > this.componentsList.length) {
          return;
        }
        if (this.componentsList) {
          this.selectedId = this.componentsList?.[index - 1]?.fe_id || "";
        }
      }
    },

    /**
     * 下移组件
     */
    downComponent() {
      const index = this.componentsList.findIndex(item => item.fe_id === this.selectedId);
      if (index < 0) {
        return;
      } else {
        if (index >= this.componentsList.length - 1) {
          return;
        }
        if (this.componentsList) {
          this.selectedId = this.componentsList?.[index + 1]?.fe_id || "";
        }
      }
    },

    /**
     * 更新组件属性
     * @param fe_id 组件id
     * @param newProps 新的属性
     */
    updateComponentProps(fe_id: string, newProps: Partial<ComponentPropsType>) {
      const component = this.componentsList.find(item => item.fe_id === fe_id);
      if (!component) return;
      // 更新组件属性
      component.props = { ...component.props, ...newProps };
    }
  }
});

import { useQuestionStore } from "@/store/module/question";
import type { QuestionState } from "@/store/module/question";
const clone = <T>(obj: T): T => {
  try {
    // 优先使用原生结构化克隆，支持更复杂数据
    return structuredClone(obj);
  } catch {
    // 回退到 JSON 方式（要求可序列化）
    return JSON.parse(JSON.stringify(obj));
  }
};

class MyUndoRedo {
  undoStack: QuestionState[] = [];
  redoStack: QuestionState[] = [];
  store = useQuestionStore();
  isRecording = true; // 防止撤销/重做时重复记录
  maxSnapshots = 20; // 最多保留的快照数量

  constructor() {
    // 初始快照（必须克隆）
    this.pushUndoSnapshot(this.store.$state);

    // 仅在记录模式下，订阅状态变化并入栈
    this.store.$subscribe((_mutation, state) => {
      if (!this.isRecording) return;
      this.pushUndoSnapshot(state);
      // 一旦有新操作，重做栈清空
      this.redoStack = [];
    });
  }

  private pushUndoSnapshot(state: QuestionState) {
    const snap = clone(state);
    this.undoStack.push(snap);
    if (this.undoStack.length > this.maxSnapshots) {
      this.undoStack.shift();
    }
  }

  // 撤销：回到上一个快照
  undo() {
    if (this.undoStack.length <= 1) return; // 没有上一个状态

    this.isRecording = false;

    // 当前快照 -> 重做栈
    const current = this.undoStack.pop()!;
    this.redoStack.push(clone(current));

    // 上一个快照应用到 store（全量替换）
    const previous = this.undoStack[this.undoStack.length - 1];
    this.store.$state = clone(previous as any);

    this.isRecording = true;
  }

  // 重做：回到下一个快照
  redo() {
    if (this.redoStack.length === 0) return; // 没有可重做状态

    this.isRecording = false;

    const next = this.redoStack.pop()!;

    // 重做后的状态也进入撤销栈，保证后续可撤销
    this.undoStack.push(clone(next));

    // 应用到 store（全量替换）
    this.store.$state = clone(next);

    this.isRecording = true;
  }

  // 手动记录一次快照（在一组操作结束时调用）
  record() {
    this.pushUndoSnapshot(this.store.$state);
    this.redoStack = [];
  }

  // 清空历史并记录当前
  clear() {
    this.undoStack = [];
    this.redoStack = [];
    this.pushUndoSnapshot(this.store.$state);
  }
}

export default new MyUndoRedo();

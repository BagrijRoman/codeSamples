import { makeAutoObservable } from 'mobx';


class ToolState {
  tool: unknown = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: unknown) {
    this.tool = tool;
  }
}

export const toolState =  new ToolState();

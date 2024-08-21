import { makeAutoObservable } from 'mobx';


class ToolState {
  tool: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool) {
    this.tool = tool;
  }
}

export const toolStore =  new ToolState();

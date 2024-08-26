import { makeAutoObservable } from 'mobx';


class ToolState {
  tool;

  constructor() {
    makeAutoObservable(this);
    this.tool = undefined;
  }

  setTool(tool: unknown) {
    this.tool = tool;
  }

  setFillColor(color: string) {
    this.tool.fillColor = color;
  }

  setStrokeColor(color: string) {
    this.tool.strokeColor = color;
  }

  setLineWidth(lineWidth: number) {
    this.tool.lineWidth = lineWidth;
  }

  



}

export const toolState =  new ToolState();

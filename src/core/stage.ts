import Konva from "konva";
import { Shape } from "../shapes";

export class Stage {
  public mainStage: Konva.Stage;

  constructor({ width = 500, height = 500, containerId = "code-slider-canvas-container", slides = [] }) {
    if (!document.querySelector(`#${containerId}`)) {
      const container = document.createElement("div");
      container.setAttribute("id", containerId);

      document.body.appendChild(container);
    }

    this.mainStage = new Konva.Stage({
      container: containerId,
      width,
      height
    });
  }

  public add(shape: Shape) {
    this.mainStage.add(shape.konvaLayer!);
  }
}
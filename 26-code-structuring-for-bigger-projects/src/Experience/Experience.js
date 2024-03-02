import Sizes from "./Utils/Sizes";

export default class Experience {
  constructor(canvas) {
    window.experience = this;

    // Options
    this.canvas = canvas;

    this.sizes = new Sizes();

    this.sizes.on("resize", this.resize);
  }

  resize = () => {};
}

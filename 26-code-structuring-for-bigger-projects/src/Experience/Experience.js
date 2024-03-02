import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

export default class Experience {
  constructor(canvas) {
    window.experience = this;

    // Options
    this.canvas = canvas;

    this.sizes = new Sizes();
    this.time = new Time();

    this.sizes.on("resize", this.resize);
    this.time.on("tick", this.update);
  }

  resize = () => {};

  update = () => {};
}

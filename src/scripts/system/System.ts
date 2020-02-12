export default class System {
  constructor() {
    if (process.env.NODE_ENV === "development") {
      const t = this.constructor as any;
      (window as any)[t["name"]] = this;
    }
  }
  update() {}
}
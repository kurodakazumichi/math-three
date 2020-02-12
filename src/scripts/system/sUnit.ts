import System from '~/scripts/system/System';
import uUnit from '~/scripts/unit/uUnit';

const LINE_COUNT = 10;

export enum Line {
  LINE0,
  LINE1,
  LINE2,
  LINE3,
  LINE4,
  LINE5,
  LINE6,
  LINE7,
  LINE8,
  LINE9,
}

/******************************************************************************
 * ユニットシステム
 *****************************************************************************/
class sUnit extends System {

  private lines:uUnit[][];

  constructor() {
    super();
    this.lines = [];

    for(let i = 0; i < LINE_COUNT; ++i) {
      this.lines.push([]);
    }
  }

  add(line:number, unit:uUnit) {
    this.lines[line].push(unit);
  }

  update() {
    this.updateLines();
  }

  private updateLines() {
    this.lines.map((line:uUnit[]) => {
      this.updateLine(line);
    })
  }
  private updateLine(line:uUnit[]) {
    line.map((unit) => {
      unit.update();
    })
  }

}

const instance = new sUnit();
export default instance;
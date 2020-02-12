import ISystem from '~/scripts/system/ISystem';
import IUnit from '~/scripts/unit/IUnit';

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
class sUnit implements ISystem {

  private lines:IUnit[][];

  constructor() {
    this.lines = [];

    for(let i = 0; i < LINE_COUNT; ++i) {
      this.lines.push([]);
    }
  }

  add(line:number, unit:IUnit) {
    this.lines[line].push(unit);
  }

  update() {
    this.updateLines();
  }

  private updateLines() {
    this.lines.map((line:IUnit[]) => {
      this.updateLine(line);
    })
  }
  private updateLine(line:IUnit[]) {
    line.map((unit) => {
      unit.update();
    })
  }

}

const instance = new sUnit();
export default instance;
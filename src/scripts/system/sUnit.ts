import System from '~/scripts/system/System';
import uUnit from '~/scripts/unit/uUnit';

const LINE_COUNT = 10;

export enum UNIT_LINE {
  NONE      = -1,
  SCENE     = 0,
  CAMERA    = 1,
  PRIMITIVE = 2,
  LINE3     = 3,
  LINE4     = 4,
  LINE5     = 5,
  LINE6     = 6,
  LINE7     = 7,
  LINE8     = 8,
  LINE9     = 9,
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

  remove(unit:uUnit, lineNo:number) {
    if (lineNo < 0) return;
    const found = this.lines[lineNo].findIndex((u) => {
      return u === unit;
    })
    if (found ===  -1) return;
    
    this.lines[lineNo].splice(found, 1);
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
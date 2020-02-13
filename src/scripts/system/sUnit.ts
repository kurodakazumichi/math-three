import System from '~/scripts/system/System';
import uUnit from '~/scripts/unit/uUnit';

/******************************************************************************
 * 定数
 *****************************************************************************/
const LINE_COUNT = 10;

/******************************************************************************
 * Enum
 *****************************************************************************/
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

  constructor() {
    super();
    this.lines = this.createLines()
  }

  //---------------------------------------------------------------------------
  // Public メソッド
  //---------------------------------------------------------------------------

  add(lineNo:number, unit:uUnit) 
  {
    if (!this.isEnableAsLineNo(lineNo)) return;
    this.lines[lineNo].push(unit);
  }

  remove(unit:uUnit, lineNo:number) {
    if (!this.isEnableAsLineNo(lineNo)) return;
    
    const found = this.lines[lineNo].findIndex((u) => {
      return u === unit;
    })
    if (found ===  -1) return;
    
    this.lines[lineNo].splice(found, 1);
  }

  update() {
    this.lines.map((line:uUnit[]) => {
      this.updateLine(line);
    })
  }

  //---------------------------------------------------------------------------
  // Private 変数
  //---------------------------------------------------------------------------

  private lines:uUnit[][];

  //---------------------------------------------------------------------------
  // Private メソッド
  //---------------------------------------------------------------------------

  /** 定数LINE_COUNTの数だけユニットを登録するためのラインを生成する */
  private createLines() 
  {
    const lines = [];

    for(let i = 0; i < LINE_COUNT; ++i) {
      lines.push([]);
    }

    return lines;
  }

  private updateLine(line:uUnit[]) {
    line.map((unit) => {
      unit.update();
    })
  }

  /** 指定された番号がライン番号として有効範囲である */
  private isEnableAsLineNo(no:number) {
    if (no < 0) return false;
    if (LINE_COUNT <= no) return false;
    return true;
  }

}

const instance = new sUnit();
export default instance;
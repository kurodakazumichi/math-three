import { Clock } from 'three';
import System from  '~/scripts/system/System';

/******************************************************************************
 * ユニットシステム
 *****************************************************************************/
class sUnit extends System {

  constructor() {
    super();
    this.clock = new Clock(true);
    this.deltaTime = 0;
    this.totalTime = 0;
  }

  //---------------------------------------------------------------------------
  // Public プロパティ
  //---------------------------------------------------------------------------
  get delta() {
    return this.deltaTime;
  }

  get total() {
    return this.totalTime;
  }

  //---------------------------------------------------------------------------
  // Public メソッド
  //---------------------------------------------------------------------------

  init() {
    this.deltaTime = this.totalTime = 0;
  }

  update() {
    this.deltaTime = this.clock.getDelta();
    this.totalTime = this.clock.getElapsedTime();
  }

  start() {
    this.clock.start();
  }
  stop() {
    this.clock.stop();
  }


  //---------------------------------------------------------------------------
  // Private 変数
  //---------------------------------------------------------------------------

  private clock:Clock;
  private deltaTime:number;
  private totalTime:number;

  //---------------------------------------------------------------------------
  // Private メソッド
  //---------------------------------------------------------------------------



}

const instance = new sUnit();
export default instance;
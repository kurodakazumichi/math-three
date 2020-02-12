import { Camera } from "three";
import uUnit from '~/scripts/unit/uUnit';

export default class uCamera extends uUnit<Camera> {

  constructor(camera:Camera) {
    super(camera);
  }


}
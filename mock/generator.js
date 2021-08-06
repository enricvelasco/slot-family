import {carsDemoList} from "./cars";
import {saveCar} from "../firebase/data/cars";

export const dataCarsGenerator = () => {
  carsDemoList.map(item => {
    saveCar(item)
  })
}

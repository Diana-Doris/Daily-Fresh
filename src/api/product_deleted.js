/* 所有类目接口 */
import axios from "../axios";
export default {
  item(id) {
    console.log(id);
    return axios.delete("/products/:" + id);
  }
};

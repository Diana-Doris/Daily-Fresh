/* 所有类目接口 */
import axios from "../axios";
export default {
  list(params) {
    return axios.get("/category/all", params);
  }
};

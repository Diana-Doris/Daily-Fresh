/* 所有类目接口 */
import axios from "../axios";
export default {
  list(params) {
    return axios.get("/products/all", params);
  },
  del(id) {
    return axios.delete("/products/" + id);
  },
  add(form) {
    return axios.post("/products/add", form);
  },
  edit(form) {
    return axios.put("/products/edit", form);
  }
};

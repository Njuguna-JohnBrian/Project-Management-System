import axios from "axios";
import authHeader from "./auth-header";

class UserService {
  getPublicContent() {
    return axios.get("http://localhost:9000/projects/all");
  }
  getUserBoard() {
    return axios.get("/user", { headers: authHeader });
  }
  getAdminBoard() {
    return axios.get("/admin", { headers: authHeader });
  }
}

export default new UserService();

import axios from "axios";
import authHeader from "./auth-header";

class UserService {
  getUserBoard() {
    return axios.get("", { headers: authHeader });
  }
  getAdminBoard() {
    return axios.get("", { headers: authHeader });
  }
}

export default new UserService();

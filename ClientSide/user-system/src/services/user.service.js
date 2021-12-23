import axios from "axios";
import authHeader from "./auth-header";

class UserService {
  getUserBoard() {
    return axios.get("/user", { headers: authHeader });
  }
  getAdminBoard() {
    return axios.get("/admin", { headers: authHeader });
  }

  createProject(project_name, project_desc) {
    return axios.post("http://localhost:9000/projects/project/new", {
      project_name,
      project_desc,
    });
  }
}

export default new UserService();

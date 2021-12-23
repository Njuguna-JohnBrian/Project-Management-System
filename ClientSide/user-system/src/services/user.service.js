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

  getTasks(project_id){
    return axios.get("http://localhost:9000/tasks/tasks")
  }

  createTask(task_name, task_desc, project_id) {
    return axios.post("http://localhost:9000/tasks/tasks/new", {
      task_name,
      task_desc,
      project_id,
    });
  }
  getAllUsers() {
    return axios.get("http://localhost:8000/admin/all");
  }
}

export default new UserService();

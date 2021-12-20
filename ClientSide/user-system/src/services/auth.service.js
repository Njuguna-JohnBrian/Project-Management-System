import axios from "axios";

//User Authentication service
class AuthService {
  // login user and store details in localstorage
  login(username, password) {
    return axios
      .post("/user/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  // Remove current user from localstorage
  logout() {
    localStorage.removeItem("user");
  }

  //create new user
  register(username, email, password) {
    return axios.post("/user/signup", {
      username,
      email,
      password,
    });
  }

  // get current user from localstorage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();

import axios from "axios";

//User Authentication service
class AuthService {
   async login(email, password) {
    
     let response = await axios
      .post("/user/login", {
        email,
        password,
      });
      if (response.status === 200){
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response;
  }

  // Remove current user from localstorage
  logout() {
    localStorage.removeItem("user");
  }

  //create new user
  register(username, email, phonenumber, password) {
    return axios.post("/user/signup", {
      username,
      email,
      phonenumber,
      password,
    });
  }

  // get current user from localstorage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));

  }
}

export default new AuthService();

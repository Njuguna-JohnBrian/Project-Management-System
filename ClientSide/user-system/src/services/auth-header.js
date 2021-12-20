export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  // Check Local Storage For User with the access token if false return an emapty object
  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}

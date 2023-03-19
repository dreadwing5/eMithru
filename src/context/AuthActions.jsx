export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Logout = () => {
  console.log("Logging Out");
  localStorage.removeItem("user"); // remove the user from local storage
  return {
    type: "LOGOUT",
  };
};

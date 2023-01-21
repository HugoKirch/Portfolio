import axios from "axios";
import jwtDecode from "jwt-decode"
import { SignInUser, SignUpUser } from "../../config/types";
import { toast } from "react-hot-toast";

export const hasAuthenticated = () => {
  const token = window.localStorage.getItem("token");
  const result = token ? tokenIsValid(token) : false;

  if (!result)
    window.localStorage.removeItem("token");

  return result;
};

export const login = (credentials: SignInUser) => {
  return axios
  .post("http://localhost:8080/login", credentials)
  .then(response => response.data.token)
  .then(token => {
    window.localStorage.setItem("token", token);
    return true;
  })
}

export const loginGoogle = (credentials: {email: string, googleauth: boolean}) => {
  console.log(credentials)
  return axios
  .post("http://localhost:8080/login", credentials)
  .then(response => response.data.token)
  .then(token => {
    window.localStorage.setItem("token", token);
    return true;
  })
}

export const register = (credentials: SignUpUser) => {
  return axios
  .post("http://localhost:8080/register", credentials)
  .then(response => response.data.token)
  .then(token => {
    window.localStorage.setItem("token", token);
    return true;
  })
}

export const forgot = (email: string) => {
  return axios
  .post("http://localhost:8080/forgot", {email})
  .then(() => {
    console.log("Email sent");
    toast.success("Email sent !");
  })
  .catch(() => {
    toast.error("Sending email did not work !");
  })
}

const tokenIsValid = (token: string) => {
  const decoded: any = jwtDecode(token);

  if (decoded.exp * 1000 > new Date().getTime())
    return true;
  return false;
}

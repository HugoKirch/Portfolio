import axios from "axios";
import jwtDecode from "jwt-decode"
import { removeItem, setItem } from "../Storage/LocalStorage";

export const hasAuthenticated = () => {
  const token = window.localStorage.getItem("token");
  const result = token ? tokenIsValid(token) : false;

  if (!result)
    removeItem("token");
  return result;
};

export const login = async (credentials: {email: string,
    password: string}) => {
  return await axios
  .post("https://area.shurisko.fr/login", credentials)
  .then(response => response.data.token)
  .then(token => {
    (async () => {
        await setItem("token", token);
        console.log(token);
    })();
    return true;
  })
}

export const loginGoogle = (credentials: {email: string, googleauth: boolean}) => {
  console.log(credentials)
  return axios
  .post("https://area.shurisko.fr/login", credentials)
  .then(response => response.data.token)
  .then(token => {
    (async () => {
        await setItem("token", token);
    })();
    return true;
  })
}

export const logout = () => {
  removeItem("token")
}

export const register = (credentials: {username: string,
    email: string,
    password: string}) => {
  return axios
  .post("https://area.shurisko.fr/register", credentials)
  .then(response => response.data.token)
  .then(token => {
    setItem("token", token);
    return true;
  })
}

export const forgot = (email: string) => {
  return axios
  .post("https://area.shurisko.fr/forgot", {email})
  .then(() => {
    console.log("Mail sent");
  })
  .catch(() => {
    console.log("Failed to send mail");
  })
}

const tokenIsValid = (token: string) => {
  const decoded: any = jwtDecode(token);

  if (decoded.exp * 1000 > new Date().getTime())
    return true;
  return false;
}

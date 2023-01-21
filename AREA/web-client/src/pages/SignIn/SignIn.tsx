import "./SignIn.css";

import React, { useContext, useEffect, useState } from "react";
import { SignInUser } from "../../config/types";
import Auth from "../../contexts/Auth/Auth";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthApi/AuthApi";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";
import { toast } from "react-hot-toast";

const SignIn = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);
  const navigate = useNavigate();
  const [user, setUser] = useState<SignInUser>({ email: "", password: "" });

  const handleChange = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await login(user);
      setIsAuthenticated(response);
      toast.success("Welcome !");
    } catch (response: any) {
      console.log(response);
      toast.error("Impossible to connect !");
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="center">
        <h1 className="title">Hi, Welcome Back</h1>
        <p className="subtitle1">Enter your credentials to continue</p>
        <GoogleLoginButton text="Sign In with Google" />
        <div className="separator-container">
          <hr />
          <button className="or-btn">OR</button>
          <hr />
        </div>
        <p className="subtitle2">Sign in with email address</p>
        <form onSubmit={handleSubmit}>
          <div className="txt-field">
            <label htmlFor="email">Email Adress / Username</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="txt-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="remember-forgot">
            <div className="checkbox-field">
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="forgot">
              <a href="/forgot">Forgot Password?</a>
            </div>
          </div>
          <div className="submit">
            <input type="submit" value="Sign In" />
          </div>
          <div className="separator-container">
            <hr />
          </div>
          <div className="signup">
            <a href="/signup">Don't have an account?</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;

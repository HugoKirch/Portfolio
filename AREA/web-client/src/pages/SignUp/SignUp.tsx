import "./SignUp.css";

import React, { useContext, useEffect, useState } from "react";
import Auth from "../../contexts/Auth/Auth";
import { useNavigate } from "react-router-dom";
import { SignUpUser } from "../../config/types";
import { register } from "../../services/AuthApi/AuthApi";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);
  const navigate = useNavigate();
  const [user, setUser] = useState<SignUpUser>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await register(user);
      setIsAuthenticated(response);
      toast.success("Welcome !");
    } catch ({ response }) {
      console.log(response);
      toast.error("Impossible to register !");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="center">
        <h1 className="title">Sign up</h1>
        <p className="subtitle1">Enter your credentials to continue</p>
        <p className="subtitle2">Sign up with Email address</p>
        <form onSubmit={handleSubmit}>
          <div className="txt-field">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="txt-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="txt-field">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="submit">
            <input type="submit" value="Sign Up" />
          </div>
          <div className="separator-container">
            <hr />
          </div>
          <div className="signin">
            <a href="/signin">Already have an account?</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;

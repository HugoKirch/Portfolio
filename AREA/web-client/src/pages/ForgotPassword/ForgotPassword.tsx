import { useState } from "react";
import { forgot } from "../../services/AuthApi/AuthApi";

const ForgotPassword = () => {
  const [mail, setMail] = useState<string>("");

  const handleChange = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setMail(currentTarget.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await forgot(mail);
    } catch ({ response }) {
      console.log(response);
    }
  };

  return (
    <>
      <div className="center">
        <h1 className="title">Forgot password?</h1>
        <p className="subtitle1">
          Enter your email address below and we'll send you your new password
        </p>
        <form onSubmit={handleSubmit}>
          <div className="txt-field">
            <label htmlFor="email">Email address:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="submit">
            <input type="submit" value="Send Mail" />
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

export default ForgotPassword;

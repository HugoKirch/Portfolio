import { useContext } from "react";
import GoogleLogin from "react-google-login";
import Auth from "../../contexts/Auth/Auth";
import { loginGoogle } from "../../services/AuthApi/AuthApi";
import "./GoogleLoginButton.css";

const GoogleLoginButton: React.FC<{ text: string }> = ({ text }) => {
  const context = useContext(Auth);

  const onSuccess = async (res: any) => {
    console.log("LOGIN GOOGLE SUCCESS");
    const response = await loginGoogle({
      email: res.profileObj.email,
      googleauth: true,
    });
    context.setIsAuthenticated(response);
  };

  const onFailure = (res: any) => {
    console.log("LOGIN FAILED! response:", res);
  };

  return (
    <>
      <GoogleLogin
        className="google-sign-in-button"
        clientId={
          "1067972064810-9r8kofld8i53kh8cliebsji7dgfa7ajp.apps.googleusercontent.com"
        }
        buttonText={text}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </>
  );
};

export default GoogleLoginButton;

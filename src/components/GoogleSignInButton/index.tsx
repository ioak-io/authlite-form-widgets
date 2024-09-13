import React from "react";
import "./style.css";

interface Props {
  onGoogleAuth: any;
}

const GoogleLoginButton = (props: Props) => {
  const handleGoogleLogin = () => {
    const clientId =
      "1080184469568-apl20tffhv0fthvevi6uh44bqlj7ambk.apps.googleusercontent.com";
    // const redirectUri = "http://localhost:4000/api/auth";
    const redirectUri = "http://localhost:6006/";
    const scope = "https://www.googleapis.com/auth/userinfo.profile";
    const responseType = "code";

    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=${responseType}&scope=${encodeURIComponent(
      scope
    )}&include_granted_scopes=true`;

    // https://accounts.google.com/o/oauth2/v2/auth?client_id=1080184469568-apl20tffhv0fthvevi6uh44bqlj7ambk.apps.googleusercontent.com&redirect_uri=http://localhost:4000/api/auth&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile

    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    let data;

    const newWindow = window.open(
      oauthUrl,
      "GoogleLogin",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    window.addEventListener("message", (event) => {
      data = event.data;
      if (event.origin !== window.location.origin) return;
      if (event.data && event.data.code) {
        console.log(event.data);
        console.log("Authorization Code:", event.data.code);
      }

      if (event.data && event.data.profile) {
        alert(event.data);
        console.log("User Profile Data:", event.data.profile);
      }
    });

    const checkWindowClosed = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(checkWindowClosed);
        props.onGoogleAuth(localStorage.getItem("code"));
      }
    }, 500);
  };

  // return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="login-with-google-btn"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;

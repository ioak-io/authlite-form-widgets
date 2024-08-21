import React, { useEffect } from "react";

const GoogleSignInButton: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      (window as any).google.accounts.id.initialize({
        client_id:
          "293612139681-1altj77a8nep0hctd1bomg32hjd0h148.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      (window as any).google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
      );
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = async (response: any) => {
    console.log("response", response);
    console.log("Encoded JWT ID token: " + response.credential);

    const request = new Request("http://localhost:4000/api/auth", {
      method: "POST",
      body: JSON.stringify({
        code: response.credential,
        client_id: response.client_id,
      }),
    });

    const response1 = await fetch(request);
    console.log(response1.status);
  };

  return <div id="signInDiv"></div>;
};

export default GoogleSignInButton;

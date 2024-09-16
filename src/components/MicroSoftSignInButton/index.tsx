import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { AuthContext } from "../../services/AuthProvider";
import { getUserProfile } from "../../services/MicrosoftGraphAPI";

const MicroSoftSignInButton = () => {
  const { isAuthenticated, login, logout, msResponse } =
    useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const token = msResponse?.accessToken
        ? msResponse?.accessToken
        : sessionStorage.getItem("access_token");
      getUserProfile(token).then((profile) => {
        console.log(profile);
        setUserProfile(profile);
      });
    }
  }, [isAuthenticated]);

  return (
    <div>
      {!isAuthenticated && (
        <button className="ms-login-button" type="button" onClick={login}>
          <object
            type="image/svg+xml"
            data="https://s3-eu-west-1.amazonaws.com/cdn-testing.web.bas.ac.uk/scratch/bas-style-kit/ms-pictogram/ms-pictogram.svg"
            className="microsoft-icon"
          ></object>
          <span>Sign in with Microsoft</span>
        </button>
      )}

      {/* {isAuthenticated && userProfile && (
        <div className="profile-info">
          {userProfile?.picture ? (
            <img
              src={userProfile?.picture}
              alt="User profile"
              className="profile-picture"
            />
          ) : (
            <div className="profile-initials">
              {userProfile?.displayName
                ? userProfile?.displayName.charAt(0)
                : "?"}
            </div>
          )}
          <span>{userProfile?.displayName}</span>
        </div>
      )} */}
    </div>
  );
};

export default MicroSoftSignInButton;

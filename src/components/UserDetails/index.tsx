import React from "react";
import "./style.css";

const UserDetails = ({ firstName, lastName, imageUrl }) => {
  return (
    <div className="profile-container">
      <img
        className="profile-image"
        src={imageUrl}
        alt={`${firstName} ${lastName}`}
        onError={(e) => {
          e.target.src = imageUrl;
        }}
      />
      <div className="user-name">
        <span className="first-name">{firstName}</span>
        <span className="last-name">{lastName}</span>
      </div>
    </div>
  );
};

export default UserDetails;

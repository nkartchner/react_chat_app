import React from "react";
import "./User.css";
const User = ({ user }) => {
  return (
    <div className="user">
      <img height="35" className="user_avatar" src={user.avatar} />
      <h2 className="user-name">{user.name}</h2>
    </div>
  );
};

export default User;

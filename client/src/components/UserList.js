import React from "react";
import User from "./User";
const UserList = ({ users }) => {
  return (
    <div className="users-list">
      {users.map(user => (
        <User user={user} key={user._id} />
      ))}
    </div>
  );
};

export default UserList;

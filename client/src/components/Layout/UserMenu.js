import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Dashboard</h4>
          {/* While Naviagating using to="" if path doesn't start with '/' it means the path appends to the current path you are in  */}
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          {/*this is recommended to use: While Naviagating using to="" if path start with '/' it meand it navigate to path which you write   */}
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          
        </div>
      </div>
    </>
  );
};

export default UserMenu;

import React from 'react'
import {NavLink} from 'react-router-dom'
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Pannel</h4>
          {/* While Naviagating using to="" if path doesn't start with '/' it means the path appends to the current path you are in  */}
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          {/*this is recommended to use: While Naviagating using to="" if path start with '/' it meand it navigate to path which you write   */}
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default AdminMenu
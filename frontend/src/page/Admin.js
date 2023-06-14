import React from "react";
import { useLocation } from "react-router-dom";

let Admin = (props) =>{
    const location = useLocation();
    const user = location.state && location.state.user;
    return(
      
        <>
          <pre>{JSON.stringify(user)}</pre>
        <p>this is admin page</p>
        <h2>Welcome, {user.name}!</h2>
         <p>Email: {user.email}</p>
         <p>Role ID: {user.role_id}</p>
        </>
    )
}
export default Admin;
import React from "react";
import { useLocation } from "react-router-dom";

let LoginPage = () =>{
    const location = useLocation();
    const user = location.state && location.state.user;
    return(
        <>
        <p>this is user page</p>
        <h2>Welcome, {user.name}!</h2>
         <p>Email: {user.email}</p>
         <p>Role ID: {user.role_id}</p>
        </>
    )
}
export default LoginPage;
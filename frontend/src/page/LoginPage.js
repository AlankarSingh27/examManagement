import React, {  useState } from "react";
import { UserService } from "../loginService/LoginService";
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'; 

let LoginPage = () => {
  const navigate = useNavigate()
  let [user, setUser] = useState({
    email: "",
    password: "",
  });


  let login = (e) => {
    e.preventDefault();
    console.log(user);
    let userService = new UserService();
    userService.loginUser(user)
        // const data = { email: user.email, password:user.password }
        // axios.post('http://localhost:8081/user/login', data)
            
        .then(res => {
        
          if (res.data.user) {
              localStorage.setItem('user', JSON.stringify(res.data.user));
          }
  
          if (res.data.token) {
            // Save token in cookies
            Cookies.set('token', res.data.token,{expireIn:res.data.expireIn});
          }
          console.log(res.data.user.role_id);
          if(res.data.user.role_id===1){
            navigate('/admin', { state: { user: res.data.user } } )
          }
          else{
            navigate('/user',{ state: { user: res.data.user } })
          }
       })
      .catch((err) => {
                console.log(err)
            })
  }
  return (
    
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-4">
            <div className="card ">
              <div className="card-header bg-success text-white">
                <p className="h4">Login Here</p>
              </div>
              <div className="card-body">
                <form onSubmit={login}>
                  <div className="form-group">
                    <input
                      name="email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      type="text"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      name="password"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      type="password"
                      className="form-control mt-4"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="login"
                      className="btn btn-success btn-sm mt-2"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
  );
}

export default LoginPage;

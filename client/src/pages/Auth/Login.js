import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import "../../styles/Authstyles.css";
import { useAuth } from "../../context/Auth";
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();
  const location =useLocation();
  //form function
  //e.prevent is used to prevent the default behaviou. Javascript refreshes the page on submit defaultly
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {  email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
            ...auth,
             user:res.data.user,
             token:res.data.token,
        })
        // storing user details in local storage(need to convert in string to use in local storage)
        localStorage.setItem("auth",JSON.stringify(res.data));
        
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title="Login">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h3 className="title">Log IN</h3>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <button type="button" className="btn btn-primary forgot-btn" onClick={() => {navigate('/forgot-password')} }>
            Forgot Password
          </button>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;

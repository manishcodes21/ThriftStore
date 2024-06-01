import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/Authstyles.css";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  //form function
  //e.prevent is used to prevent the default behaviou. Javascript refreshes the page on submit defaultly
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newpassword,answer }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
       
        navigate( "/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title={"Forgot password of ecommerce app"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h3 className="title">Reset Password</h3>
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
            <label htmlFor="exampleInputEmail1" className="form-label">
              Enter Your dog name
            </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              New Password
            </label>
            <input
              type="password"
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          

          <button type="button" className="btn btn-primary"  onClick={navigate( "/login")}>
            Back 
          </button>
          <button type="submit" className="btn btn-primary">
            Reset 
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;

import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast"
import axios from "axios";
import {useNavigate} from "react-router-dom"
import "../../styles/Authstyles.css"
const Register = () => {
  const [name,setName]= useState("");
  const [email,setEmail]= useState("");
  const [phone,setPhone]= useState("");
  const [address,setAddress]= useState("");
  const [answer,setAnswer]= useState("");
  const [password,setPassword]= useState("");
  const navigate = useNavigate()
  
//form function
//e.prevent is used to prevent the default behaviou. Javascript refreshes the page on submit defaultly
const handleSubmit=async (e)=>{
  e.preventDefault();
  try {
    
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/auth/register`,
      { name, email, phone, address,answer, password }
    );
    if (res && res.data.success) {
      toast.success(res.data.message);
      navigate("/login");
    } else {
      toast.error(res.data.message);
    }
  } 
  catch (error) {
    console.log(error);
    toast.error('Something Went Wrong')
  }
}
  return (
    <Layout title="register">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h3 className="title">Sign Up</h3>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              required
            />
          </div>
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
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              What is your Dog name?
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;

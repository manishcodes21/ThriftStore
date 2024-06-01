import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import {Modal} from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName]=useState("")
  const [updatedName,setUpdatedName]=useState("")
  const [selected,setSelected]=useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  //handle form 
  const handleSubmit =async(e)=>{
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        {name}
      );
      // The optional chaining operator ?. can help prevent errors in cases where you're not sure if an object or its properties exist. It's particularly useful when dealing with nested object structures or when working with data from external sources where the structure may vary.
      if(data?.success){
        toast.success(`Created ${name} category successfully`)
        getAllCategories();
      }
      else{
        toast.error()
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in input form")
    }
  }
  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleEdit=async(e)=>{
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected}`,
        { name:updatedName }
      );
      // The optional chaining operator ?. can help prevent errors in cases where you're not sure if an object or its properties exist. It's particularly useful when dealing with nested object structures or when working with data from external sources where the structure may vary.
      // console.log(1)
      if (data?.success) {
        toast.success(`updated ${updatedName} category successfully`);
        // console.log(1);
        setSelected("");
        // console.log(1);
        setUpdatedName("");
        // console.log(1);
        setIsModalOpen(false);
        // console.log(1);
        getAllCategories();
        // console.log(1);
      }
       else {
        toast.error();
      }
    } 
    catch (error) {
      toast.error("something went wrong in editing")
    }
  }


  const handleDelete=async(c_name,c_id)=>{

    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${c_id}`
      );
      // The optional chaining operator ?. can help prevent errors in cases where you're not sure if an object or its properties exist. It's particularly useful when dealing with nested object structures or when working with data from external sources where the structure may vary.
      // console.log(1)
      if (data?.success) {
        toast.success(`${c_name} category id deleted successfully`);
       
        getAllCategories();
        // console.log(1);
      }
       else {
        toast.error();
      }
    } 
    catch (error) {
      toast.error("something went wrong in editing")
    }
  }
  return (
    <Layout title={"Dashboard-Add categories on Ecommerce"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage categories</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2" onClick={()=>{setIsModalOpen(true);setUpdatedName(c.name);setSelected(c._id)}} >Edit</button>
                          <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(c.name,c._id)}} >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              title="Basic Modal"
              open={isModalOpen}
              onOk={() => setIsModalOpen(false)}
              onCancel={() => setIsModalOpen(false)}
              footer={null}
            >
              <CategoryForm handleSubmit={handleEdit} value={updatedName} setValue={setUpdatedName}/>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;

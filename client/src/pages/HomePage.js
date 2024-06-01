import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/Auth'
const HomePage = () => {
  const [auth,setAuth]=useAuth();
  return (
    <Layout title={"Thrift Now - Thrift Store"}>
        <h1>Homepage</h1>
        <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  )
}

export default HomePage
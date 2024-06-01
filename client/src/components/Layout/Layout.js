import React from 'react'
import Header from './Header'
import Footer from './Footer';
import { Helmet } from "react-helmet";
import {Toaster} from "react-hot-toast";

const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster/>
        {children}   
      </main>
      <Footer />
    </div>
  );
};
//these are default props. that is if props are not passed then these defalut are used
Layout.defaultProps = {
  title:' Thrift Store',
  description:'a shopping website where you can purchase thrifted products and you can also thrift your clothes ',
  keywords:'mern,react,node,shopping,clothes,thrift,thrifted',
  author:'Manish Chandolu'
}

export default Layout
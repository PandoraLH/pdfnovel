import React from "react";
import Layout from "@/Layout/Layout";
import { List, Tabs, ConfigProvider } from "antd";
import styled from "@emotion/css";
import LoginForm from "@/Login/LoginForm";
import RegisterForm from "@/Login/RegisterForm";
import styles from "../styles/LoginPage.module.scss";



const LoginPage = () => {
   return (
      <>
         <Layout>
            <div>
               <div>Login Page</div>
            </div>
         </Layout>
      </>
   );
};

export default LoginPage;

import React from "react";
import Layout from "@/Layout/Layout";
import { Tabs } from "antd";
import LoginForm from "@/Login/LoginForm";
import RegisterForm from "@/Login/RegisterForm";
import styles from "../styles/LoginPage.module.scss";

const { TabPane } = Tabs;

const LoginPage = () => {
   return (
      <>
         <Layout>
            <div className="container">
               <Tabs
                  defaultActiveKey="login"
                  style={{
                     border: "1.5px solid #ccc",
                     borderRadius: "4px",
                     margin: "20px 0px",
                     width: "500px",
                     height: "400px",
                  }}
                  tabBarStyle={{
                     backgroundColor: "#fff",
                  }}
               >
                  <Tabs.TabPane
                     tab={
                        <div
                           style={{
                              fontSize: "16px",
                              border: "1.5px solid #ccc",
                           }}
                        >
                           LOGIN
                        </div>
                     }
                     key="login"
                  >
                     1
                  </Tabs.TabPane>
                  <Tabs.TabPane
                     tab={
                        <span
                           style={{
                              fontSize: "16px",
                           }}
                        >
                           REGISTER
                        </span>
                     }
                     key="register"
                  >
                     2
                  </Tabs.TabPane>
               </Tabs>
               <style jsx>
                  {`
                     .container {
                        display: flex;
                        justify-content: center;
                     }
                     .ant-tabs-nav-list {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                     }
                     .ant-tabs-tab {
                        width: 50%;
                        justify-content: center;
                     }
                  `}
               </style>
            </div>
         </Layout>
      </>
   );
};

export default LoginPage;

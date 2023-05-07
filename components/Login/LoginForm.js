import React from "react";
import { Form, Input, Button } from "antd";

const LoginForm = () => {
   const onFinish = (values) => {
      console.log("Received values:", values);
   };

   return (
      <Form
         onFinish={onFinish}
         style={{
            padding: "30px",
         }}
      >
         <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
         >
            <Input
               placeholder="Email Address"
               style={{
                  width: "500px",
               }}
            />
         </Form.Item>
         <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
         >
            <Input.Password placeholder="Password" />
         </Form.Item>
         <Form.Item>
            <Button
               type="primary"
               htmlType="submit"
               style={{
                  backgroundColor: "red",
               }}
            >
               Log in
            </Button>
         </Form.Item>
      </Form>
   );
};

export default LoginForm;

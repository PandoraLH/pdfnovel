import React from "react";
import { AuthInput, AuthLabel } from "../../components/Other/StyledComponents";
import { FormControl, Input, InputAdornment, Radio } from "@mui/material";
import Button from "@mui/base/Button";
import Image from "next/image";

const LoginPage = () => {
  const [password, setPassword] = React.useState(false);

  return (
    <div className="login flex items-center justify-between bg-zinc-100">
      <div className="login-container font-poppins flex-grow mx-10">
        <div className="login-welcome flex flex-col">
          <span className="font-bold text-4xl mb-3 tracking-wider">
            WELCOME BACK!
          </span>
          <span className="tracking-widest">
            Don’t have an account?{" "}
            <span className="text-blue-600 hover:opacity-60 cursor-pointer">
              Sign up
            </span>
          </span>
        </div>
        <div className="login-form">
          <div className="login-form-container-input mt-12">
            <AuthLabel>Username</AuthLabel>
            <AuthInput defaultValue="PandoraLH" disableUnderline />
            <AuthLabel>Password</AuthLabel>
            <AuthInput
              type="password"
              defaultValue="1234567891011"
              disableUnderline
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="tracking-wide">
              <Radio size="large" /> Remember me
            </span>
            <span className="text-blue-600 hover:opacity-60 cursor-pointer">
              Forgot password?
            </span>
          </div>
        </div>
        <Button>Login</Button>
        <div className="login-other"></div>
      </div>
      <div className="illustration-container flex-shrink-0">
        <Image
          className="ml-auto"
          src="/Explorer.png"
          width={600}
          height={500}
        />
      </div>
    </div>
  );
};

export default LoginPage;

LoginPage.getInitialProps = async () => {
  return {
    title: "Login", // Provide the title as a prop in getInitialProps
  };
};

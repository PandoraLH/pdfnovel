import React from "react";
import {
  AuthInput,
  AuthLabel,
  AuthButton,
} from "../../components/Other/StyledComponents";
import { FormControl, Radio } from "@mui/material";

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
          <div className="login-form-container-input mt-11">
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
              <Radio size="medium" /> Remember me
            </span>
            <span className="text-blue-600 hover:opacity-60 cursor-pointer">
              Forgot password?
            </span>
          </div>
        </div>
        <AuthButton className="my-[25px]">Login</AuthButton>
        <div className="login-other">
          <div className="flex items-center mx-10">
            <div class="flex-grow h-[2px]  bg-[#C8D3F9]"></div>
            <span class="px-2 text-black tracking-wider">or continue with</span>
            <div class="flex-grow h-[2px] bg-[#C8D3F9]"></div>
          </div>
          <div className="social-login"></div>
        </div>
      </div>
      <div className="illustration-container flex-shrink-0">
        <Image
          className="ml-auto"
          src="/explorer_female.png"
          width={600}
          height={500}
          alt="Explorer Illustration"
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

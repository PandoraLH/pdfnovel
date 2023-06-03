import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  AuthInput,
  AuthLabel,
  AuthButton,
} from "../../components/Other/StyledComponents";
import { Radio } from "@mui/material";
import FormControl from "@mui/base/FormControl";
import Image from "next/image";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  const username = useRef(null);
  const password = useRef(null);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        name: username.current.value,
        password: password.current.value,
      });
      router.push("/");
    } catch (error) {
      // Handle server error response
      const { data } = error.response;
      console.log(data);
      if (data.errorType === "username") {
        setUsernameError(data.message);
      } else if (data.errorType === "password") {
        setPasswordError(data.message);
      }
    }
  };

  const HelperText = ({ error }) => {
    return <p className="text-red-500 mt-2 text-sm tracking-wide">{error}</p>;
  };

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
        <form onSubmit={handleLogin}>
          <div className="login-form">
            <div className="login-form-container-input mt-11">
              <FormControl>
                <AuthLabel>Username</AuthLabel>
                <AuthInput
                  defaultValue="PandoraLH"
                  disableUnderline
                  autoComplete="current_username"
                  inputRef={username}
                  required
                />
                {usernameError && <HelperText error={usernameError} />}
              </FormControl>

              <FormControl>
                <AuthLabel htmlFor="password">Password</AuthLabel>
                <AuthInput
                  type="password"
                  defaultValue="1234567891011"
                  disableUnderline
                  autoComplete="current_password"
                  inputRef={password}
                  required
                />
                {passwordError && <HelperText error={passwordError} />}
              </FormControl>
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
          <AuthButton type="submit" className="my-[25px]">
            Login
          </AuthButton>
        </form>
        <div className="login-other">
          <div className="flex items-center mx-10">
            <div className="flex-grow h-[2px]  bg-[#C8D3F9]"></div>
            <span className="px-2 text-black tracking-wider">
              or continue with
            </span>
            <div className="flex-grow h-[2px] bg-[#C8D3F9]"></div>
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

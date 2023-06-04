import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  AuthInput,
  AuthLabel,
  AuthButton,
} from "../../components/Other/StyledComponents";
import { Radio } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import InputAdornment from "@mui/material/InputAdornment";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const Login = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/auth/login", {
        name: data.username,
        password: data.password,
      });
      toast.success("Login successful");
    } catch (error) {
      // Handle server error response
      const { data } = error.response;
      setError(data.errorType, {
        type: "validate",
        message: data.message,
      });
    }
  };

  const HelperText = ({ error }) => {
    return <p className="text-red-500 mt-2 text-sm tracking-wide">{error}</p>;
  };

  return (
    <div className="login flex items-center justify-between bg-zinc-100">
      <div className="login-container font-poppins flex-grow mx-10 my-10">
        <div className="login-welcome flex flex-col">
          <span className="font-bold text-4xl mb-3 tracking-wider">
            WELCOME BACK!
          </span>
          <span className="tracking-widest">
            Don’t have an account?{" "}
            <Link
              className="text-blue-600 hover:opacity-60 cursor-pointer"
              href="/signup"
            >
              Sign up
            </Link>
          </span>
        </div>
        <form onSubmit={handleSubmit(Login)}>
          <div className="login-form">
            <div className="login-form-container-input mt-11">
              <AuthLabel>Username</AuthLabel>
              <AuthInput
                defaultValue="username"
                disableUnderline
                autoComplete="current_username"
                required
                {...register("username")}
              />
              {errors.username && (
                <HelperText error={errors.username.message} />
              )}
              <AuthLabel htmlFor="password">Password</AuthLabel>
              <AuthInput
                type={showPassword ? "text" : "password"}
                defaultValue="1234567891011"
                disableUnderline
                autoComplete="current_password"
                required
                {...register("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <FaEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer"
                    />
                  </InputAdornment>
                }
              />
              {errors.password && (
                <HelperText error={errors.password.message} />
              )}
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
      <div className="illustration-container hidden lg:block">
        <Image
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

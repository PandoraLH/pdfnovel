import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  AuthInput,
  AuthLabel,
  AuthButton,
} from "../../components/Other/StyledComponents";
import { Radio } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

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
    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    if (result.error) {
      // Handle server error response
      const capitalizedError =
        result.error.charAt(0).toUpperCase() + result.error.slice(1);
      setError(result.error, {
        type: "validate",
        message: `${capitalizedError} is invalid`,
      });
    } else {
      toast.success("Login successful");
      router.back();
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
                placeholder="username"
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
                placeholder="1234567891011"
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
          <div className="flex flex-col justify-center mx-10">
            <div className="continue-with flex items-center">
              <div className="flex-grow h-[2px] bg-[#C8D3F9]"></div>
              <span className="px-2 text-black tracking-wider">
                or continue with
              </span>
              <div className="flex-grow h-[2px] bg-[#C8D3F9]"></div>
            </div>
            <div className="social-icons flex justify-center mt-2">
              <div
                className="rounded-xl mx-[15px] border-2 border-[#789ADE] py-4 px-7 inline-block cursor-pointer"
                onClick={() => {
                  signIn("google");
                }}
              >
                <FcGoogle className="text-4xl" />
              </div>
              <div
                className="rounded-xl mx-[15px] border-2 border-[#789ADE] py-4 px-7 inline-block cursor-pointer"
                onClick={() => {
                  signIn("facebook");
                }}
              >
                <FaFacebook className="text-4xl" color="blue" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="illustration-container hidden lg:block">
        <Image
          src="/explorer_female.png"
          width={700}
          height={500}
          alt="Explorer Illustration"
        />
      </div>
    </div>
  );
};

export default LoginPage;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      title: "Login",
    },
  };
}

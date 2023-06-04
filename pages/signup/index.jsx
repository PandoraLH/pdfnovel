import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  AuthInput,
  AuthLabel,
  AuthButton,
} from "../../components/Other/StyledComponents";
import axios from "axios";
import Link from "next/link";
import InputAdornment from "@mui/material/InputAdornment";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const Signup = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "validate",
        message: "Passwords do not match",
      });
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/auth/signup", {
        name: data.username,
        email: data.email,
        password: data.password,
      });
      toast.success("Signup successful");
      //TODO NextAuth Session
      //router.push("/login?signup=success");
    } catch (error) {
      // Handle server error response
      const { data } = error.response;
      if (data.errorType) {
        setError(data.errorType, {
          type: "validate",
          message: data.message,
        });
      } else {
        toast.error("Error signing up from server, please try again later");
      }
    }
  };

  const HelperText = ({ error }) => {
    return <p className="text-red-500 mt-2 text-sm tracking-wide">{error}</p>;
  };

  return (
    <div className="login flex items-center justify-between bg-zinc-100">
      <div className="login-container font-poppins flex-grow mx-20 my-10">
        <div className="login-welcome flex flex-col items-center">
          <span className="font-bold text-4xl mb-3 tracking-wider">
            BECOME A MEMBER!
          </span>
          <span className="tracking-widest">
            Already have an account?{" "}
            <Link
              className="text-blue-600 hover:opacity-60 cursor-pointer"
              href="/login"
            >
              Log in
            </Link>
          </span>
        </div>
        <form onSubmit={handleSubmit(Signup)}>
          <div className="login-form">
            <div className="login-form-container-input">
              <AuthLabel>Username</AuthLabel>
              <AuthInput
                defaultValue="Ex: PandoraLH"
                disableUnderline
                autoComplete="current_username"
                required
                {...register("username")}
              />
              {errors.username && (
                <HelperText error={errors.username.message} />
              )}
              <AuthLabel>Email</AuthLabel>
              <AuthInput
                defaultValue="Ex: PandoraLH@gmail.com"
                disableUnderline
                autoComplete="current_email"
                required
                {...register("email")}
              />
              {errors.email && <HelperText error={errors.email.message} />}
              <AuthLabel htmlFor="password">Password</AuthLabel>
              <AuthInput
                type={showPassword ? "text" : "password"}
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
              <AuthLabel htmlFor="password">Confirm password</AuthLabel>
              <AuthInput
                type={showConfirmPassword ? "text" : "password"}
                disableUnderline
                autoComplete="current_password"
                required
                {...register("confirmPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <FaEyeSlash
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="cursor-pointer"
                    />
                  </InputAdornment>
                }
              />
              {errors.confirmPassword && (
                <HelperText error={errors.confirmPassword.message} />
              )}
            </div>
          </div>
          <AuthButton type="submit" className="my-[25px]">
            Sign up
          </AuthButton>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

SignupPage.getInitialProps = async () => {
  return {
    title: "Signup", // Provide the title as a prop in getInitialProps
  };
};

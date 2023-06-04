import React, { useRef, useState } from "react";
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

const SignupPage = () => {
  const router = useRouter();
  const username = useRef(null);
  const password = useRef(null);
  const email = useRef(null);
  const confirmPassword = useRef(null);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password.current.value !== confirmPassword.current.value) {
      setConfirmPasswordError("Password does not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        name: username.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      router.push("/login?signup=success");
    } catch (error) {
      // Handle server error response
      const { data } = error.response;
      console.log(data);
      if (data.errorType === "username") {
        setUsernameError(data.message);
      } else if (data.errorType === "email") {
        setEmailError(data.message);
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
        <form onSubmit={handleSignup}>
          <div className="login-form">
            <div className="login-form-container-input">
              <AuthLabel>Username</AuthLabel>
              <AuthInput
                defaultValue="Ex: PandoraLH"
                disableUnderline
                autoComplete="current_username"
                inputRef={username}
                required
              />
              {usernameError && <HelperText error={usernameError} />}
              <AuthLabel>Email</AuthLabel>
              <AuthInput
                defaultValue="Ex: PandoraLH@gmail.com"
                disableUnderline
                autoComplete="current_email"
                inputRef={email}
                required
              />
              {emailError && <HelperText error={emailError} />}
              <AuthLabel htmlFor="password">Password</AuthLabel>
              <AuthInput
                type={showPassword ? "text" : "password"}
                disableUnderline
                autoComplete="current_password"
                inputRef={password}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <FaEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer"
                    />
                  </InputAdornment>
                }
              />
              {passwordError && <HelperText error={passwordError} />}
              <AuthLabel htmlFor="password">Confirm password</AuthLabel>
              <AuthInput
                type={showConfirmPassword ? "text" : "password"}
                disableUnderline
                autoComplete="current_password"
                inputRef={confirmPassword}
                required
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
              {confirmPasswordError && (
                <HelperText error={confirmPasswordError} />
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

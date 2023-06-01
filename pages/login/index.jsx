import React from "react";
import { AuthInput, AuthLabel } from "../../components/Other/StyledComponents";
import { Button, FormControl, Input, InputAdornment } from "@mui/material";

const LoginPage = () => {
  const [password, setPassword] = React.useState(false);

  return (
    <div className="login flex flex-col items-center bg-zinc-100">
      <div className="login-container font-poppins">
        <div className="login-welcome flex flex-col">
          <span className="font-bold text-4xl"> WELCOME BACK! </span>
          <span> Don’t have an account? Sign up.</span>
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
        </div>
        <div className="login-other"></div>
      </div>
    </div>
  );
};

export default LoginPage;

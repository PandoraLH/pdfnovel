import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { IoMdClose } from "react-icons/io";

import Input from "../Input/Input";

const Login = () => {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = (data) => {
      console.log(data);
   };

   return (
      <Box>
         <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
            <button
               className="p-1 border-0 hover:opacity-70 transition absolute left-9"
               onClick={handleClose}
            >
               <IoMdClose size={18} />
            </button>
            <div className="text-lg font-semibold">{title}</div>
         </div>
         <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subtitle="Login to your account!" />
            <Input
               id="email"
               label="Email"
               disabled={isLoading}
               register={register}
               errors={errors}
               required
            />
            <Input
               id="password"
               label="Password"
               type="password"
               disabled={isLoading}
               register={register}
               errors={errors}
               required
            />
         </div>
         <div className="flex flex-col gap-2 p-6">
            <div className="flex flex-row items-center gap-4 w-full">
               {secondaryAction && secondaryActionLabel && (
                  <Button
                     outline
                     disabled={disabled}
                     label={secondaryActionLabel}
                     onClick={handleSecondaryAction}
                  />
               )}

               <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
               />
            </div>
            <div className="flex flex-col gap-4 mt-3">
               <hr />
               <Button
                  outline
                  label="Continue with Google"
                  icon={FcGoogle}
                  onClick={() => {}}
               />
               <Button
                  outline
                  label="Continue with Github"
                  icon={AiFillGithub}
                  onClick={() => {}}
               />
               <div
                  className="
                        text-neutral-500 text-center mt-4 font-light"
               >
                  <p>
                     First time using Airbnb?
                     <span
                        onClick={() => {}}
                        className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
                     >
                        {" "}
                        Create an account
                     </span>
                  </p>
               </div>
            </div>{" "}
         </div>
      </Box>
   );
};

export default Login;

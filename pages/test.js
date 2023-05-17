import { Button } from "@mui/material";

const MyButton = () => {
   const buttonStyle = {
      backgroundColor: "red",
      color: "white",
      border: "none",
      borderRadius: "0",
   };

   return (
      <div className="button flex justify-center my-10 ">
         <Button style={buttonStyle} variant="contained">
            Click me!
         </Button>
      </div>
   );
};

export default MyButton;

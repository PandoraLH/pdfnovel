import { Button } from "@mui/material";

const MyButton = () => {
   const buttonStyle = {
      backgroundColor: "blue",
      color: "white",
   };

   return (
      <Button style={buttonStyle} variant="contained">
         Click me!
      </Button>
   );
};

export default MyButton;

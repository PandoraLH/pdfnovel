import { Input } from "@mui/material";
import { InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/base/Button";

const AuthInput = styled(Input)({
   borderRadius: "50px",
   padding: "0px 15px",
   border: "2px solid",
   fontSize: "20px",
   letterSpacing: "2px",
   borderColor: "#789ADE",
   color: "#C8D3F9",
   marginTop: "15px",
   width: "100%",
   WebkitTextFillColor: "#C8D3F9",
});

const AuthLabel = styled(InputLabel)({
   fontFamily: "Poppins",
   letterSpacing: "1px",
   fontSize: "20px",
   fontWeight: "600",
   marginTop: "15px",
});

const AuthButton = styled(Button)({
   borderRadius: "50px",
   padding: "8px 15px",
   border: "2px solid",
   fontSize: "20px",
   fontWeight: "600",
   letterSpacing: "2px",
   backgroundColor: "#8699DA !important",
   color: "white",
   width: "100%",
   ":hover": {
      opacity: "0.9",
   },
});

export { AuthInput, AuthLabel, AuthButton };

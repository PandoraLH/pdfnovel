import { Input } from "@mui/material";
import { InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

const AuthInput = styled(Input)({
  borderRadius: "50px",
  padding: "0px 15px",
  border: "2px solid",
  fontSize: "20px",
  letterSpacing: "2px",
  borderColor: "#789ADE",
  color: "#C8D3F9",
  width: "100%",
  margin: "15px 0px",
});

const AuthLabel = styled(InputLabel)({
  fontFamily: "Poppins",
  letterSpacing: "1px",
  fontSize: "20px",
  fontWeight: "600",
});

export { AuthInput, AuthLabel };

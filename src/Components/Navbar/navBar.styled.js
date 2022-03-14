import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const AddButton = styled(Button)({
  height: 60,
  fontSize: 30,
  color: "#fff",
  border: "2px solid #fff",
  "&:hover": {
    backgroundColor: "#fff",
    border: "2px solid #fff",
    color: "#1f1f1f",
  },
});

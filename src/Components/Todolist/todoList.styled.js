import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TodoCard = styled(Card)({
  maxWidth: 350,
  fontFamily: "Roboto",
  padding: 30,
  margin: 15,
  border: "4px solid #1f1f1f",
  borderRadius: 25,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
  },
});

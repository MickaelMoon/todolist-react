import React, { useState } from "react";

import { Box, Container } from "@mui/material";
import { Todolist } from "../Components/Todolist/Todolist";

export default function Home() {
  const [todoId, setTodoId] = useState("");
  const getTodoIdHandler = (id) => {
    setTodoId(id);
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      ></Box>
      <Todolist getTodoId={getTodoIdHandler} />
    </Container>
  );
}

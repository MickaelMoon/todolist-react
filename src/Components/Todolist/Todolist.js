import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";
import { NavLink } from "react-router-dom";
import { Typography, Button, Grid } from "@mui/material";

import FeedbackRoundedIcon from "@mui/icons-material/FeedbackRounded";
import InfoIcon from "@mui/icons-material/Info";

import { TodoCard } from "./todoList.styled";
import CircularProgress from "@mui/material/CircularProgress";
import TodoDataService from "../../services/todo.services";

export const Todolist = ({ getTodoId }) => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = async () => {
    const data = await TodoDataService.getAllTodos();
    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };
  if (loading) {
    return (
      <h1 className="loading-state">
        <CircularProgress />
        Loading...
      </h1>
    );
  }
  const deleteHandler = async (id) => {
    await TodoDataService.deleteTodo(id);
    getTodos();
  };
  return (
    <>
      {todos.map((todo) => (
        <TodoCard key={todo.id}>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item xs={12}>
              <Typography
                variant="h4"
                sx={{
                  marginBottom: 2,
                  color: "#1f1f1f",
                  fontWeight: "600",
                }}
              >
                {todo.title}
              </Typography>
            </Grid>

            <Grid item xs={1}>
              {todo.prio ? (
                <FeedbackRoundedIcon sx={{ color: "#CC5A71" }} />
              ) : (
                <FeedbackRoundedIcon sx={{ color: "#8BBF9F" }} />
              )}
            </Grid>
            <Grid item xs={11}>
              {todo.prio ? (
                <Typography
                  variant="p"
                  sx={{ color: "#CC5A71", fontWeight: 600 }}
                >
                  Urgent
                </Typography>
              ) : (
                <Typography
                  variant="p"
                  sx={{ color: "#8BBF9F", fontWeight: 600 }}
                >
                  Pas urgent
                </Typography>
              )}
            </Grid>

            <Grid item xs={1}>
              <InfoIcon sx={{ color: "#38A3A5" }} />
            </Grid>
            <Grid
              item
              xs={11}
              sx={{
                marginBottom: 2,
              }}
            >
              <Typography variant="p">
                <span style={{ color: "#38A3A5", fontWeight: 600 }}>
                  Infos:{" "}
                </span>
                {todo.infos.substring(0, 80)}...
              </Typography>
            </Grid>

            <Grid item container xs={6}>
              <Button
                onClick={(e) => deleteHandler(todo.id)}
                variant="outlined"
                fullWidth
                sx={{
                  backgroundColor: "#fff",
                  border: "2px solid #C44536",
                  color: "#C5283D",
                  "&:hover": {
                    border: "2px solid #C44536",
                    color: "#fff",
                    backgroundColor: "#C44536",
                  },
                }}
              >
                Supprimer
              </Button>
            </Grid>

            <Grid item container xs={6}>
              <NavLink to={`/todos/${todo.id}`} style={{ width: "100%" }}>
                <Button
                  onClick={(e) => getTodoId(todo.id)}
                  variant="contained"
                  fullWidth
                  sx={{
                    color: "#fff",
                    backgroundColor: "#1f1f1f",
                    "&:hover": {
                      backgroundColor: "#4f4f4f",
                    },
                  }}
                >
                  Détails
                </Button>
              </NavLink>
            </Grid>
          </Grid>
        </TodoCard>
      ))}
    </>
  );
};

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { collection } from "firebase/firestore";
import {
  Button,
  AppBar,
  Container,
  Modal,
  Box,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AddButton } from "./navBar.styled";
import TodoDataService from "../../services/todo.services";

const CustomBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  minHeight: 400,
  padding: 20,
  background: "#fff",
  border: "4px solid #1f1f1f",
  boxShadow: 24,
  borderRadius: 25,
  fontFamily: "Roboto",
});

export const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState("");
  const [prio, setPrio] = useState(false);
  const [infos, setInfos] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = {
      title,
      prio,
      infos,
    };
    try {
      await TodoDataService.addTodos(newTodo);
      handleClose();
      setTitle("");
      setPrio(false);
      setInfos("");
    } catch (err) {
      window.alert("Impossible");
    }
  };
  return (
    <>
      <header>
        <AppBar position="static" sx={{ backgroundColor: "#1f1f1f" }}>
          <Container maxWidth="x1">
            <Toolbar>
              <Typography
                onClick={() => navigate("/")}
                variant="h2"
                sx={{
                  fontFamily: "Roboto",
                  fontWeight: "600",
                  cursor: "pointer",
                  flex: 1,
                  color: "#fff",
                  padding: "1rem 0",
                }}
              >
                📝 Todo List
              </Typography>
              <AddButton
                onClick={handleOpen}
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
              >
                Add
              </AddButton>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <CustomBox>
                  <form onSubmit={handleSubmit}>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      spacing={2}
                    >
                      <Grid item>
                        <Typography
                          variant="p"
                          sx={{
                            color: "#1f1f1f",
                            fontWeight: 600,
                            fontSize: 30,
                          }}
                        >
                          Ajouter tâche
                        </Typography>
                      </Grid>

                      <Grid item>
                        <TextField
                          placeholder="ex: Coder 🚀"
                          label="Titre"
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <TaskAltIcon sx={{ color: "#1f1f1f" }} />
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                          fullWidth
                          required
                        />
                      </Grid>

                      <Grid item>
                        <TextField
                          label="Infos"
                          multiline
                          rows={3}
                          placeholder="ex: Terminer de coder mon projet ToDo App 😤"
                          fullWidth
                          onChange={(e) => setInfos(e.target.value)}
                          value={infos}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <InfoOutlinedIcon
                                  sx={{ color: "rgb(56,163,165)" }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          required
                        />
                      </Grid>

                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={prio}
                              onChange={() => setPrio(!prio)}
                              inputProps={{ "aria-label": "controlled" }}
                              label="Urgent"
                            />
                          }
                          label="Urgent"
                        />
                      </Grid>

                      <Grid item>
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          endIcon={<ArrowForwardOutlinedIcon />}
                          sx={{
                            backgroundColor: "#1f1f1f",
                            border: "2px solid #1f1f1f",
                            "&:hover": {
                              backgroundColor: "#4f4f4f",
                            },
                          }}
                        >
                          Ajouter
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CustomBox>
              </Modal>
            </Toolbar>
          </Container>
        </AppBar>
      </header>
    </>
  );
};

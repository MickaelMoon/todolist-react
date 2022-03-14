import { Card, Container, Grid, IconButton } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { styled } from "@mui/material/styles";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import FeedbackRoundedIcon from "@mui/icons-material/FeedbackRounded";
import InfoIcon from "@mui/icons-material/Info";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";

import { Box } from "@mui/system";
import { Todolist } from "../../Components/Todolist/Todolist";
import TodoDataService from "../../services/todo.services";

const TodoDetailedCard = styled(Card)({
  width: 1000,
  marginTop: 50,
  padding: "0 2rem 2rem 2rem",
  fontFamily: "Roboto",
  border: "4px solid #1f1f1f",
  borderRadius: 25,
});

export const TodoDetail = () => {
  const [title, setTitle] = useState("");
  const [prio, setPrio] = useState(false);
  const [infos, setInfos] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTodo(id);
  });
  const getTodo = async (id) => {
    const data = await TodoDataService.getTodo(id);
    setTitle(data.data().title);
    setPrio(data.data().prio);
    setInfos(data.data().infos);
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <>
        <TodoDetailedCard>
          <IconButton
            onClick={() => navigate("/")}
            sx={{
              position: "relative",
              left: 50,
              top: 65,
            }}
          >
            <ArrowBackRoundedIcon sx={{ color: "#1f1f1f", fontSize: 40 }} />
          </IconButton>

          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            spacing={2}
          >
            <Grid item xs={12}>
              <Typography
                variant="p"
                sx={{
                  color: "#1f1f1f",
                  fontWeight: "600",
                  fontSize: 50,
                  textAlign: "center",
                }}
              >
                {title}
              </Typography>
            </Grid>

            <Grid
              item
              container
              xs={12}
              direction="row"
              justifyContent="center"
            ></Grid>

            <Grid item container direction="row" justifyContent="center">
              {prio ? (
                <FeedbackRoundedIcon sx={{ color: "rgb(204,90,113)" }} />
              ) : (
                <FeedbackRoundedIcon sx={{ color: "rgb(139,191,159)" }} />
              )}
              {prio ? (
                <Typography
                  variant="p"
                  sx={{ color: "rgb(204,90,113)", fontWeight: 600 }}
                >
                  Urgent
                </Typography>
              ) : (
                <Typography
                  variant="p"
                  sx={{ color: "rgb(139,191,159)", fontWeight: 600 }}
                >
                  Pas urgent
                </Typography>
              )}
            </Grid>

            <Grid item container xs={12}>
              <Card
                sx={{
                  width: "100%",
                  padding: 3,
                  border: "2px solid rgb(56,163,165)",
                  borderRadius: 6,
                  backgroundColor: "rgb(56,163,165, 0.3)",
                }}
              >
                <Typography variant="p">
                  <InfoIcon sx={{ color: "rgb(56,163,165)" }} />
                  {infos}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </TodoDetailedCard>
      </>
    </Container>
  );
};

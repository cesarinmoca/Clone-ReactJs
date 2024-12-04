import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { makeStyles } from "@mui/styles";
import { Button, Typography } from "@mui/material";
import { auth, firestore } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import requests from "../Request";
import instance from "../axios";

const Banner = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [movie, setMovie] = useState([]);
  const truncate = (string, n) =>
    string?.length > n ? `${string.substr(0, n - 1)}...` : string;

  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(requests.fetchTrending);
      const random = Math.floor(
        Math.random() * request.data.results.length - 1
      );
      setMovie(request.data.results[random]);
      return request;
    };
    fetchData();
  }, []);

  const addToMyList = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .set({
        email: auth.currentUser.email,
        uid: auth.currentUser.uid,
        myList: [movie],
      });
  };

  return (
    <div
      className={classes.banner}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className={classes.overlay}></div>
      <div className={classes.content}>
        <Typography variant="h2" component="h1" className={classes.title}>
          {movie?.title || movie?.name || movie?.original_name}
        </Typography>
        <div className={classes.buttons}>
          <Button
            onClick={() => navigate(`/about/${movie?.id}`, { state: movie })}
            className={classes.playButton}
          >
            Play
          </Button>
          <Button onClick={() => addToMyList()} className={classes.listButton}>
            My List
          </Button>
        </div>
        <Typography variant="h6" className={classes.description}>
          {truncate(movie?.overview, 160)}
        </Typography>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  banner: {
    height: "450px",
    position: "relative",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#ffffff",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end", // Ensures content stays at the bottom
    "&:hover $overlay": {
      opacity: 1,
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.6)",
    opacity: 0,
    transition: "all 0.3s ease",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    marginLeft: theme.spacing(4),
    paddingTop: theme.spacing(2),
    maxWidth: "600px",
    paddingBottom: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end", // Ensures that the description stays at the bottom
  },
  title: {
    fontWeight: 900,
    fontSize: "3rem",
    paddingBottom: theme.spacing(3),
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
  },
  buttons: {
    display: "flex",
    gap: "1rem",
    marginBottom: theme.spacing(3),
  },
  playButton: {
    fontWeight: 700,
    padding: theme.spacing(1, 4),
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    "&:hover": {
      backgroundColor: "#e60000",
    },
  },
  listButton: {
    fontWeight: 700,
    padding: theme.spacing(1, 4),
    backgroundColor: "rgba(51, 51, 51, 0.5)",
    "&:hover": {
      backgroundColor: "#e6e6e6",
    },
  },
  description: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    width: "75%",
    maxWidth: "500px",
    textShadow: "1px 1px 5px rgba(0, 0, 0, 0.7)",
    overflow: "hidden", // Prevents overflowing
    textOverflow: "ellipsis", // Adds ellipsis if the text is too long
    whiteSpace: "nowrap", // Prevents text from wrapping
  },
}));

export default Banner;

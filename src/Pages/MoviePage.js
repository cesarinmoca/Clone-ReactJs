import React from "react";
import { useLocation, useParams } from "react-router";
import { makeStyles } from "@mui/styles";
import { Button, Typography } from "@mui/material";
const MoviePage = () => {
  const classes = useStyles();
  const { state: movie } = useLocation();

  const [movieName, setMovieName] = React.useState(movie?.title || movie?.name || movie?.original_name);
  console.log(movie);


  const truncate = (string, n) =>
    string?.length > n ? `${string.substr(0, n - 1)}...` : string;


  return (
    <div
      class={classes.banner}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className={classes.content}>
        <Typography variant="h2" component="h1">
          {movie?.title || movie?.name || movie?.original_name}
        </Typography>
        <div className={classes.buttons}>
          <Button onClick={()=> {
            window.open(`https://www.youtube.com/results?search_query=${movie?.original_name}+movie`, "_blank")
          }}>Play</Button>
          <Button>My List</Button>
        </div>
        <Typography
          style={{ wordWrap: "break-word" }}
          variant="h6"
          className={classes.descripcion}
        >
          {truncate(movie?.overview, 160)}
        </Typography>
        <div className={classes.fadebottom}></div>
      </div>
     
    </div>
  );
};

export default MoviePage;

const useStyles = makeStyles((theme) => ({
  banner: {
    height: "440px",
    position: "relative",
    objectFit: "contain",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#ffffff",
  },
  content: {
    marginLeft: theme.spacing(4),
    paddingTop: theme.spacing(16),
    "& h2": {
      fontWeight: 800,
      paddingBottom: theme.spacing(3),
    },
  },
  descripcion: {
    marginTop: theme.spacing(5),
    width: "45rem",
    lineHeight: "1.3",
    maxWidth: "380px",
    height: "80px",
  },
  buttons: {
    "& button": {
      cursor: "pointer",
      color: "#fff",
      fontWeight: 700,
      borderRadious: "5px",
      padding: theme.spacing(1, 4, 1, 4),
      marginRight: "1rem",
      backgroundColor: "rgba(51,51,51,0.5)",
    },
    "& button:hover": {
      color: "#000",
      backgroundColor: "#e6e6e6",
    },
  },
  fadebottom: {
    position: "absolute",
    top: "30vh",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    backgroundImage:
      "linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111)",
  },
}));
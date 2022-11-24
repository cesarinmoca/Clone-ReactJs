import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import { makeStyles } from "@mui/styles";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import {selectMovie} from '../trailers'
import YouTube from "react-youtube";

const MoviePage = () => {
  const classes = useStyles();
  const { state: movie } = useLocation();

  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  // endpoint para las imagenes
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  // variables de estado

  //const [selectedMovie, setSelectedMovie] = useState({})
  const [trailer, setTrailer] = useState(null);
  const [Movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);





  const fetchMovie = async() =>{
    const { data } = await axios.get(`${API_URL}/movie/${movie.id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    //return data
    setMovie(data);
  }

useEffect(()=>{
  fetchMovie()
},[])



  console.log(movie);

  const truncate = (string, n) =>
    string?.length > n ? `${string.substr(0, n - 1)}...` : string;

  return (
    <>
    
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
    <main>
          {Movie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${Movie.backdrop_path}")`,
              }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container"
                    containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="boton">
                    Close
                  </button>
                </>
              ) : (
                <div className="container">
                  <div className="">
                    {trailer ? (
                      <button
                        className="boton"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      "Sorry, no trailer available"
                    )}
                    <h1 className="text-white">{Movie.title}</h1>
                    <p className="text-white">{Movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </main>
    </>
    

    
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
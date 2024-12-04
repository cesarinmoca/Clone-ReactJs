import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Skeleton, Typography } from "@mui/material";
import instance from "../axios";
import { useNavigate } from "react-router";

const Rows = ({ title, fetchUrl, isLargeRow }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [movies, setMovies] = useState([]);

  const API_KEY = "52abd33f37ed4adae2df8ac3891c2bbb";

  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  if (!movies.length) {
    return (
      <div className={classes.skeletonContainer}>
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton variant="rectangular" width={210} height={118} />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      <div className={classes.posters}>
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                key={movie.id}
                className={`${classes.poster} ${isLargeRow ? classes.posterLarge : ''}`}
                src={`https://image.tmdb.org/t/p/original${
                  isLargeRow ? movie.poster_path : movie?.backdrop_path
                }?api_key=${API_KEY}`}
                alt={movie?.name}
                onClick={() =>
                  navigate(`/about/${movie?.id}`, { state: movie })
                }
              />
            )
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    color: "#fff",
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  title: {
    fontWeight: "bold",
    fontSize: "2rem", // Aumentamos el tamaño del título para hacerlo más llamativo
    color: "#fff",
    marginBottom: theme.spacing(3),
    letterSpacing: "2px", // Espaciado entre letras para más estilo
    textTransform: "capitalize", // Le damos un estilo más limpio y atractivo
    fontFamily: "'Roboto', sans-serif", // Establecemos una fuente más profesional
  },
  posters: {
    display: "flex",
    overflowY: "hidden",
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    gap: theme.spacing(3), // Espacio entre los posters
  },
  poster: {
    width: "250px", // Tamaño estándar de los posters
    height: "auto",
    objectFit: "cover",
    borderRadius: "8px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)", // Sombra sutil
    "&:hover": {
      transform: "scale(1.1)", // Efecto de hover ampliado
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)", // Sombra más intensa en hover
    },
  },
  posterLarge: {
    width: "280px", // Para posters grandes
    height: "auto",
  },
  skeletonContainer: {
    display: "flex",
    gap: theme.spacing(2),
  },
}));

export default Rows;

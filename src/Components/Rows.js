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

  if (movies === []) {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  return (
    <>
      {/* <Skeleton variant="rectangular" width={210} height={118} /> */}
      <div className={classes.contenedor}>
        <Typography variant="h4">{title}</Typography>
        <div className={classes.posters}>
          {movies.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) &&
              (!movie ? (
                <Skeleton variant="rectangular" width={210} height={118} />
              ) : (
                <img
                  className={`${classes.poster} ${
                    isLargeRow && classes.posterLarge
                  }`}
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/original${
                    isLargeRow ? movie.poster_path : movie?.backdrop_path
                  }?api_key=${API_KEY}`}
                  alt={movie?.name}
                  onClick={() =>
                    navigate(`/about/${movie?.id}`, { state: movie })
                  }
                />
              ))
          )}
        </div>
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  contenedor: {
    color: "#fff",
    marginLeft: theme.spacing(4),
  },
  posters: {
    display: "flex",
    overflowY: "hidden",
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  poster: {
    maxHeight: "12rem",
    objectFit: "contain",
    marginRight: theme.spacing(1),
    transition: "transform 450ms",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));

export default Rows;

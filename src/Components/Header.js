import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import instance from "../axios";
import CustomSearchItem from "./CustomSearchItem";
import logoOwl from "../Images/owl.png";  // Ruta de tu logo de búho

// get window width
const width = window.innerWidth;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: "rgba(0, 0, 0, 0.8)",  // Fondo negro para la barra de búsqueda
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.9)",  // Fondo ligeramente más oscuro al pasar el mouse
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: "auto",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(4),
    width: "400px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",  // Icono de búsqueda en blanco
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "#fff",  // El texto dentro de la barra de búsqueda será blanco
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "52abd33f37ed4adae2df8ac3891c2bbb";

  const hideHeader = () => {
    if (window.scrollY > 80) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", hideHeader);
    return () => window.removeEventListener("scroll", hideHeader);
  }, []);

  const clearSearch = () => {
    setData([]);
  };

  const handleSearch = async (value) => {
    if (value === "") {
      setData([]);
    } else {
      const response = await instance.get(`${API_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: value,
        },
      });
      setData(response.data.results);
    }
  };

  return (
    <AppBar
      position="fixed"
      className={`${classes.header} ${show && classes.transparent}`}
    >
      <Toolbar className={classes.toolbar}>
        {/* Logo */}
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => navigate("/home")}>
            <img
              src={logoOwl}  // Ruta de tu logo de búho
              alt="Logo"
              className={classes.logo}
            />
          </IconButton>
        </Box>

        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search movies..."
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Search>

        {/* Profile */}
        <Avatar
          variant="circle"
          className={classes.avatar}
          onClick={() => navigate("/profile")}
        />
      </Toolbar>

      {/* Search Results */}
      {data?.length > 0 &&
        data?.map((movie) => (
          <CustomSearchItem
            name={movie?.title}
            movie={movie}
            key={movie.id}
            id={movie.id}
            image={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}?api_key=${API_KEY}`}
            clearSearch={clearSearch}
          />
        ))}
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#000 !important",  // Fondo negro para el header
    transition: "background-color 0.3s ease",
  },
  transparent: {
    backgroundColor: "rgba(0, 0, 0, 0.8) !important",  // Fondo negro semitransparente cuando se hace scroll
  },
  logo: {
    width: "60px",  // Ajusta el tamaño del logo
    cursor: "pointer",
    filter: "invert(1)",  // Invertir el color del logo a blanco
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#ff3d00",  // Color de fondo del avatar
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ff5733",  // Color cuando pasa el cursor
    },
  },
}));

export default Header;

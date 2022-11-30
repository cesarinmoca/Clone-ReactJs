import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../Images/Logo.png";
import instance from "../axios";
import requests from "../Request";
import CustomSearchItem from "./CustomSearchItem";

// get window width
const width = window.innerWidth;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F3F3F3",
  "&:hover": {
    backgroundColor: "#F3F3F3",
  },
  marginRight: theme.spacing(2),
  marginLeft: 40,

  [theme.breakpoints.up("sm")]: {
    width: "500px",
    marginRight: "auto",
  },
  [theme.breakpoints.up("md")]: {
    width: "100%",
    marginRight: 40,
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
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),

    [theme.breakpoints.up("md")]: {
      width: "1400px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "600px",
    },
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
    <AppBar elevation={0} class={`${"barra"} ${show && "transparent"}`}>
      <Toolbar className={classes.toolbar}>
        <IconButton onClick={() => navigate("/")}>
          {/* <img src={logo} alt="logo" className={classes.logo}/> */}
          <Typography
            variant="h4"
            style={{
              color: "white",
            }}
          >
            CyberStream
          </Typography>
        </IconButton>
        <Search>
          <SearchIconWrapper>
            <SearchIcon color="black" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Busqueda..."
            inputProps={{
              "aria-label": "search",
            }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Search>
        <Avatar
          variant="square"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/profile")}
        />
      </Toolbar>
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
  header: {},
  logo: {
    width: "100px",
    cursor: "pointer",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export default Header;

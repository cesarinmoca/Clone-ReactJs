import React from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { NetflixButton, NetflixInput } from "../Styled/styledcomponents";
import { useNavigate } from "react-router";
import owl from "../Images/owl.png";

const SignUp = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  const register = async (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.background}>
      <div className={classes.overlay}>
        <div className={classes.contenedor}>
          <img src={owl} alt="logo" className={classes.logo} />
          <Typography variant="h5" align="left" className={classes.title}>
            Inicio de sesión
          </Typography>
          <form className={classes.form}>
            <NetflixInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Correo electrónico"
              className={classes.email}
            />
            <NetflixInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Contraseña"
              className={classes.password}
            />
            <NetflixButton
              onClick={signIn}
              style={{ marginBottom: "8px" }}
              type="submit"
              radius="true"
            >
              Acceder
            </NetflixButton>
            <Typography variant="subtitle2" className={classes.subtitle}>
              ¿Nuevo Usuario?
            </Typography>
            <Typography variant="subtitle2" className={classes.subtitle}>
              <span className={classes.signupLink} onClick={register}>
                Regístrate ahora
              </span>
            </Typography>
          </form>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100vw",
    height: "100vh",
    backgroundImage: "url('https://cdn.pixabay.com/photo/2016/10/27/23/52/cinema-1777190_1280.jpg')", // Nueva imagen de fondo
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Para mejorar el contraste
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contenedor: {
    maxWidth: "400px",
    width: "90%",
    padding: "2rem",
    background: "rgba(0, 0, 0, 0.85)",
    borderRadius: "15px",
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
  },
  logo: {
    height: "80px",
    marginBottom: "1rem",
    filter: "brightness(0) invert(1)", // Cambia el logo a blanco
  },
  title: {
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  email: {
    marginBottom: "1.5rem",
    width: "100%",
  },
  password: {
    marginBottom: "2rem",
    width: "100%",
  },
  subtitle: {
    color: "#b0b0b0",
    marginTop: "1rem",
  },
  signupLink: {
    cursor: "pointer",
    color: "#ffffff",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default SignUp;

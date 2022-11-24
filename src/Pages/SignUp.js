import React from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { NetflixButton, NetflixInput } from "../Styled/styledcomponents";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import owl from "../Images/owl.png"

const SignUp = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => navigate("/"))
      .catch((err) => alert(err.message));
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => navigate("/"))
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <div className={classes.contenedor}>
        <img src={owl} alt="logo" className={classes.logo}/>
        <Typography variant="h5" align="left">
          Inicio de sesion
        </Typography>
        <form className={classes.form}>
          <NetflixInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Correo electronico"
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
          <Typography variant="subtitle2">¿Nuevo en CyberStream?</Typography>
          <Typography variant="subtitle2">
            <span className={classes.signupLink} onClick={register}>
              Registrate ahora{" "}
            </span>
          </Typography>
        </form>
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  contenedor: {
    maxWidth: "350px",
    width: "23rem",
    height: "30rem",
    background: "rgba(0,0,0,0.65)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: "10px",
  },
  form: {
    width: "80%",
  },
  logo: {
    height: "5rem",
    width: "5rem",
  },
  email: {
    marginBottom: theme.spacing(2),
  },
  password: {
    marginBottom: theme.spacing(4),
  },
  signupLink: {
    color: "#fff",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default SignUp;

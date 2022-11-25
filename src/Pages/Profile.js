import { Typography } from "@mui/material";
import React from "react";
import Header from "../Components/Header";
import { makeStyles } from "@mui/styles";
// import avatar from "../Images/NetflixProfile.jpg";
import user from "../Images/user.png";
import Plans from "../Components/Plans";
import { NetflixButton } from "../Styled/styledcomponents";
import { auth } from "../firebase";
import { useNavigate } from "react-router";

const Profile = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const signout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <>
      <Header />
      <div className={classes.contenedor}>
        <Typography style={{ marginBottom: "10px" }} variant="h3">
          Informacion del usuario
        </Typography>
        <div className={classes.info}>
          <div className={classes.details}>
            <div className={classes.plans}>
              <Typography
                className={classes.plansText}
                variant="h5"
                gutterBottom
              >
                {" "}
                Perfil
              </Typography>
              <div className={classes.infoContainer}>
                <img src={user} alt="avatar" />
                <div className={classes.infoContRow}>
                  <Typography
                    className={classes.infoUser}
                    variant="h5"
                    gutterBottom
                  >
                    Usuario : {auth.currentUser?.email}
                  </Typography>
                  <Typography
                    className={classes.infoUser}
                    variant="h5"
                    gutterBottom
                  >
                    {" "}
                    Contraseña: ********
                  </Typography>
                </div>
              </div>
              {/* <Plans cost={7.99}>Netflix Standard</Plans>
              <Plans cost={11.99}>Netflix Basic</Plans>
              <Plans wide="medium" color="gray" cost={15.99}>
                Netflix Premium
              </Plans> */}
              <NetflixButton radius wide="fullWidth" onClick={signout}>
                Cerrar sesión
              </NetflixButton>

              <div>
                <Typography
                  style={{ marginBottom: "10px", marginTop: "20px" }}
                  variant="h3"
                >
                  Peliculas favoritas
                </Typography>
              </div>

              {/* <Typography
                className={classes.plansText}
                variant="h5"
                gutterBottom
              >
                {" "}
                Aqui va el cum
              </Typography>
              <div className={classes.infoContainer}>
                <img src={user} alt="avatar" />
                <div className={classes.infoContRow}>
                  <Typography
                    className={classes.infoUser}
                    variant="h5"
                    gutterBottom
                  >
                    {" "}
                    Aqui va el cum
                  </Typography>
                  <Typography
                    className={classes.infoUser}
                    variant="h5"
                    gutterBottom
                  >
                    {" "}
                    Aqui va el cum
                  </Typography>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  contenedor: {
    color: "#fff",
    minHeight: "100vh",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    alignItems: "center",
  },
  info: {
    width: "80%",
    display: "flex",
    "& img": {
      height: "100px",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  },
  details: {
    width: "100%",
    marginLeft: theme.spacing(3),
    "& h6": {
      backgroundColor: "#aaa",
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontSize: "18px",
    },
  },
  plans: {
    width: "100%",
  },
  user: {
    borderRadius: "10px",
  },
  plansText: {
    borderBottom: "1px solid lightgray",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "20px 0px 20px 40px",
  },
  infoContRow: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "80px",
  },
  infoUser: {},
}));

export default Profile;

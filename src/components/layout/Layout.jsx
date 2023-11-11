import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Footer from "../footer/Footer";
import Styles from "../layout/Layout.module.css";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleHomeClick = () => {
    navigate("/home");
  };
  const handleWelcomeClick = () => {
    navigate("/");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span style={{ cursor: "pointer" }} onClick={handleWelcomeClick}>
              Hotel Management System
            </span>
          </Typography>
          <Button onClick={handleHomeClick} color="inherit">
            Home
          </Button>
          <Button color="inherit">Hotels</Button>
          <Button color="inherit">Rooms</Button>
          <Button onClick={handleLoginClick} color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <div className={Styles.main}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
import { Alert, Button, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../customhooks/useUser";

export default function ProfileDropdown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { userId } = useUser();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    const token = localStorage.getItem("token");
    axios
      .post(process.env.REACT_APP_API_BASE_URL + "/Accounts/Logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.dispatchEvent(new Event("tokenChanged"));
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        <Alert severity="error">This is an error message!</Alert>;
      });
  };
  const handleProfile = () => {
    navigate(`/profile/${userId}`);
  };
  const handleHotelCreate = () => {
    navigate(`/createhotel/${userId}`);
  };
  return (
    <div>
      <Button
        id="basic-button"
        style={{ color: "white" }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Welcome
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleHotelCreate}>Create Hotel</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

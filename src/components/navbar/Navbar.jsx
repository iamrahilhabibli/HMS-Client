import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hotel Management System
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Hotels</Button>
        <Button color="inherit">Rooms</Button>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

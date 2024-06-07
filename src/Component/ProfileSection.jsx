import React, { useState } from "react";
import { Button, IconButton, Popover, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import Auth from "../Authentication";
import { useNavigate } from "react-router-dom";
const ProfileSection = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;

  const handleLogout = () => {
    // Implement logout functionality here
    localStorage.removeItem("loginToken");
    console.log("Logged out!");
    navigate("/", { replace: true });
    handleClose();
  };
  const { decoded } = Auth();
  console.log(decoded);
  return (
    <>
      <IconButton onClick={handleClick} style={{ fontSize: "32px" }}>
        <AccountCircle />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div style={{ padding: "16px" }}>
          {/* <Avatar alt={username} src={avatar} style={{ marginBottom: 8 }} /> */}
          <Typography variant="body" gutterBottom>
            {decoded?.name.toUpperCase()}
          </Typography>
          <br />
          <Typography variant="body" gutterBottom>
            {decoded?.role.toUpperCase()}
          </Typography>
          <br />
          <Typography variant="body" gutterBottom>
            {decoded?.email}
          </Typography>
          <br />
          <br />
          <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            size="small"
          >
            Logout
          </Button>
        </div>
      </Popover>
    </>
  );
};

export default ProfileSection;

import React from "react";
import Header from "../Component/AppBar";
import Footer from "../Component/footer";
import Login from "../Component/login";

import { Breadcrumbs, Link, Typography, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();
  function handleClick(event, path) {
    event.preventDefault();
    navigate(path);
  }

  const breadcrumbs = [
    <Link
      underline="hover"
      style={{ cursor: "pointer" }}
      key="1"
      color="inherit"
      //href="/"
      onClick={(e) => {
        handleClick(e, "/");
      }}
    >
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      Login
    </Typography>,
  ];

  return (
    <>
      <div>
        <Header value={null} />
      </div>

      <br />
      <br />
      <br />
      <br />

      <div style={{}}>
        <Stack spacing={2} paddingLeft={5}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>
      <br />
      <div>
        <Login />
      </div>
      <br /><br/><br/>
      <div>
        <Footer />
      </div>
    </>
  );
}

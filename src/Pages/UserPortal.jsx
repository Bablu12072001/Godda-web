import React, { useState } from "react";
import Header from "../Component/AppBar";
// import Footer from "../Component/footer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Button, Link, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { useNavigate } from "react-router-dom";
import PollTable from "../Component/Voting";
import Circular from "../Component/Circular";
import Auth from "../Authentication";
import Training from '../Component/Training';
import { useNavigate } from "react-router-dom";

export default function UserPortal() {
  // const navigate = useNavigate();
  // console.log("under userPortal");
  const navigate = useNavigate();
  const { decoded } = Auth();
  const [vote, setVote] = useState(false);
  const [circular, setCircular] = useState(false);
    const [training, setTraining] = useState(false);

  function handleClick(event, buttonName) {
    event.preventDefault();
    if (buttonName === "vote") {
      setVote(true);
      setCircular(false);
      setTraining(false);
    } else if (buttonName === "circular") {
      setCircular(true);
      setVote(false);
        setTraining(false);
    } else if (buttonName === "training") {
      setCircular(false);
      setVote(false);
      setTraining(true);
    }
  }
  let breadcrumbs;
  breadcrumbs = [
    <Link
      underline="hover"
      style={{ cursor: "pointer" }}
      key="1"
      color="inherit"
      //href="/"
      onClick={() => {
        navigate("/");
      }}
    >
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      User Portal
    </Typography>,
    // <Typography key="3" color="text.primary">
    //   Voting
    // </Typography>,
  ];
  if (circular) {
    breadcrumbs = [
      <Link
        underline="hover"
        key="1"
        color="inherit"
        //href="/"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </Link>,
      <Typography key="3" color="text.primary">
        User Portal
      </Typography>,
      <Typography key="3" color="text.primary">
        Circular
      </Typography>,
    ];
  }
  if (vote) {
    breadcrumbs = [
      <Link
        underline="hover"
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
        User Portal
      </Typography>,
      <Typography key="3" color="text.primary">
        Voting
      </Typography>,
    ];
  }
    if (training) {
      breadcrumbs = [
        <Link
          underline="hover"
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
          User Portal
        </Typography>,
        <Typography key="3" color="text.primary">
          Training
        </Typography>,
      ];
    }
  let style = {
    // position: vote === false && circular === false ? "absolute" : "",
    // bottom: vote === false && circular === false ? 0 : "",
  };
  return (
    <>
      <div>
        <div>
          <Header value={null} />
        </div>
        <br /> <br /> <br /> <br />
        <div>
          <Stack spacing={2} paddingLeft={5}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </div>
        <div
          style={{
            textAlign: "center",
            display: vote === true || circular === true ||training===true? "none" : "block",
            padding: "20px", // Add some padding for spacing
          }}
        >
          <Typography
            variant="h3"
            style={{ color: "#3f51b5", marginBottom: "10px" }}
          >
            Welcome back, {decoded.name}!
          </Typography>
          <Typography
            variant="h5"
            style={{ color: "#616161", marginBottom: "10px" }}
          >
            We're thrilled to have you here.
          </Typography>
          <Typography variant="h5" style={{ color: "#616161" }}>
            Please choose one of the options below to proceed further.
          </Typography>
        </div>
        <br />
        {/* <PollTable /> */}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color={circular ? "success" : "primary"}
            onClick={(e) => {
              handleClick(e, "circular");
            }}
            style={{ marginLeft: "2vw" }}
          >
            Circular
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            color={vote ? "success" : "primary"}
            onClick={(e) => {
              handleClick(e, "vote");
            }}
          >
            Voting
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            color={training ? "success" : "primary"}
            onClick={(e) => {
              handleClick(e, "training");
            }}
          >
            Training
          </Button>
        </div>
        {/* {!circular && !vote ? (
          <>
            <br />
            <br />
            <br />
            <br /> <br />
            <br /> <br />
            <br />
            <br />
            <br />
            <br />
            <br /> <br />
            <br />
            <br />
            <br />
          </>
        ) : (
          ""
        )} */}
        {vote ? <PollTable /> : ""}
        {circular ? <Circular /> : ""}
        {training?<Training/>:""}
        <div style={style}>{/* <Footer /> */}</div>
      </div>
    </>
  );
}

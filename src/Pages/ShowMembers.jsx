import React from "react";
import Header from "../Component/AppBar";
import Members from "../Component/Members";
import Footer from "../Component/footer";
import { Breadcrumbs, Link, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useParams } from "react-router-dom";
export default function ShowMembers() {
  const navigate = useNavigate();
  const { district } = useParams();
  const breadcrumbs = [
    <Link
      underline="hover"
      style={{ cursor: "pointer" }}
      key="1"
      color="inherit"
      // //href="/"
      onClick={() => {
        navigate("/");
      }}
    >
      Home
    </Link>,
    <Link
      underline="hover"
      style={{ cursor: "pointer" }}
      key="1"
      color="inherit"
      // //href="/"
      onClick={() => {
        navigate("/member-list");
      }}
    >
      Member List
    </Link>,
    <Link
      underline="hover"
      style={{ cursor: "pointer" }}
      key="1"
      color="inherit"
      // //href="/"
      onClick={() => {
        navigate(`/member-list/${district}`);
      }}
    >
      {district}
    </Link>,
    // <Typography key="3" color="text.primary">
    //   {option}
    // </Typography>,
  ];

  return (
    <>
      <div>
        <Header value={4} />
      </div>
      <br />
      <br />
      <br />
      <br /> <br />
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
      <br />
      <div>
        <Members />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

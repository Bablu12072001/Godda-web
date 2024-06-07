import React, { useState, useEffect } from "react";
import Header from "../Component/AppBar";
import Footer from "../Component/footer";
import ImageComponent from "../Component/ImageComponent";
import presidentCover from "../Assets/presidentCover.jpg";
import { useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import { apiUrl } from "../constants";
import { Breadcrumbs, Link, Typography, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import Auth from "../Authentication";
import Training from '../Component/Training';
export default function TrainingPage() {
    
  const navigate = useNavigate();

  // const isMobile = useMediaQuery("(max-width:600px)");

  const { token } = Auth();

  useEffect(() => {
    if (!token) {
      // console.log("User not authenticated, redirecting to login...");
      navigate("/login");
    }
  }, [token, navigate]);

  const theme = useTheme();


  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [data, setData] = useState(null);

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
      Training
    </Typography>,
  ];

  return (
    <>
      <div>
        <div>
          <Header value="aboutUs" />
        </div>

        <div>
          <ImageComponent imageName={presidentCover} altText={"psdntCover"} />
        </div>
        <br />

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

        <center>
          <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-600 pb-2 inline-block text-blue-900">
            Training Material
          </h1>
        </center>
<Training/>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

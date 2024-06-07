import React, { useState, useEffect } from "react";
import Header from "../Component/AppBar";
import Footer from "../Component/footer";
import ImageComponent from "../Component/ImageComponent";
import presidentCover from "../Assets/presidentCover.jpg";
import { useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
// import swal from "sweetalert";
import { apiUrl } from "../constants";
import { Breadcrumbs, Link, Typography, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
export default function MissionAndVision() {
  const theme = useTheme();
  // const isMobile = useMediaQuery("(max-width:600px)");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [data, setData] = useState(null);

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
      About Us
    </Typography>,
    <Typography key="3" color="text.primary">
      Mission & Vision
    </Typography>,
  ];

  // let desc =
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);

      try {
        const res = await axios.get(
          `${apiUrl}/jmoa_mission_and_vission_all_data`
        );

        if (
          res.data["body-json"]["statusCode"] !== 200 ||
          res.data["body-json"]["statusCode"] === undefined
        ) {
          // swal({
          //   title: "Error!",
          //   text: "Error fetching data!!",
          //   icon: "error",
          //   button: "Ok!",
          // });
        }
        // console.log(res);

        if (
          res.data["body-josn"] === "" ||
          res.data["body-json"]["body"] === undefined
        ) {
          // swal({
          //   title: "Error!",
          //   text: "Error fetching data!!",
          //   icon: "error",
          //   button: "Ok!",
          // });
        } else {
          // console.log("Under else");
          setData(res.data["body-json"]["body"]);
        }
        // setLoading(false);
      } catch (error) {
        // setErr(true);
        // setLoading(false);
        // swal({
        //   title: "Error!",
        //   text: "Error fetching President's Message!! " + error,
        //   icon: "error",
        //   button: "Aww No!",
        // });

        console.error("Error:", error);
      }
    };

    fetchData();

    // const timer = setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
    // // setLoading(false);
    // return () => clearTimeout(timer);
  }, []);

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
        <div
          style={{
            display: isMobile ? "block" : "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <center>
              <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-600 pb-2 inline-block text-blue-900">
                Our Mission
              </h1>
            </center>

            <div className="p-5" style={{ color: "#454e81" }}>
              {data?.mission}
            </div>

            <center>
              <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-600 pb-2 inline-block text-blue-900">
                Our Vision
              </h1>
            </center>

            <div className="p-5" style={{ color: "#454e81" }}>
              {data?.vision}
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

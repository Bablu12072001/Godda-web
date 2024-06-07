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
export default function PresidentMessagePage() {
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
      President's Message
    </Typography>,
  ];

  // let desc =
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  // let image =
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/376699173_275378112024032_5793380527732103114_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_ohc=53vyNpiNWswAX_xIsOo&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfALJHFflrGMfGNNb_exgsEk3TwXtQmcPICyYddDfS41kQ&oe=65B34A4E";

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);

      try {
        const res = await axios.get(
          `${apiUrl}/jmoa_president_message_all_data`
        );

        if (
          res.data["body-json"]["statusCode"] !== 200 ||
          res.data["body-json"]["statusCode"] === undefined
        ) {
          swal({
            title: "Error!",
            text: "Error fetching data!!",
            icon: "error",
            button: "Ok!",
          });
        }
        // console.log(res);

        if (
          res.data["body-josn"] === "" ||
          res.data["body-json"]["body"] === undefined
        ) {
          swal({
            title: "Error!",
            text: "Error fetching data!!",
            icon: "error",
            button: "Ok!",
          });
        } else {
          // console.log("Under else");
          setData(res.data["body-json"]["body"]);
        }
        // setLoading(false);
      } catch (error) {
        // setErr(true);
        // setLoading(false);
        swal({
          title: "Error!",
          text: "Error fetching President's Message!! " + error,
          icon: "error",
          button: "Aww No!",
        });

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
            backgroundColor: "#002967",
            // height: isMobile ? "30vh" : "50vh",
            height: "auto",
            width: "100%",
          }}
        >
          <div>
            <img
              src={data?.imageUrl}
              alt="president"
              className="md:p-[2vw] p-5 md:w-[50vw] w-full h-80 md:h-[26rem]"
              style={{
                border: "1px solid transparent",
                borderRadius: isMobile ? 25 : 35,
              }}
              //   style={{ height: isMobile ? "20vh" : "40vh", width: "35vw" }}
            />
          </div>
          <div
            style={{
              height: "auto",
              //   width: "60%",
              color: "white",
            }}
            className="md:w-[60%] w-100%"
          >
            {/* <center> */}
            <p
              style={{
                // textDecoration: "underline",
                paddingTop: isMobile ? "0.5vh" : "2vh",
                fontFamily: "Open Sans, sans-serif",
                textAlign: isMobile ? "center" : "left",
                marginLeft: isMobile ? "1rem" : "2rem",
                // fontSize: "50px",
              }}
              // className="md:text-[50px] text-[30px]"
              className="md:text-[40px] text-[30px]  font-bold mb-1 border-b-4 border-white-300 pb-2 inline-block text-white-600 "
            >
              President&apos;s Message
            </p>
            {/* <Divider
              style={{ width: "30%", height: "3px", backgroundColor: "white" }}
            /> */}

            <p
              // style={{ padding: isMobile ? "3vh 10vw" : "5vh 20vw" }}
              className="md:text-[20px] text-[16px] text-left md:pl-8 pl-4 md:pt-4 pt-2 md:pb-4 pb-2 md:pr-4 pr-2"
            >
              &#x201C;
              {data?.message}
              &#x201C;
            </p>
            <h1
              // style={{ padding: isMobile ? "3vh 10vw" : "5vh 20vw" }}
              className="md:text-[20px] text-[17px] text-left md:pl-8 pl-4 md:pt-4 pt-2 md:pb-4 pb-2 md:pr-4 pr-2 font-bold"
            >
              -{data?.name}
            </h1>
            {/* </center> */}
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

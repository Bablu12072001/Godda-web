import React, { useState, useEffect } from "react";
import { Typography, useMediaQuery } from "@mui/material";
import axios from "axios";
import { apiUrl } from "../constants";
import swal from "sweetalert";
export default function InfoHome() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:1000px)");
  const isDesktop = useMediaQuery("(min-width:1001px)");
  let title = "Jharkhand Ministrial Officer's Association (Collectorate Cadre)";
  // let info =
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  let h, w, tf, pf;
  if (isMobile) {
    h = "40vh";
    w = "";
    tf = "17px";
    pf = "14px";
  } else if (isTablet) {
    h = "auto";
    w = "3500px";
    tf = "16px";
    pf = "12px";
  } else if (isDesktop) {
    h = "50vh";
    w = "4000px";
    tf = "30px";
    pf = "20px";
  }
  // console.log("h", h);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);

      try {
        const res = await axios.get(`${apiUrl}/jmoa_about_us_all_data`);

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
          // console.log("Under if");
          // setErr(true);
          setData({});
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
          text: "Error fetching data!! " + error,
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
    <div>
      <div
        style={{
          backgroundColor: "white",
          height: "auto",
          width: "100%",
          boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
          position: "relative",
          display: isMobile ? "block" : "flex",

          gap: 50,
        }}
      >
        <div
          style={{
            // height: isMobile ? "40vh" : "50vh",
            // width: isMobile ? "" : "4000px",

            height: h,
            width: w,
          }}
        >
          <img
            style={{
              //   height: isMobile ? "40vh" : "50vh",
              height: h,
              width: "100%",
              padding: 20,
              borderRadius: "24px",
            }}
            alt="img"
            src={data["imageUrl"]}
          />
        </div>

        <div>
          <Typography
            style={{
              padding: 20,
              //   fontSize: isMobile ? "24px" : "30px",
              fontSize: tf,
              color: "#652b7c",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            {title}
          </Typography>
          <Typography
            style={{
              padding: 20,
              fontSize: pf,
              margin: 0,
              marginTop: -30,
              color: "#454e81",
            }}
          >
            {data.message}
          </Typography>
        </div>
      </div>
    </div>
  );
}

// import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { apiUrl } from "../constants";
import swal from "sweetalert";
export default function PresidentMessageHome() {
  // let desc =
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const isMobile = useMediaQuery("(max-width:600px)");
  const [data, setData] = useState(null);

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
          // setErr(true);
          // setLoading(false);
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
        <div
          style={{
            backgroundColor: "#F9F6F9",
            height: "auto",
            width: "100%",
            color: "white",
          }}
        >
          <center>
            <p
              style={{
                // textDecoration: "underline",
                paddingTop: "2vh",
                fontFamily: "Open Sans, sans-serif",
                // fontSize: "50px",
                color: "#652b7c",
              }}
              // className="md:text-[50px] text-[30px]"
              className="md:text-[40px] text-[20px]  font-bold mb-1 border-b-4 border-white-300 pb-2 inline-block text-white-600"
            >
              President&apos;s Message
            </p>
            {/* <Divider
              style={{ width: "30%", height: "3px", backgroundColor: "white" }}
            /> */}

            <p
              style={{
                padding: isMobile ? "3vh 10vw" : "5vh 20vw",
                color: "#454e81",
              }}
              className="md:text-[30px] text-[15px]"
            >
              &#x201C;
              {data?.message}
              &#x201C;
            </p>
          </center>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { apiUrl } from "../constants";
import swal from "sweetalert";

export default function PresidentMessageHome() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [data, setData] = useState(null);
  const [showFullMessage, setShowFullMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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
        } else if (
          res.data["body-json"] === "" ||
          res.data["body-json"]["body"] === undefined
        ) {
          swal({
            title: "Error!",
            text: "Error fetching data!!",
            icon: "error",
            button: "Ok!",
          });
        } else {
          setData(res.data["body-json"]["body"]);
        }
      } catch (error) {
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
  }, []);

  const toggleShowFullMessage = () => {
    setShowFullMessage((prev) => !prev);
  };

  const renderMessage = () => {
    if (!data || !data.message) return "";

    if (data.message.length > 250) {
      if (showFullMessage) {
        return (
          <>
            {data.message}
            <button
              onClick={toggleShowFullMessage}
              style={{
                marginLeft: "10px",
                color: "#652b7c",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Read Less
            </button>
          </>
        );
      } else {
        return (
          <>
            {data.message.slice(0, 250)}...
            <button
              onClick={toggleShowFullMessage}
              style={{
                marginLeft: "10px",
                color: "#652b7c",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Read More
            </button>
          </>
        );
      }
    } else {
      return data.message;
    }
  };

  return (
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
              paddingTop: "2vh",
              fontFamily: "Open Sans, sans-serif",
              color: "#652b7c",
            }}
            className="md:text-[40px] text-[20px] font-bold mb-1 border-b-4 border-white-300 pb-2 inline-block text-white-600"
          >
            President&apos;s Message
          </p>
          <p
            style={{
              padding: isMobile ? "3vh 10vw" : "5vh 20vw",
              color: "#454e81",
            }}
            className="md:text-[30px] text-[15px]"
          >
            &#x201C;
            {renderMessage()}
            &#x201C;
          </p>
        </center>
      </div>
    </div>
  );
}

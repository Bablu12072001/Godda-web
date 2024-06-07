import React, { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import { apiUrl } from "../constants";
// let videos = [
//   "https://www.youtube.com/embed/Mdn0Nt-L4Zw?si=t9a_g7dYzNf5GWTs",
//   "https://www.youtube.com/embed/Mdn0Nt-L4Zw?si=t9a_g7dYzNf5GWTs",
//   "https://www.youtube.com/embed/Mdn0Nt-L4Zw?si=t9a_g7dYzNf5GWTs",
//   "https://www.youtube.com/embed/Mdn0Nt-L4Zw?si=t9a_g7dYzNf5GWTs",
//   "https://www.youtube.com/embed/Mdn0Nt-L4Zw?si=t9a_g7dYzNf5GWTs",
//   "https://www.youtube.com/embed/Mdn0Nt-L4Zw?si=t9a_g7dYzNf5GWTs",
//   "https://www.youtube.com/embed/Mdn0Nt-L4Zw?si=t9a_g7dYzNf5GWTs",
//   "https://www.youtube.com/embed/Mdn0Nt-L4Zw?si=t9a_g7dYzNf5GWTs",
//   "https://www.youtube.com/embed/Mdn0Nt-L4Zw?si=t9a_g7dYzNf5GWTs",
//   "https://www.youtube.com/embed/Mdn0Nt-L4Zw?si=t9a_g7dYzNf5GWTs",
//   "https://www.youtube.com/embed/Mdn0Nt-L4Zw?si=t9a_g7dYzNf5GWTs",
//   "https://www.youtube.com/embed/Mdn0Nt-L4Zw?si=t9a_g7dYzNf5GWTs",
//   "https://www.youtube.com/embed/Mdn0Nt-L4Zw?si=t9a_g7dYzNf5GWTs",
// ];
export default function PressVideos() {
  const maxvideosToShow = 10;
  const [showAllvideos, setShowAllvideos] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleViewMoreClick = () => {
    setShowAllvideos(!showAllvideos);
  };

  const displayedvideos = showAllvideos
    ? videos
    : videos.slice(0, maxvideosToShow);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`${apiUrl}/jmoa_press_videos_all_data`);

        if (
          res.data["body-json"]["statusCode"] !== 200 ||
          res.data["body-json"]["statusCode"] === undefined
        ) {
          // setErr(true);
          setLoading(false);
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
          // setData([]);
        } else {
          // console.log("Under else");
          setVideos(res.data["body-json"]["body"]);
        }
        setLoading(false);
      } catch (error) {
        // setErr(true);
        setLoading(false);
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
  console.log("videos", videos);
  return (
    <>
      <div>
        <center>
          <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-600 pb-2 inline-block text-blue-900">
            PRESS VIDEOS
          </h1>
        </center>

        <div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {loading
              ? Array.from({ length: maxvideosToShow }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width="100%"
                    height={160}
                  />
                ))
              : displayedvideos.map((item, index) => (
                  <iframe
                    key={index}
                    width="100%"
                    height="160"
                    src={"https://www.youtube.com/embed/" + item.youtube_url} // Assuming `item` is the YouTube video URL
                    title={`YouTube Video ${index}`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ))}

            {videos.length > maxvideosToShow && loading === false && (
              <div
                className="w-full h-40 bg-gray-300 flex items-center justify-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-400"
                onClick={handleViewMoreClick}
              >
                <p
                  style={{
                    color: showAllvideos ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  View {showAllvideos ? "Less" : "More"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

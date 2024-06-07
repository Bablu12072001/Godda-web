import React, { useState, useEffect } from "react";
import "./CircularMarqueeStyle.css";
import { useNavigate } from "react-router-dom";
// import gif from "../Assets/new-blinking.gif";
import axios from "axios";
import swal from "sweetalert";
import { apiUrl } from "../constants";
const NewsTicker = () => {
  // const newsTitles = useMemo(
  //   () => [
  //     "Breaking News 1",
  //     "Exciting News 2",
  //     "Important Update 3",
  //     "Breaking News 1",
  //     "Exciting News 2",
  //     "Important Update 3",
  //   ],
  //   []
  // );
  // const [currentIndex, setCurrentIndex] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);

      try {
        const res = await axios.get(`${apiUrl}/jmoa_marque_all_data`);

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
          // setData([]);
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
  // console.log("mar", data);
  function pauseMarquee() {
    var marquee = document.getElementById("marquee");
    marquee.stop();
  }

  function resumeMarquee() {
    var marquee = document.getElementById("marquee");
    marquee.start();
  }
  return (
    // <div className="marquee-container bg-gray-200 p-4 ">
    //   <div className="flex space-x-4 animate-marquee">
    //     {data.map((item, index) => (
    //       <div
    //         key={index}
    //         className={`flex items-center`}
    //         style={{ animationDelay: `-0.${index}s`, cursor: "pointer" }}
    //         onClick={() => {
    //           navigate("/circular");
    //         }}
    //         onMouseEnter={() => {
    //           setCurrentIndex(index);
    //         }}
    //         onMouseLeave={() => {
    //           setCurrentIndex(null);
    //         }}
    //       >
    //         <img
    //           src={gif} // replace 'logo' with the path or URL to your logo image
    //           alt="new"
    //           className="h-8 w-8 mr-2"
    //           style={{ border: "1px solid transparent", borderRadius: "50%" }}
    //         />
    //         <span
    //           className={`whitespace-nowrap title  ${
    //             index === currentIndex ? "highlight" : ""
    //           }`}
    //         >
    //           {item.title}
    //         </span>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <>
      <div
        id="marqueeContainer"
        onMouseEnter={pauseMarquee}
        onMouseLeave={resumeMarquee}
        style={{
          backgroundColor: "white",
          height: "5vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "blue",
        }}
      >
        <marquee id="marquee">
          {data.map((item, index) => (
            <span
              key={index}
              onClick={() => {
                navigate("/circular");
              }}
              style={{ cursor: "pointer", color: "#0a2463", fontWeight: "600" }}
              onMouseOver={(e) => {
                e.target.style.color = "green"; // Change color on hover
                e.target.style.fontSize = "17px"; // Increase font size on hover
              }}
              onMouseOut={(e) => {
                e.target.style.color = "#0d47a1"; // Restore color on mouse out
                e.target.style.fontSize = "16px"; // Restore font size on mouse out
              }}
            >
              <span className="new" style={{ color: "orange" }}>
                New
              </span>
              {"    "}
              {item.title.length > 50
                ? item.title.slice(0, 50) + "..."
                : item.title}
              &nbsp;<span style={{ color: "black" }}>|</span>
              {"    "}
            </span>
          ))}
        </marquee>
      </div>
    </>
  );
};

export default NewsTicker;

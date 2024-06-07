import { useState, useEffect } from "react";
import React from "react";
import { Skeleton } from "@mui/material";
import axios from "axios";
import { apiUrl } from "../constants";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import "./Members.css"; // Import the CSS file

export default function Members() {
  const { district, option } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const maxImagesToShow = 6;
  const [showAllImages, setShowAllImages] = useState(false);
  // let desc =
  //   "kdjf dfjdkf jd djkldkl fdf d jfkd kdjf dfjdkf jd djkldkl fdf d jfkd kdjf dfjdkf jd kdjf dfjdkf jd djkldkl fdf d jfkd kdjf dfjdkf jd djkldkl fdf d jfkd kdjf dfjdkf jd  kdjf dfjdkf jd djkldkl fdf d jfkd kdjf dfjdkf jd djkldkl fdf d jfkd kdjf dfjdkf jd djkldkl fdf d jfkd kdjf dfjdkf jd djkldkl fdf d jfkd kdjf dfjdkf jd djkldkl fdf d jfkd kdjf dfjdkf jd djkldkl fdf d jfkd kdjf dfjdkf jd djkldkl fdf d jfkd kdjf dfjdkf jd djkldkl fdf d jfkd";
  const handleViewMoreClick = () => {
    setShowAllImages(!showAllImages);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let body = {
          // type:
          //   option?.toLocaleLowerCase() === "all members"
          //     ? "member"
          //     : "core member",
          district: district,
        };
        const response = await axios.post(
          `${apiUrl}/jmoa_employee_filter`,
          body
        );
        if (response.data["body-json"]["statusCode"] === 200) {
          setImages(response.data["body-json"]["body"]);
        } else {
          swal({
            title: "Error!",
            text: "Error fetching data!!",
            icon: "error",
            button: "Ok!",
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, [district, option]);

  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-7">
      {loading ? (
        Array.from({ length: maxImagesToShow }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            style={{
              border: "1px solid transparent",
              borderRadius: "12px",
              height: "20rem",
            }}
          />
        ))
      ) : images.length === 0 ? (
        <div className="w-full h-80 bg-gray-300 flex items-center justify-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-400 rounded-md">
          <p style={{ color: "red", fontWeight: "bold" }}>No Members Found</p>
        </div>
      ) : (
        images.map((item, index) => (
          <div
            key={index}
            className="w-full h-80 bg-white rounded-md shadow-md overflow-hidden tilt-card hover:shadow-lg cursor-pointer flex justify-center items-center"
          >
            <div className="card-background">
              <div className="card-content">
                <h3
                  className="text-center font-bold mb-2"
                  style={{ color: "#652b7c" }}
                >
                  {item.name}
                </h3>
                <h3
                  className="text-center font-bold mb-2"
                  style={{ color: "#652b7c" }}
                >
                  {item.district}
                </h3>
                <h5
                  className="text-center font-bold mb-2"
                  style={{ color: "#652b7c" }}
                >
                  {item.designation}
                </h5>
                <div className="description-container">
                  <p
                    className="text-center font-100"
                    style={{ color: "#454e81" }}
                  >
                    {item.aboutUs}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {images.length > maxImagesToShow && !loading && (
        <div
          className="w-full h-80 bg-gray-300 flex items-center justify-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-400 rounded-md"
          onClick={handleViewMoreClick}
        >
          <p
            style={{
              color: showAllImages ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            View {showAllImages ? "Less" : "More"}
          </p>
        </div>
      )}

      {images.length === 0 && loading === false && (
        <div className="w-full h-80 bg-gray-300 flex items-center justify-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-400 rounded-md">
          <p
            style={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            No Members Found
          </p>
        </div>
      )}
    </div>
  );
}

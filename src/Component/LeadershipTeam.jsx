import { useState, useEffect } from "react";
import React from "react";
// import Header from "./AppBar";
import { Skeleton } from "@mui/material";
// import Footer from "./footer";
import axios from "axios";
import { apiUrl } from "../constants";
import swal from "sweetalert";
export default function LeadershipTeam(props) {
  // let desc =
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  // let images = [
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/343577180_957995858982448_6614733527757613094_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=nr1NVZMSAPgAX-JVNLM&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfBrzXDy7dIs2Val0IDCGqPGFeQyeSIrYg0WCztMdzEcEw&oe=65B2E244",
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/343446071_1833360177063902_8965103117517505749_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=clCZ74_dZkcAX8oXdD2&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfCQqYk7SWfeLPREtg4vb1TA3tPhj7gDjsvyPUuWWQoXeg&oe=65B238F8",
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/366900105_260382370190273_6882730124874700444_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3635dc&_nc_ohc=wD61PF96rG4AX-RbJPw&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfBDGqdFXTrQdyLoGPMMJtz5hpVuMKa9WoTpXfR72jtMew&oe=65B285F1",
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/343577180_957995858982448_6614733527757613094_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=nr1NVZMSAPgAX-JVNLM&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfBrzXDy7dIs2Val0IDCGqPGFeQyeSIrYg0WCztMdzEcEw&oe=65B2E244",
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/343446071_1833360177063902_8965103117517505749_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=clCZ74_dZkcAX8oXdD2&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfCQqYk7SWfeLPREtg4vb1TA3tPhj7gDjsvyPUuWWQoXeg&oe=65B238F8",
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/366900105_260382370190273_6882730124874700444_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3635dc&_nc_ohc=wD61PF96rG4AX-RbJPw&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfBDGqdFXTrQdyLoGPMMJtz5hpVuMKa9WoTpXfR72jtMew&oe=65B285F1",
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/343577180_957995858982448_6614733527757613094_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=nr1NVZMSAPgAX-JVNLM&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfBrzXDy7dIs2Val0IDCGqPGFeQyeSIrYg0WCztMdzEcEw&oe=65B2E244",
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/343446071_1833360177063902_8965103117517505749_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=clCZ74_dZkcAX8oXdD2&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfCQqYk7SWfeLPREtg4vb1TA3tPhj7gDjsvyPUuWWQoXeg&oe=65B238F8",
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/366900105_260382370190273_6882730124874700444_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3635dc&_nc_ohc=wD61PF96rG4AX-RbJPw&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfBDGqdFXTrQdyLoGPMMJtz5hpVuMKa9WoTpXfR72jtMew&oe=65B285F1",
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/343577180_957995858982448_6614733527757613094_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=nr1NVZMSAPgAX-JVNLM&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfBrzXDy7dIs2Val0IDCGqPGFeQyeSIrYg0WCztMdzEcEw&oe=65B2E244",
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/343446071_1833360177063902_8965103117517505749_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=clCZ74_dZkcAX8oXdD2&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfCQqYk7SWfeLPREtg4vb1TA3tPhj7gDjsvyPUuWWQoXeg&oe=65B238F8",
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/366900105_260382370190273_6882730124874700444_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3635dc&_nc_ohc=wD61PF96rG4AX-RbJPw&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfBDGqdFXTrQdyLoGPMMJtz5hpVuMKa9WoTpXfR72jtMew&oe=65B285F1",
  // ];
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const maxImagesToShow = 6;
  const [showAllImages, setShowAllImages] = useState(false);
  const handleViewMoreClick = () => {
    setShowAllImages(!showAllImages);
  };

  const displayedImages = showAllImages
    ? images
    : images.slice(0, maxImagesToShow);

  useEffect(() => {
    const fetchImages = async () => {
      let body=
        {
  team: props.team?.toLowerCase()
}
      
      try {
        const response = await axios.post(
          `${apiUrl}//jmoa_leadership_filter_all_data`,body
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

    // setImages(image);
  }, [props.team]);
  const imageContainerStyle = {
    position: "relative",
    overflow: "hidden",
    borderRadius: "12px",
  };

  const imageStyle = {
    // width: "100%",
    // height: "100%",
    objectFit: "cover",
    borderRadius: "12px",
  };

  const titleContainerStyle = {
    // display: "flex",
    // alignItems: "center",
    // jusifyContent: "center",
    overflow: "auto",
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "1rem",
    // backgroundColor: "rgba(0, 0, 0, 0.7)",
    // color: "white",
    // backgroundColor: "#E1D9D1 ",
    backgroundColor: "#fffcb7",
    color: "black",
    borderBottomRightRadius: "12px",
    transform: "translateY(100%)", // Start below the image
    transition: "transform 0.9s ease", // Transition translateY property
  };
  const slantedTitleStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "0.5rem",
    // backgroundColor: "rgba(0, 0, 0, 0.7)",
    // color: "white",
    backgroundColor: "#fffcb7",
    color: "black",
    borderBottomRightRadius: "12px",
    // clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
    // clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
    // clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
    // clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
    // clipPath: "polygon(0 0, 100% 0, 100% 100%, 85% 100%)",
    clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)",

    opacity: 1, // Initially visible
    transition: "opacity 0.3s ease", // Transition opacity property
  };
  const handleMouseEnter = (index) => {
    const titleContainer = document.getElementById(`title-container-${index}`);
    const slantedTitle = document.getElementById(`slanted-title-${index}`);

    if (titleContainer) {
      titleContainer.style.transform = "translateY(0%)";
    }

    if (slantedTitle) {
      slantedTitle.style.opacity = 0;
    }
  };

  const handleMouseLeave = (index) => {
    const titleContainer = document.getElementById(`title-container-${index}`);
    const slantedTitle = document.getElementById(`slanted-title-${index}`);

    if (titleContainer) {
      titleContainer.style.transform = "translateY(100%)";
    }

    if (slantedTitle) {
      slantedTitle.style.opacity = 1;
    }
  };
  return (
    <>
      <div>
        {/* <Header value={null} />
        <br />
        <br /> <br />
        <br /> */}
        <div>
          <center>
            <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-600 pb-2 inline-block text-blue-900">
              LEADERSHIP TEAM
            </h1>
          </center>
          <br />
        </div>
        <div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-7">
            {loading
              ? Array.from({ length: maxImagesToShow }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width="100%"
                    style={{
                      border: "1px solit transparent",
                      borderRadius: "12px",
                      height: "20rem",
                    }}
                  />
                ))
              : displayedImages.map((item, index) => (
                  <div
                    key={index}
                    className="relative"
                    style={imageContainerStyle}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    <div className="hover-container">
                      <img
                        className="w-full h-80"
                        // style={{
                        //   border: "1px solit transparent",
                        //   borderRadius: "12px",
                        // }}
                        style={imageStyle}
                        src={item.imageUrl}
                        alt="ltms"
                      />

                      <div
                        id={`title-container-${index}`}
                        style={titleContainerStyle}
                      >
                        <h3 className="text-center font-bold mb-2 ">
                          {item.name}
                        </h3>
                        <h5 className="text-center font-bold mb-2">
                          {item.position}
                        </h5>
                        <p className="text-center font-100">{item.message}</p>
                      </div>
                      <div
                        id={`slanted-title-${index}`}
                        style={slantedTitleStyle}
                        className="h-14 md:h-12"
                      >
                        <p className="text-center font-bold">{item.name}</p>
                      </div>
                    </div>
                  </div>
                ))}

            {images.length > maxImagesToShow && loading === false && (
              <div
                className="w-full h-80 bg-gray-300 flex items-center justify-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-400"
                onClick={handleViewMoreClick}
                style={{
                  border: "1px solit transparent",
                  borderRadius: "12px",
                  height: "20rem",
                }}
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
          </div>
        </div>
        {/* <br />
        <br />
        <Footer /> */}
      </div>
    </>
  );
}

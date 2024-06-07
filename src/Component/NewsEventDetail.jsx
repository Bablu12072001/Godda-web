import axios from "axios";
import { useParams } from "react-router-dom";
import { apiUrl } from "../constants";
import React, { useState, useEffect, useRef } from "react";
import { Box, Card, Skeleton } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import Logo from "../../Images/3333.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// import swal from "sweetalert";
import Header from "./AppBar";
import Footer from "./footer";
const NewsPost = () => {
  const [postContent, setPostContent] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/jmoa_news_events_particular_data`,
          {
            id: id,
          }
        );
        setPostContent(response.data["body-json"].body);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const carouselRef = useRef(null);
  const LoadingCard = () => {
    const skeletonStyle = {
      backgroundColor: "silver",
      height: isMobileView ? 250 : 645,
    };

    const carouselResponsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
      },
    };

    return (
      <Card>
        <Carousel
          responsive={carouselResponsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1500}
          showDots={true}
          fade
        >
          {[1, 2, 3].map((item) => (
            <div key={item}>
              <Skeleton variant="rectangular" style={skeletonStyle} />
            </div>
          ))}
        </Carousel>
      </Card>
    );
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const carouselSettings = {
    autoPlay: false,
    autoPlaySpeed: 2000,
    infinite: true,
    transitionDuration: 500,

    // removeArrowOnDeviceType: ["tablet", "mobile"],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      carouselRef.current.next();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <br />
      <br />
      <div className="max-w-6xl mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
        {loading ? (
          <LoadingCard />
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4 text-blue-900">
              {postContent.title}
            </h1>
            <Box sx={{ marginTop: isMobileView ? 1.2 : 2.2 }}>
              <Carousel
                {...carouselSettings}
                ref={carouselRef}
                animation="slide"
                indicators={false}
                responsive={responsive}
                showDots={true}
              >
                {postContent.imageUrl?.map((imageUrl, index) => (
                  <Box
                    key={index}
                    sx={{
                      height: isMobileView ? 250 : 645,
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={`Slide ${index}`}
                      loading="lazy"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </Box>
                ))}
              </Carousel>
            </Box>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {postContent.content}
            </p>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {postContent.imageUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-auto object-cover mb-4 rounded shadow-md"
              />
            ))}
          </div> */}
          </>
        )}
      </div>
      <br/><br/>
      <Footer/>
    </>
  );
};

export default NewsPost;

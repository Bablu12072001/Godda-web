import React, { useState, useEffect, useRef } from "react";
import { Box, Card, Skeleton } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
// import Logo from "../../Images/3333.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import swal from "sweetalert";
import { apiUrl } from "../constants";
const Slider = () => {
  const [images, setImages] = useState([]);
  // let image = [
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/347109428_776888894020194_7998616729503000074_n.jpg?stp=cp6_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=-YHBMT1Vr6wAX_HRywV&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfD7Tjnpu-khm7WkSBEF764loz5U827H8WlpCq2QomOcIQ&oe=65B09422",
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/310278473_101564866072025_5889225265521831474_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=vvGvDKHPi6kAX9WC0I9&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfAOO8oXFDsQlXoYCeH7J1Ri5ibCarSHQdmyy1k2ACPV9A&oe=65AE7EEF",
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/364632128_252361974325646_4224552896445142192_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=3635dc&_nc_ohc=8iCSK-E0qSAAX8F0WOu&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfB6W-4d4FqQh-M5bNVQiCL5_a9SSu5UBxDKRVeP45BE5g&oe=65AF937C",
  //   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/330639296_3378833649051421_4837985184624586018_n.jpg?stp=cp6_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=cfbZR0SNn_kAX8WcmG7&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfAZGEH2ri_GmBQfd1Y8_0uWW12HnUZXonQykxXBc3pjGw&oe=65AEE833",
  // ];
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/jmoa_scroller_image_all_data`
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
        // setImages(image);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
    // setImages(image);
  }, []);

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
    <Box sx={{ height: isMobileView ? 250 : 645 }}>
      {loading ? (
        <LoadingCard />
      ) : (
        <Box sx={{ marginTop: isMobileView ? 1.2 : 2.2 }}>
          <Carousel
            {...carouselSettings}
            ref={carouselRef}
            animation="slide"
            indicators={false}
            responsive={responsive}
            showDots={true}
          >
            {images.map((imageUrl, index) => (
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
          {/* <Box
            sx={{
              position: "absolute",
              top: isMobileView ? "16%" : "25%",
              left: isMobileView ? "14%" : "7%",
              transform: "translate(-50%, -50%)",
              textAlign: "left",
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              maxWidth: "600px",
            }}
          > */}
          {/* <img
              // src={Logo}
              alt="Logo"
              width={isMobileView ? 150 : 350}
              style={{ maxWidth: "100%" }}
            /> */}
          {/* </Box> */}
        </Box>
      )}
    </Box>
  );
};

export default Slider;

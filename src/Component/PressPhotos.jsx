import React, { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import swal from "sweetalert";
import axios from "axios";
import { apiUrl } from "../constants";
// alert(apiUrl);
// let images = [
//   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/376699173_275378112024032_5793380527732103114_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_ohc=53vyNpiNWswAX-cpUF2&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfChYrD4lGckhhWdl7ZFfkRQka-EIggOpiXXhsB7621f-A&oe=65B1500E",
//   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/375465870_275378088690701_1686086497018200044_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3635dc&_nc_ohc=oZLUjWT5SboAX-Me10X&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfBEnyC1m-jHM6xJmlM-zJE1L6f-DQysYehCfeMoqqfDPg&oe=65AFF52C",
//   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/385739984_288515024043674_4073266988617006274_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=3635dc&_nc_ohc=yHGVcSSqnhwAX85vwsH&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfDbhZdU9bmh5EUtHqKTPkNW8xCrjsiwBMFiqyJpx9E3Dw&oe=65B0DC3F",
//   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/375651957_275378098690700_5699758639672937654_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_ohc=I677ZdBVqqkAX8gKVH8&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfAq5s0atTTZ2etHEblUspRnPDLP4XZ2aoL7JvUtYNFr_Q&oe=65B065D4",
//   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/364643343_252367900991720_6784258804029229650_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=3635dc&_nc_ohc=1aaTKvdIp-0AX_LmtaN&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfA5jpA12FJkWdrkGf4kwt1mrKEQaFppYibURu0qAyHUTg&oe=65B0D72A",
//   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/347107571_2439000106273821_4878894272398612925_n.jpg?stp=cp6_dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=-43AFMCej-wAX9_bsV4&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfCT74kvRmf7ljgkwbDIJ94L5-eHrsROuvobKFRljcYr1A&oe=65B0C146",
//   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/346848558_684734453462830_6445625390674192069_n.jpg?stp=cp6_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=GJI-KKGFwssAX81KSrQ&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfDxTX3-laE8LznT6b1L2aqpV_Hm3YjuYotWjZ7meuCrkA&oe=65B011F6",
//   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/343585354_1224390315111576_1576220362010430166_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=GAkiIX9VtfMAX_prMRD&_nc_oc=AQn-OsfRaOrNqIsDsJMPdLsgYADnMEQnwe-jc3Guw80CA6Qen7nu7viboCjngYr572W-Me7AGhiqAj5LsZqfgc1n&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfDsGmdlv4t78UWuNys9CGMgHXV2ZF5v1f0C2lqBwn9o7w&oe=65B07334",
//   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/343434569_940797747124249_6545554741491281072_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=N2zsxdBTuMYAX9d62aX&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfAYJKEBI_MT-dV0zsUgc-xddYJgsfs_b_L8Md3KLywZBg&oe=65B163A1",
//   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/375651957_275378098690700_5699758639672937654_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_ohc=I677ZdBVqqkAX8gKVH8&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfAq5s0atTTZ2etHEblUspRnPDLP4XZ2aoL7JvUtYNFr_Q&oe=65B065D4",
//   "https://scontent.fdbd5-1.fna.fbcdn.net/v/t39.30808-6/364643343_252367900991720_6784258804029229650_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=3635dc&_nc_ohc=1aaTKvdIp-0AX_LmtaN&_nc_ht=scontent.fdbd5-1.fna&oh=00_AfA5jpA12FJkWdrkGf4kwt1mrKEQaFppYibURu0qAyHUTg&oe=65B0D72A",
// ];

export default function PressPhotos() {
  const maxImagesToShow = 10;
  const [showAllImages, setShowAllImages] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleViewMoreClick = () => {
    setShowAllImages(!showAllImages);
  };

  const displayedImages = showAllImages
    ? images
    : images.slice(0, maxImagesToShow);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`${apiUrl}/jmoa_press_images`);

        if (
          res.data["body-json"]["statusCode"] !== 200 ||
          res.data["body-json"]["statusCode"] === undefined
        ) {
          // setErr(true);
          setLoading(false);
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
          setImages(res.data["body-json"]["body"]);
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

  return (
    <>
      <div>
        <center>
          <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-600 pb-2 inline-block text-blue-900">
            PRESS PHOTOS
          </h1>
        </center>

        <div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {loading
              ? Array.from({ length: maxImagesToShow }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width="100%"
                    height={160}
                  />
                ))
              : displayedImages.map((item, index) => (
                  <img
                    className="w-full h-40"
                    key={index}
                    src={item.imageUrl}
                    alt="glmnts"
                  />
                ))}

            {images.length > maxImagesToShow && loading === false && (
              <div
                className="w-full h-40 bg-gray-300 flex items-center justify-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-400"
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
          </div>
        </div>
      </div>
    </>
  );
}

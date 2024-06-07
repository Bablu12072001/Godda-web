import React from "react";
import { Skeleton } from "@mui/material";

const ImageComponent = ({ imageName, altText }) => {
  return (
    <div className="flex justify-center items-center mt-[4rem] overflow-y-hidden">
      {imageName ? (
        <img
          src={imageName}
          alt={altText}
          className="w-full h-64 md:h-80 lg:h-96 rounded shadow-lg"
        />
      ) : (
        <div className="w-full h-64 md:h-80 lg:h-96 rounded shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse"></div>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            style={{ borderRadius: "0.5rem" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageComponent;

import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({ isLoading }) => {
  return (
    <div
      style={{
        display: isLoading ? "flex" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <CircularProgress color="primary" />
    </div>
  );
};

export default Loading;

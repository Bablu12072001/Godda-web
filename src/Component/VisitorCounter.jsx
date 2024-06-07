import React, { useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { FiUsers } from "react-icons/fi";
import { apiUrl } from "../constants";

const VisitorCounter = ({ className }) => {
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/jmoa_website_visitor_all_data`
        );
        setVisitorCount(response.data["body-json"]["body"]["visitorCount"]);
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      }
    };

    if (visitorCount === null) {
      fetchVisitorCount();
    }
  }, [visitorCount]);

  return (
    <div
      className={`visitor-counter ${className} flex justify-center items-center `}
    >
      <div
        className="max-w-md w-full bg-white rounded-lg p-8 shadow-lg text-center"
        style={{ boxShadow: " 0 4px 6px rgba(0.5, 0.5, 0.8, 0.5)" }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#652b7c" }}>
          Thank you for visiting!
        </h2>
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-500 mr-4">
            <FiUsers className="text-4xl text-white" />
          </div>
          <div className="counter text-5xl font-bold text-gray-900">
            {visitorCount === null ? (
              <div>Loading...</div>
            ) : (
              <CountUp end={visitorCount} duration={2} />
            )}
          </div>
        </div>
        <p className="text-base   mb-4" style={{ color: "#652b7c" }}>
          visitors so far!
        </p>
        {/* <div className="text-sm text-gray-700">Thank you for visiting!</div> */}
      </div>
    </div>
  );
};

export default VisitorCounter;

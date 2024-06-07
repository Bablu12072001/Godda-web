// AffiliationCenter.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../constants";
import swal from "sweetalert";
const AffiliationCenter = () => {
  const [affiliationData, setAffiliationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/jmoa_affiliation_all_data`);
        if (response.data["body-json"]["statusCode"] !== 200) {
          swal({
            title: "Error!",
            text: "Error fetching data!!",
            icon: "error",
            button: "Ok!",
          });
        } else {
          setAffiliationData(response.data["body-json"].body);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        swal({
          title: "Error!",
          text: "Error fetching data!!" + error,
          icon: "error",
          button: "Ok!",
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-center  w-full">
      <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-500 pb-2 inline-block text-blue-900">
        Affiliations
      </h1>
      <ul className="ml-10">
        {affiliationData.map((item) => (
          <li key={item.id} className="mb-4">
            <div className="flex">
              <h2 className="text-xl font-bold mr-2">{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AffiliationCenter;

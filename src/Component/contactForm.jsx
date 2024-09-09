import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import swal from "sweetalert";
import { apiUrl } from "../constants";
const ContactDetails = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Prevent scrolling when loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  return (
    <div className="w-3/5 mx-auto mt-8 text-center">
      <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-500 pb-2 inline-block text-blue-900">
        Contact Us
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Address</h2>
          <p className="text-gray-600">
            M.S Manzil, Eidgah Lane-1, Fasiyadangal, <br /> Godda, Jharkhand -
            814133
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Email</h2>
          <p className="text-gray-600">jsngefgodda@gmail.com</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Phone</h2>
          <p className="text-gray-600">+91 8002846416</p>
        </div>
      </div>
      <Loading isLoading={loading} />
    </div>
  );
};

export default ContactDetails;

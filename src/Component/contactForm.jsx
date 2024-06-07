// ContactForm.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import swal from "sweetalert";
import { apiUrl } from "../constants";
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };
  useEffect(() => {
    // Prevent scrolling when loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/jmoa_contact_us`, {
        name,
        email,
        subject,
        message,
        district,
      });
      setLoading(false);
      if (response.data["body-json"]["statusCode"] !== 200) {
        swal({
          title: "Error!",
          text: "Error posting data!!",
          icon: "error",
          button: "Ok!",
        });
      } else {
        swal({
          title: "Success!",
          text: "Data posted successfully!!",
          icon: "success",
          button: "Ok!",
        });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setDistrict("");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      swal({
        title: "Error!",
        text: "Error posting data!!" + error,
        icon: "error",
        button: "Ok!",
      });
    }
  };

  // if (loading) return <Loading />;

  return (
    <div className="w-3/5 mx-auto mt-8 text-center">
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-500 pb-2 inline-block text-blue-900">
          Contact Us
        </h1>
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="flex-1 mb-4 md:mb-0 relative">
            <input
              type="text"
              id="name"
              value={name}
              required
              onChange={(e) => handleInputChange(e, setName)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Name"
            />
          </div>
          <div className="flex-1 relative">
            <input
              type="email"
              id="email"
              value={email}
              required
              onChange={(e) => handleInputChange(e, setEmail)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
          <div className="flex-1 mb-4 md:mb-0 relative">
            <input
              type="text"
              id="subject"
              value={subject}
              required
              onChange={(e) => handleInputChange(e, setSubject)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Subject"
            />
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              id="district"
              value={district}
              required
              onChange={(e) => handleInputChange(e, setDistrict)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="District"
            />
          </div>
        </div>
        <div className="flex mt-10">
          <input
            type="text"
            id="message"
            value={message}
            required
            onChange={(e) => handleInputChange(e, setMessage)}
            className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Message"
          />
        </div>
        <button
          type="submit"
          className="bg-rgb-16-44-87 text-white px-6 py-2 rounded-lg mt-10 relative overflow-hidden group"
        >
          Send Message
          {/* <span className="block absolute inset-x-0 bottom-0 h-1 bg-gray-800 transition-transform transform origin-bottom scale-x-0 group-hover:scale-x-100"></span> */}
        </button>
      </form>
      <Loading isLoading={loading} />
    </div>
  );
};

export default ContactForm;

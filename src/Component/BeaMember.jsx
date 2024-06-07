import React, { useState } from "react";
import axios from "axios";
// import ImageComponent from '../Component/ImageComponent';
import { apiUrl } from "../constants";
const BeAMemberForm = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const handleRadioChange = (e) => {
    setGender(e.target.value);
  };

  const handleEnquiry = async () => {
    try {
      const response = await axios.post(`${apiUrl}/jmoa_enquiry`, {
        name,
        email,
        date_of_birth: dob,
        contact,
        gender,
      });

      console.log(response);
      if (response.data["body-json"].statusCode === 200) {
        setName("");
        setEmail("");
        setDob("");
        setContact("");
        setGender("");
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
    }
  };

  return (
    <>
      {/* <ImageComponent imageName="image2.jpg" altText="Nature Image 1" /> */}

      <div className="w-3/5 mx-auto mt-8 text-center">
        <h1 className="text-3xl font-bold mb-6 border-b-2 border-gray-500 pb-2 inline-block text-blue-900">
          Membership Benefits
        </h1>
        <p className="mt-4 mb-6 " style={{ color: "#454e81" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quos
          possimus perspiciatis maxime repudiandae et ad voluptatem debitis unde
          tempora! Totam omnis recusandae iure exercitationem qui ratione eius
          est aperiam eligendi, ab porro excepturi? Eligendi, accusantium
          asperiores eaque aliquid perferendis dignissimos unde velit alias
          quidem sed pariatur atque provident voluptate molestiae ipsum ipsam
          impedit! Laboriosam debitis possimus ex quos, voluptate error a, ad
          est ratione officia voluptates nobis dicta. Quam obcaecati quo non
          temporibus, nulla tempore repellat saepe consequuntur, architecto
          assumenda in doloremque quia reprehenderit voluptatibus quibusdam.
          Excepturi beatae optio fugiat. Porro nulla deserunt accusantium fugiat
          quos, quas in sit.
        </p>

        <h1 className="text-3xl font-bold mb-6 border-b-2 border-gray-500 pb-2 inline-block text-blue-900">
          Be a Member
        </h1>

        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="flex-1 mb-4 md:mb-0 relative">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => handleInputChange(e, setName)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Name"
            />
          </div>
          <div className="flex-1 mb-4 md:mb-0 relative">
            <input
              type="text"
              id="dob"
              value={dob}
              onChange={(e) => handleInputChange(e, setDob)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Date of Birth"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-6 mt-4">
          <div className="flex-1 mb-4 md:mb-0 relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Email"
            />
          </div>
          <div className="flex-1 mb-4 md:mb-0 relative">
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => handleInputChange(e, setContact)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Contact"
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 items-start mt-8">
          <label className="text-gray-700 mb-2">Gender:</label>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              value="male"
              checked={gender === "male"}
              onChange={handleRadioChange}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <span className="ml-2">Male</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="female"
              checked={gender === "female"}
              onChange={handleRadioChange}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <span className="ml-2">Female</span>
          </label>
        </div>
        <button
          onClick={handleEnquiry}
          className="bg-rgb-16-44-87 text-white px-6 py-2 rounded-lg mt-6"
        >
          Enquire Now
        </button>
      </div>
    </>
  );
};

export default BeAMemberForm;

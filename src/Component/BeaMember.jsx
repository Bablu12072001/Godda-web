import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../constants";

const BeAMemberForm = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [dateOfJoining, setDateOfJoining] = useState("");
  const [officeName, setOfficeName] = useState("");
  const [department, setDepartment] = useState("");
  const [officeLevel, setOfficeLevel] = useState("");
  const [subdivision, setSubdivision] = useState("");
  const [block, setBlock] = useState("");
  const [aadharLastSix, setAadharLastSix] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [parentalUnion, setParentalUnion] = useState("");
  const [address, setAddress] = useState("");
  const [yearlyFeeRemitted, setYearlyFeeRemitted] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [declaration, setDeclaration] = useState(false);

  const [errors, setErrors] = useState({});

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const handleCheckboxChange = (e, setState) => {
    setState(e.target.checked);
  };

  const handleFileChange = (e, setState) => {
    setState(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";

    if (!email) newErrors.email = "Email is required";
    if (!contact) newErrors.contact = "Contact is required";

    if (!dateOfJoining) newErrors.dateOfJoining = "Date of Joining is required";
    if (!officeName) newErrors.officeName = "Office Name is required";
    if (!department) newErrors.department = "Department is required";
    if (!officeLevel) newErrors.officeLevel = "Office Level is required";
    if (officeLevel === "subdivision" && !subdivision)
      newErrors.subdivision = "Subdivision is required";
    if (officeLevel === "block" && !block)
      newErrors.block = "Block is required";
    if (!aadharLastSix)
      newErrors.aadharLastSix = "Aadhar last six digits are required";
    if (!employeeType) newErrors.employeeType = "Employee Type is required";
    if (!parentalUnion) newErrors.parentalUnion = "Parental Union  is required";
    if (!address) newErrors.address = "Other Address is required";
    if (!photo) newErrors.photo = "Photo is required";
    if (!signature) newErrors.signature = "Signature is required";
    if (!declaration)
      newErrors.declaration = "You must agree to the declaration";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEnquiry = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);

    formData.append("contact", contact);

    formData.append("date_of_joining", dateOfJoining);
    formData.append("office_name", officeName);
    formData.append("department", department);
    formData.append("office_level", officeLevel);
    if (officeLevel === "subdivision")
      formData.append("subdivision", subdivision);
    if (officeLevel === "block") formData.append("block", block);
    formData.append("aadhar_last_six", aadharLastSix);
    formData.append("employee_type", employeeType);
    formData.append("parental_union", parentalUnion);
    formData.append("address", address);
    formData.append("yearly_fee_remitted", yearlyFeeRemitted);
    formData.append("photo", photo);
    formData.append("signature", signature);

    try {
      const response = await axios.post(`${apiUrl}/jmoa_enquiry`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      if (response.data["body-json"].statusCode === 200) {
        setName("");
        setEmail("");

        setContact("");

        setDateOfJoining("");
        setOfficeName("");
        setDepartment("");
        setOfficeLevel("");
        setSubdivision("");
        setBlock("");
        setAadharLastSix("");
        setEmployeeType("");
        setParentalUnion("");
        setAddress("");
        setYearlyFeeRemitted(false);
        setPhoto(null);
        setSignature(null);
        setDeclaration(false);
        setErrors({});
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
    }
  };

  return (
    <>
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
            {errors.name && <p className="text-red-500">{errors.name}</p>}
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
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="flex-1 mb-4 md:mb-0 relative">
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => handleInputChange(e, setContact)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Mobile Number"
            />
            {errors.contact && <p className="text-red-500">{errors.contact}</p>}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-6 mt-4">
          <div className="flex-1 mb-4 md:mb-0 relative">
            <input
              type="text"
              id="dateOfJoining"
              value={dateOfJoining}
              onChange={(e) => handleInputChange(e, setDateOfJoining)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Date of Joining"
            />
            {errors.dateOfJoining && (
              <p className="text-red-500">{errors.dateOfJoining}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-6 mt-4">
          <div className="flex-1 mb-4 md:mb-0 relative">
            <input
              type="text"
              id="officeName"
              value={officeName}
              onChange={(e) => handleInputChange(e, setOfficeName)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Office Name"
            />
            {errors.officeName && (
              <p className="text-red-500">{errors.officeName}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-6 mt-4">
          <div className="flex-1 mb-4 md:mb-0 relative">
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => handleInputChange(e, setDepartment)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Department"
            />
            {errors.department && (
              <p className="text-red-500">{errors.department}</p>
            )}
          </div>
          <div className="flex-1 mb-4 md:mb-0 relative">
            <select
              id="officeLevel"
              value={officeLevel}
              onChange={(e) => handleInputChange(e, setOfficeLevel)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Office Level</option>
              <option value="district">District</option>
              <option value="subdivision">Subdivision</option>
              <option value="block">Block</option>
            </select>
            {errors.officeLevel && (
              <p className="text-red-500">{errors.officeLevel}</p>
            )}
          </div>
        </div>
        {officeLevel === "subdivision" && (
          <div className="flex-1 mb-4 md:mb-0 relative">
            <select
              id="subdivision"
              value={subdivision}
              onChange={(e) => handleInputChange(e, setSubdivision)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Subdivision</option>
              <option value="GODDA SADAR">GODDA SADAR</option>
              <option value="MAHAGAMA">MAHAGAMA</option>
            </select>
            {errors.subdivision && (
              <p className="text-red-500">{errors.subdivision}</p>
            )}
          </div>
        )}
        {officeLevel === "block" && (
          <div className="flex-1 mb-4 md:mb-0 relative">
            <select
              id="block"
              value={block}
              onChange={(e) => handleInputChange(e, setBlock)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Block</option>
              <option value="BASANTRAI">BASANTRAI</option>
              <option value="BOARIJORE">BOARIJORE</option>
              <option value="GODDA">GODDA</option>
              <option value="MAHAGAMA">MAHAGAMA</option>
              <option value="MEHARMA">MEHARMA</option>
              <option value="PATHERGAMA">PATHERGAMA</option>
              <option value="PORAIYAHAT">PORAIYAHAT</option>
              <option value="SUNDERPAHARI">SUNDERPAHARI</option>
              <option value="THAKURGANGTI">THAKURGANGTI</option>
            </select>
            {errors.block && <p className="text-red-500">{errors.block}</p>}
          </div>
        )}
        <div className="flex flex-col md:flex-row md:space-x-6 mt-4">
          <div className="flex-1 mb-4 md:mb-0 relative">
            <input
              type="text"
              id="aadharLastSix"
              value={aadharLastSix}
              onChange={(e) => handleInputChange(e, setAadharLastSix)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Aadhar Last 6 Digits"
            />
            {errors.aadharLastSix && (
              <p className="text-red-500">{errors.aadharLastSix}</p>
            )}
          </div>
          <div className="flex-1 mb-4 md:mb-0 relative">
            <select
              id="employeeType"
              value={employeeType}
              onChange={(e) => handleInputChange(e, setEmployeeType)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Employee Type</option>
              <option value="regular">REGULAR</option>
              <option value="contractual">CONTRACTUAL</option>
              <option value="outsourced">OUTSOURCED</option>
              <option value="daily wasged">DAILY WAGED</option>
            </select>
            {errors.employeeType && (
              <p className="text-red-500">{errors.employeeType}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-6 mt-4">
          <div className="flex-1 mb-4 md:mb-0 relative">
            <input
              type="text"
              id="parentalUnion"
              value={parentalUnion}
              onChange={(e) => handleInputChange(e, setParentalUnion)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Parental Union "
            />
            {errors.parentalUnion && (
              <p className="text-red-500">{errors.parentalUnion}</p>
            )}
          </div>
          <div className="flex-1 mb-4 md:mb-0 relative">
            <textarea
              id="address"
              value={address}
              onChange={(e) => handleInputChange(e, setAddress)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Address"
            ></textarea>
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-6 mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="yearlyFeeRemitted"
              checked={yearlyFeeRemitted}
              onChange={(e) => handleCheckboxChange(e, setYearlyFeeRemitted)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label
              htmlFor="yearlyFeeRemitted"
              className="ml-2 text-blue-900 font-bold"
            >
              Yearly member fee remitted?
            </label>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-6 mt-4">
          <div className="flex-1 mb-4 md:mb-0 relative">
            <label className="block text-blue-900 font-bold mb-2">
              Upload Photo
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setPhoto)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.photo && <p className="text-red-500">{errors.photo}</p>}
          </div>
          <div className="flex-1 mb-4 md:mb-0 relative">
            <label className="block text-blue-900 font-bold mb-2">
              Upload Signature
            </label>
            <input
              type="file"
              id="signature"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setSignature)}
              className="w-full p-2 border-b border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.signature && (
              <p className="text-red-500">{errors.signature}</p>
            )}
          </div>
        </div>
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="declaration"
            checked={declaration}
            onChange={(e) => handleCheckboxChange(e, setDeclaration)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <label htmlFor="declaration" className="ml-2 text-blue-900 font-bold">
            I hereby declare that i will follow the terms and conditions of the
            federation. i want to be a member of jharkhand state none-gazetted
            employees federation, godda.
          </label>
        </div>
        {errors.declaration && (
          <p className="text-red-500">{errors.declaration}</p>
        )}
        <div className="mt-6">
          <button
            onClick={handleEnquiry}
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default BeAMemberForm;

import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { apiUrl } from "../constants";
import Header from "./AppBar";

const ForgotPasswordSendLink = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLinkSent, setResetLinkSent] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}/jmoa_forgot_password_send_link`, {
        email: email,
      });
      if (res.data["body-json"]["statusCode"] === 200) {
        swal({
          title: "Password Reset",
          text: "Reset link sent successfully",
          icon: "success",
          button: "Ok",
        });
        setResetLinkSent(true); // Set state to true after successfully sending the link
      } else {
        swal({
          title: "Password Reset",
          text: "Failed to send link:" + res.data["body-json"]["body"],
          icon: "error",
          button: "Ok",
        });
      }
    } catch (error) {
      swal({
        title: "Error",
        text: "Failed to reset password. Please try again later." + error,
        icon: "error",
        button: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Header value={null} />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded-md shadow-lg w-96 space-y-8 h-auto">
          <h2 className="text-xl font-bold mb-4 text-center">
            Forgot Password
          </h2>
          {!resetLinkSent ? ( // Conditionally render the form if reset link is not sent
            <form onSubmit={handleForgotPassword}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <br />
              <button
                type="submit"
                className="bg-blue-700 text-white p-3 rounded-lg w-full hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="text-center text-green-600">
              An email has been sent to {email}. Please check your inbox (and
              spam folder) for the password reset link.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordSendLink;

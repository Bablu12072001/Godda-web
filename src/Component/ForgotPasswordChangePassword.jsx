import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { apiUrl } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./AppBar";
const ForgotPasswordChangePassword = () => {
    const navigate=useNavigate();
  const { token } = useParams(); // Get the token from URL params
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
  if (password.length < 6) {
    swal({
      title: "Password Too Short",
      text: "Password must be at least 6 characters long.",
      icon: "warning",
      button: "Ok",
    });
    return;
  }


    if (password !== confirmPassword) {
      swal({
        title: "Password Mismatch",
        text: "Passwords do not match. Please try again.",
        icon: "warning",
        button: "Ok",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${apiUrl}/jmoa_forgot_password_change_password`,
        {
          token: token,
          password: password,
        }
      );
      if(res.data['body-json']['statusCode']===200){
   swal({
     title: "Password Reset",
     text: "Password changed successfully",
     icon: "success",
     button: "Ok",
   });
 navigate("/login", { replace: true });
      }else{
         swal({
           title: "Error",
           text: "Failed to reset password:" + res.data['body-json']['body'],
           icon: "error",
           button: "Ok",
         });
      }
   
    } catch (error) {
      swal({
        title: "Error",
        text: "Failed to reset password. Please try again later:"+error,
        icon: "error",
        button: "Ok",
      });
    } finally {
      setLoading(false);
    //    navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <div>
        <Header value={null} />
      </div>
<br/><br/><br/><br/>
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded-md shadow-lg w-96 space-y-8 h-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
          <form onSubmit={handleResetPassword}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                New Password
              </label>
              <input
                required
                type="password"
                id="password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <br />
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Confirm Password
              </label>
              <input
                required
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleInputChange(e, setConfirmPassword)}
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <br />
            <button
              type="submit"
              className="bg-blue-700 text-white p-3 rounded-lg w-full hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordChangePassword;

import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { apiUrl } from "../constants";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e, setState) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}/jmoa_login`, {
        email: username,
        password: password,
      });

      if (
        res.data["body-json"]["statusCode"] !== 200 ||
        res.data["body-json"]["statusCode"] === undefined
      ) {
        swal({
          title: "Error!",
          text: "Error!!" + res.data["body-json"]["body"],
          icon: "error",
          button: "Ok!",
        });
      } else {
        setPassword("");
        setUsername("");

        localStorage.setItem(
          "loginToken",
          res.data["body-json"]["body"]["tokens"]
        );

        let token = res.data["body-json"]["body"]["tokens"];
        let decoded;
        if (token) {
          try {
            decoded = jwtDecode(token);
            if (
              decoded["role"] !== undefined &&
              decoded["role"] !== "" &&
              decoded["role"] !== null
            ) {
              // swal({
              //   title: "Success!",
              //   text: "Login Success!",
              //   icon: "success",
              //   button: "Aww yiss!",
              // });

              if (decoded.role === "member") {
                navigate("/userPortal", {
                  replace: true,
                });
                // window.location.reload(true);
              } else {
                swal({
                  title: "Failed!",
                  text: "User access denied!! Not found member",
                  icon: "error",
                  button: "Try Again!",
                });
              }
            } else {
              swal({
                title: "Failed!",
                text: "User access denied!! Not found member",
                icon: "error",
                button: "Try Again!",
              });
            }

            // setDecodedToken(decoded);
            // console.log("DecodedData=", decoded);
          } catch (error) {
            console.error("Error decoding token:", error);
            swal({
              title: "Failed!",
              text: "Error decoding token: " + error,
              icon: "error",
              button: "Try Again!",
            });

            // navigate("/login", { replace: true });
          }
        }
      }
    } catch (e) {
      swal({
        title: "Error!",
        text: "Error!! " + e,
        icon: "error",
        button: "Ok!",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white p-8 rounded-md shadow-lg w-96 space-y-8 h-auto">
        <h2 className="text-xl font-bold mb-4 text-center">
          Jharkhand State Non-Gazetted Employees Federation, Godda
        </h2>
        <form onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username/Email Address
            </label>

            <input
              required
              type="text"
              id="username"
              value={username}
              onChange={(e) => handleInputChange(e, setUsername)}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <br />
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
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
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => handleInputChange(e, setRememberMe)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <br />
          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <button
              type="submit"
              className="bg-blue-700 text-white p-3 rounded-lg w-full hover:bg-blue-600"
            >
              Login
            </button>
          )}
        </form>
        <div className="text-center">
          <button
            onClick={handleForgotPassword}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

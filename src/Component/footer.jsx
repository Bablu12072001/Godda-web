// Footer.js

import React from "react";
import { Link } from "react-router-dom"; // If using react-router for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
// import jharkhandLogo from './jharkhandLogo.png'; // Replace with the actual path to your logo
import Logo from "../Assets/LogoBlank.png";

const Footer = () => {
  return (
    <footer
      className="  text-black py-8 relative"
      style={{ backgroundColor: "#652B7C" }}
    >
      <div className="container mx-auto flex flex-col gap-4 md:flex-row justify-between md:gap-8">
        <div className="text-center md:text-left md:mr-auto md:md:ml-10">
          <div className="flex flex-col items-center">
            {/* <img src={Logo} alt="Jharkhand Logo" className="w-20 h-20 mr-2" /> */}
            <div className="w-20 h-20 mr-2"></div>
            <h3 className="text-xl font-bold" style={{ color: "white" }}>
              Jharkhand State Non-Gazetted Employees Federation, Godda
            </h3>
          </div>
        </div>

        <div
          className="text-center md:text-left md:mr-auto"
          style={{ color: "white" }}
        >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/leadership-team">About</Link>
            </li>
            <li>
              <Link to="/be-a-member">Be a Member</Link>
            </li>
            <li>
              <Link to="/member-list">Member List</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact</Link>
            </li>
          </ul>
        </div>

        <div
          className="text-center md:text-left md:ml-auto"
          style={{ color: "white" }}
        >
          <ul>
            <li>Affiliation</li>
            <li>Circular</li>
            <li>Media Gallery</li>
            <li>Press</li>
            <li>News and Events</li>
          </ul>
        </div>

        <div className="text-center md:text-left md:ml-auto md:mr-10">
          <h3 className="text-xl font-bold mb-4" style={{ color: "white" }}>
            Connect With Us
          </h3>
          <ul className="flex gap-4 justify-center md:justify-start">
            <li>
              {" "}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  style={{ color: "#075ced" }}
                  className="text-lg md:text-xl lg:text-2xl"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  style={{ color: "#f50049" }}
                  className="text-lg md:text-xl lg:text-2xl"
                />
              </a>
            </li>
            <li>
              {" "}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  style={{ color: "#078df2" }}
                  className="text-lg md:text-xl lg:text-2xl"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

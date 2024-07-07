import React from "react";
import { Link } from "react-router-dom"; // If using react-router for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Logo from "../Assets/jsngf-4.png";
import LogoP5 from "../Assets/p51.png";

const Footer = () => {
  return (
    <footer
      className="text-black py-8 relative"
      style={{ backgroundColor: "#652B7C" }}
    >
      <div className="container mx-auto flex flex-col gap-4 md:flex-row justify-between md:gap-8">
        <div className="text-center md:text-left md:mr-auto md:ml-10">
          <div className="flex flex-col items-center">
            <img src={Logo} alt="Jharkhand Logo" className="w-28 h-28 mr-2" />
            <div className="w-5 h-5 mr-2"></div>
            <h3 className="text-xl font-bold" style={{ color: "white" }}>
              JSNGEF-G
            </h3>
          </div>
        </div>

        <div
          className="text-center md:text-left md:ml-auto"
          style={{ color: "white" }}
        >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/leadership-team">About</Link>
            </li>
            {/* <li>
              <Link to="/be-a-member">Be a Member</Link>
            </li>
            <li>
              <Link to="/member-list">Member List</Link>
            </li> */}
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
            <li>
              <Link to="/affiliation"> Affiliation</Link>
            </li>
            <li>
              <Link to="/circular"> Circular</Link>
            </li>
            <li>
              <Link to="/image-gallery">Image Gallery</Link>
            </li>

            <li>
              <Link to="/news-and-event"> News and Events</Link>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left md:ml-auto md:mr-10">
          <h3 className="text-xl font-bold mb-4" style={{ color: "white" }}>
            Important website Links
          </h3>
          <ul style={{ color: "white", marginTop: "10px" }}>
            <li>
              <a
                href="https://finance.jharkhand.gov.in/"
                style={{ color: "white", textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Finance Jharkhand
              </a>
            </li>
            <li>
              <a
                href="https://jkuber.jharkhand.gov.in/emp/"
                style={{ color: "white", textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Kuber jharkhand
              </a>
            </li>
            <li>
              <a
                href="https://godda.nic.in/"
                style={{ color: "white", textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                About Godda NIC
              </a>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left md:ml-auto md:mr-10">
          <h3 className="text-xl font-bold mb-4" style={{ color: "white" }}>
            Connect With Us
          </h3>
          <ul style={{ color: "white", marginTop: "10px" }}>
            <li>
              Email:{" "}
              <a
                href="mailto:jsngefgodda@gmail.com"
                style={{ color: "white", textDecoration: "none" }}
              >
                jsngefgodda@gmail.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+8002846416"
                style={{ color: "white", textDecoration: "none" }}
              >
                +91 8002846416
              </a>
            </li>
            <li>
              Address: M.S Manzil, Eidgah Lane-1, <br /> Fasiyadangal, Godda,
              Jharkhand - 814133
            </li>
          </ul>
          <ul className="flex gap-4 justify-center md:justify-start">
            <li>
              <a
                href="https://x.com/jsngefgodda?t=Gjlwa0Rk-U_tWwjgZbvsYQ&s=08"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ color: "#1DA1F2" }}
                  className="text-lg md:text-xl lg:text-2xl"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/people/Jharkhand-State-Non-Gazetted-Employees-Federation-Godda/61561212759753/"
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
      <hr className="my-4 border-white" />
      <div className="text-center" style={{ color: "white" }}>
        <p>
          &copy; 2024 Jharkhand State Non-Gazetted Employees Federation, Godda.
          All rights reserved.
        </p>
        <p style={{ display: "inline-flex", alignItems: "center" }}>
          <a
            href="https://p5digital.in/index.html"
            target="blank"
            style={{ color: "white", textDecoration: "none" }}
          >
            Developed by
          </a>
          <img
            src={LogoP5}
            alt="P5 Digital Solutions Logo"
            height={20}
            width={20}
            style={{ marginLeft: "8px" }}
          />
          <a
            href="https://p5digital.in/index.html"
            target="blank"
            style={{
              color: "white",
              textDecoration: "none",
              marginLeft: "4px",
            }}
          >
            P5 Digital Solutions
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

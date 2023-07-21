import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="px-4 py-2 d-flex justify-content-between ">
      <h2>Contact-Management App</h2>
      <div
        className=" py-2 px-4 d-flex justify-content-between "
        style={{ gap: "1rem" }}
      >
        <Link
          className="text-decoration-none "
          style={{ fontSize: "1.2rem", color: "black" }}
          to={"/"}
        >
          Contacts
        </Link>
        <Link
          className="text-decoration-none"
          style={{ fontSize: "1.2rem", color: "black" }}
          to={"/dashboard"}
        >
          Contact details
        </Link>
      </div>
    </div>
  );
}

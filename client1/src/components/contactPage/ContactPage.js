import React from "react";
import { useState } from "react";
import axios from "axios";
import style from "./ContactPage.module.css";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const addEmployee = () => {
    console.log(name);
    if (
      name !== "" &&
      email !== "" &&
      age !== 0 &&
      country !== "" &&
      position !== "" &&
      wage !== 0
    ) {
      axios
        .post("http://localhost:3001/create", {
          name: name,
          email: email,
          age: age,
          country: country,
          position: position,
          wage: wage,
        })
        .then(() => {
          console.log("success");
        });
    }

    setName("");
    setAge("");
    setEmail("");
    setCountry("");
    setPosition("");
    setWage("");
  };

  return (
    <div style={{ padding: "3rem" }}>
      <div
        className="d-flex flex-column justify-content-center align-items-center mt-4"
        style={{ gap: "1rem" }}
      >
        <span className={style.employeeBox}>
          <label>Name : </label>
          <input
            type="text"
            value={name}
            placeholder="Enter your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </span>
        <span className={style.employeeBox}>
          <label>Email : </label>
          <input
            type="email"
            value={email}
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </span>
        <span className={style.employeeBox}>
          <label>Age : </label>
          <input
            type="number"
            value={age}
            placeholder="Enter your Age"
            onChange={(e) => setAge(e.target.value)}
          />
        </span>
        <span className={style.employeeBox}>
          <label>Country : </label>
          <input
            type="text"
            value={country}
            placeholder="Enter your Country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </span>
        <span className={style.employeeBox}>
          <label>Position : </label>
          <input
            type="text"
            value={position}
            placeholder="Enter your Position"
            onChange={(e) => setPosition(e.target.value)}
          />
        </span>
        <span className={style.employeeBox}>
          <label>Wage : </label>
          <input
            type="Number"
            value={wage}
            placeholder="Enter your Wage"
            onChange={(e) => setWage(e.target.value)}
          />
        </span>
        <button
          className=" border-0 mt-2 rounded-3 bg-secondary text-white "
          style={{ fontSize: "1.2rem", padding: "0.7rem 3rem" }}
          onClick={addEmployee}
        >
          Add Employee
        </button>
      </div>
    </div>
  );
}

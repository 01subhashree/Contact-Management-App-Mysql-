import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./Dashboard.module.css";

export default function Dashboard() {
  const [employeeList, setEmployeeList] = useState([]);
  const [newWage, setNewWage] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3001/employees").then((response) => {
      console.log(response);
      setEmployeeList(response.data);
    });
  }, []);

  const updateEmployeeWage = (id) => {
    console.log(id);
    axios
      .put("http://localhost:3001/update", { wage: newWage, id: id })
      .then((response) => {
        setEmployeeList(
          employeeList.map((val, index) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  email: val.email,
                  age: val.age,
                  country: val.country,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      });
  };

  const DeleteEmployees = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(employeeList.filter((val) => val.id !== id));
    });
  };
  return (
    <div className="d-flex flex-column" style={{ padding: "3rem" }}>
      {employeeList.map((val, key) => (
        <div key={key} className={style.dashboardDiv}>
          <div>
            <h4>Name: {val.name}</h4>
            <h4>Email ID: {val.email}</h4>
            <h4>Age: {val.age}</h4>
            <h4>Country: {val.country}</h4>
            <h4>Position: {val.position}</h4>
            <h4>Salary: {val.wage}</h4>
          </div>
          <div className={style.editDiv}>
            <div className={style.updateDiv}>
              <input
                placeholder="2000....."
                onChange={(e) => setNewWage(e.target.value)}
                type="text"
              />
              <button onClick={() => updateEmployeeWage(val.id)}>Update</button>
            </div>
            <button
              className={style.deleteButton}
              onClick={() => DeleteEmployees(val.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    console.log(name);
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
        setEmployeeList([
          ...employeeList,
          {
            name: name,
            email: email,
            age: age,
            country: country,
            position: position,
            wage: wage,
          },
        ]);
      });

    setName("");
    setAge("");
    setEmail("");
    setCountry("");
    setPosition("");
    setWage("");
  };

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

  const getEmployees = () => {
    axios.get("http://localhost:3001/employees").then((response) => {
      console.log(response);
      setEmployeeList(response.data);
    });
  };

  const DeleteEmployees = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(employeeList.filter((val) => val.id !== id));
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name :</label>
        <input
          type="text"
          value={name}
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email :</label>
        <input
          type="email"
          value={email}
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Age :</label>
        <input
          type="number"
          value={age}
          placeholder="Enter your Age"
          onChange={(e) => setAge(e.target.value)}
        />
        <label>Country :</label>
        <input
          type="text"
          value={country}
          placeholder="Enter your Country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <label>Position :</label>
        <input
          type="text"
          value={position}
          placeholder="Enter your Position"
          onChange={(e) => setPosition(e.target.value)}
        />
        <label>Wage :</label>
        <input
          type="Number"
          value={wage}
          placeholder="Enter your Wage"
          onChange={(e) => setWage(e.target.value)}
        />
        <button onClick={addEmployee}>Add Employee</button>
        <button onClick={getEmployees}>Show Employees</button>

        {employeeList.map((val, key) => (
          <div key={key} className="employee">
            <div>
              <h3>Name: {val.name}</h3>
              <h3>Email ID: {val.email}</h3>
              <h3>Age: {val.age}</h3>
              <h3>Country: {val.country}</h3>
              <h3>Position: {val.position}</h3>
              <h3>Salary: {val.wage}</h3>
            </div>
            <div>
              <input
                placeholder="2000....."
                onChange={(e) => setNewWage(e.target.value)}
                type="text"
              />
              <button onClick={() => updateEmployeeWage(val.id)}>Update</button>
              <button onClick={() => DeleteEmployees(val.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

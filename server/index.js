const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Rosy@2503",
  database: "employeesystem",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err.message);
    return;
  }
  console.log("Connected to the MySQL database!");
});

app.post("/create", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  const sql =
    "INSERT INTO employees (name, email, age, country, position, wage) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [name, email, age, country, position, wage];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log("Error inserting values:", err.message);
      res
        .status(500)
        .json({ error: "Error inserting values into the database." });
    } else {
      console.log("Values Inserted:", result);
      res.status(200).json({ message: "Values inserted successfully." });
    }
  });
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;

  db.query(
    "UPDATE employees SET  wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Hey, your server is running on port ${port}`);
});

// Daniel Ramirez
// Z23103454
// studentserver.js

const express = require("express");
const bodyParser = require("body-parser");
const { connectToDb, getDb } = require("./db");
var config = require("./config");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// adds proper CORS headers to response allows requests from one domain to other domain
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Connect to MongoDB and once connected listen for requests on port 5678
let db;
port = process.env.PORT || 5678;
connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log("server is running.");
    });
    db = getDb();
  }
});

// Endpoints

// Add student record method
app.post("/students", function (req, res) {
  var record_id = new Date().getTime();
  var rsp_obj = {};

  var student = {};
  student.record_id = record_id;
  student.first_name = req.body.first_name;
  student.last_name = req.body.last_name;
  student.gpa = req.body.gpa;
  student.enrolled = req.body.enrolled;
  // First check to see if student exists
  db.collection(config.db.collection)
    .findOne({
      first_name: student.first_name,
      last_name: student.last_name,
      gpa: student.gpa,
      enrolled: student.enrolled,
    })
    .then((result) => {
      // If student exists in database return student exists
      if (result) {
        rsp_obj.message = "Student Already exists.";
        res.status(409).send(rsp_obj.message);
      } else {
        // If the student does not exist we try to add the student to the database
        db.collection(config.db.collection)
          .insertOne(student)
          .then((result) => {
            console.log("inserted document!");
            console.log(result);
            rsp_obj.message = "Student created successfully!";
            res.status(200).send(rsp_obj.message);
            console.log(
              "The data inside the response object inside the post function is: "
            );
            console.dir(rsp_obj);
          })
          .catch((err) => {
            rsp_obj.record_id = -1;
            rsp_obj.message = "error - unable to create resource";
            res.status(500).send(rsp_obj);
          });
      }
    })
    .catch((err) => {
      rsp_obj.record_id = -1;
      rsp_obj.message = "error - unable to create resource";
      res.status(500).send(rsp_obj);
    });
});

// Update a Single student's record
app.put("/students/:record_id", function (req, res) {
  var id = parseInt(req.params.record_id);
  const updates = req.body;
  var rsp_obj = {};

  // sets the record_id to be updated in MongoDb to number from a string
  updates.record_id = parseInt(updates.record_id);

  db.collection(config.db.collection)
    .updateOne({ record_id: id }, { $set: updates })
    .then((result) => {
      rsp_obj.message = "Student updated successfully!";
      res.status(200).send(rsp_obj.message);
    })
    .catch((err) => {
      rsp_obj.message = "Unable to update student.";
      res.status(500).send(rsp_obj.message);
    });
});

// Display a single student's record
app.get("/students/:record_id", function (req, res) {
  var id = req.params.record_id;
  var rsp_obj = {};

  // Find student record
  db.collection(config.db.collection)
    .findOne({ record_id: parseInt(id) })
    .then((result) => {
      if (result == null) {
        rsp_obj.message = "No student found with that ID.";
        res.status(500).send(rsp_obj);
      } else {
        delete result._id; // eliminates _id so frontend does not get more info than needed from database
        res.status(200).json({ student: result });
      }
    })
    .catch((err) => {
      res.status(500).send("error - unable to retrieve resource");
    });
});

// Delete a single student method
app.delete("/students/:record_id", function (req, res) {
  var id = req.params.record_id;
  var rsp_obj = {};
  console.log(typeof id);
  console.log(typeof parseInt(id));

  // deletes id from database
  db.collection(config.db.collection)
    .deleteOne({ record_id: parseInt(id) })
    // used ChatGPT for if statement that checks if a deletion occurred although removing parse on,ine above fixed issue
    .then((result) => {
      if (result.deletedCount === 1) {
        rsp_obj.message = "Student deleted successfully!";
        res.status(200).send(rsp_obj.message);
      } else {
        rsp_obj.message = "No student found matching that id.";
        res.status(404).send(rsp_obj.message);
      }
    })
    .catch((err) => {
      rsp_obj.message = "Unable to delete that ID.";
      res.status(500).send(rsp_obj.message);
    });
});

// List all students method
/**
 * handles GET request to "/list" endpoint by pulling all documents from MongoDB collection
 *
 * @param {*} req - The HTTP request
 * @param {*} res - The HTTP response
 */
app.get("/students", function (req, res) {
  db.collection(config.db.collection)
    .find()
    .toArray()
    .then((result) => {
      // added way to only send necessary info to frontend
      const students = result.map((student) => {
        return {
          record_id: student.record_id,
          first_name: student.first_name,
          last_name: student.last_name,
          gpa: student.gpa,
          enrolled: student.enrolled,
        };
      });
      res.status(200).json({ students: students });
    })
    .catch((err) => {
      res.status(500).send("error - unable to retrieve resources");
    });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

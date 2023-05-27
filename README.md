## Daniel Ramirez

</br>

# Student Server
This Project was continuously developed throughout a Full-Stack course at FAU. The web application was originally created using HTML, CSS and Javascript, then the application was converted to EJS, and lastyly recreated using React.js.

### **Technologies:** React, Express, MongoDb, Nodejs, react-bootstrap, mongoose
</br>

### **API endpoints**
**Post** /students - accepts a json object with student first name, last name, gpa, and enrolled.

```js
    first_name: student.first_name,
    last_name: student.last_name,
    gpa: student.gpa,
    enrolled: student.enrolled,
```

**Put** /students/:record_id - validates whether student with matching record_id exists and updates the student document if it does.

**Delete** /students/:record_id - validates whether student with matching record_id exists and deletes the document if it does.

**Get** /students/:record_id - gets the students document and maps data to the table if found else displays error if not found.

**Get** /students - gets all student documents in the database and maps them to students object

**Get** /search - returns documents matching query parameter whether the query is found in first_name, last_name, gpa, or enrolled.

</br>

![Landing Page](/readme_res/home.png)


## Deployed using Heroku @ https://student-server-reactdeployment.herokuapp.com/

</br>

![Application gif](/readme_res/student-server.gif)
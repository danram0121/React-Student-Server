import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useLocation } from "react-router-dom/";

export default function Search() {
  // initialize states
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  //get current location
  const location = useLocation();

  useEffect(() => {
    // get query param from URL
    const searchQuery = new URLSearchParams(location.search).get("q");
    if (searchQuery) {
      axios
        .get(`/search?q=${searchQuery}`)
        .then((response) => {
          setStudents(response.data.students);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [location.search]);

  return (
    <>
      <Container>
        <h1 className="mt-5 mb-4 text-center">Search Results</h1>
        {error && <div>Error: {error}</div>}
        <Table striped hover className="text-center">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>GPA</th>
              <th>Enrolled</th>
            </tr>
          </thead>
          <tbody id="table_body">
            {/* map students to table rows */}
            {students.map((student) => (
              <tr key={student.record_id}>
                <td>{student.record_id}</td>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>{student.gpa}</td>
                <td>{student.enrolled.toString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

import React, { Component } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

export default class ListsStudents extends Component {
  state = {
    students: [],
    error: null,
  };

  getStudents = () => {
    axios
      .get(`/students`) // comment to test
      .then((response) => {
        this.setState({ students: response.data.students });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  // React method that runs when the listStudents component is inserted into DOM
  componentDidMount() {
    this.getStudents();
  }

  render() {
    const { students, error } = this.state;

    return (
      <>
        <Container>
          <h1 className="mt-5 mb-4 text-center">List Students</h1>
          {error && <div>Error: {error}</div>}
          <Table striped hover>
            <thead>
              <tr>
                <th>#</th>
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
}

import React, { Component } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class ViewStudent extends Component {
  state = {
    record_id: "",
    student: null,
    response: "",
  };

  clearInput = () => {
    this.setState({ record_id: "" });
  };

  handleChange = (event) => {
    this.setState({ record_id: event.target.value });
  };

  ViewStudent = (event) => {
    event.preventDefault();

    const record_id = this.state.record_id;

    axios
      .get(`http://localhost:${process.env.PORT}/students/${record_id}`, {})
      .then((response) => {
        const student = response.data.student;
        this.setState({
          student,
          success: true,
          alertVariant: "success",
        });
        this.clearInput();
      })
      .catch((error) => {
        this.setState({
          response: `Error: ${error.response.status} ${error.response.statusText}`,
          success: false,
          alertVariant: "warning",
        });
        this.clearInput();
      });
  };

  render() {
    const { student, response, alertVariant } = this.state;

    return (
      <>
        <Container>
          <h1 className="mt-5 mb-4 text-center">Find Student</h1>
          <Form onSubmit={this.ViewStudent}>
            <Row>
              <Col xs="5" md="4" lg="3">
                <Form.Group>
                  <Form.Label hidden>Student Id</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Student Id"
                    value={this.state.record_id}
                    onChange={this.handleChange}
                    className="xs"
                  />
                  <Form.Text>Input must be a number.</Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Button type="submit">Find</Button>
              </Col>
              <Col>
                {response !== "" && (
                  <Alert variant={alertVariant} className="text-center">
                    {response}
                  </Alert>
                )}
              </Col>
            </Row>
          </Form>
          <Table striped hover className="mt-4">
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
              {student && (
                <tr>
                  <td>{student.record_id}</td>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.gpa}</td>
                  <td>{student.enrolled}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}

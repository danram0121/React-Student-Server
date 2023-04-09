import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

export default class UpdateStudent extends Component {
  // initialize state
  state = {
    record_id: "",
    first_name: "",
    last_name: "",
    gpa: "",
    enrolled: "",
    response: "",
  };

  // clear states function will clear the form when called
  clearInputs = () => {
    this.setState({
      record_id: "",
      first_name: "",
      last_name: "",
      gpa: "",
      enrolled: "",
    });
  };

  UpdateStudent = (event) => {
    event.preventDefault();

    const { record_id, first_name, last_name, gpa, enrolled } = this.state;

    axios
      .put(`${process.env.REACT_APP_BASE_URL}/students/` + record_id, {
        record_id: record_id,
        first_name: first_name,
        last_name: last_name,
        gpa: gpa,
        enrolled: enrolled,
      })
      .then((response) => {
        this.setState({
          response: response.data,
          success: true,
          alertVariant: "success",
        });
        console.log("response to front end: ");
        console.log(response);
        console.log("response.data: " + response.data);
        this.clearInputs();
      })
      .catch((error) => {
        this.setState({
          response: `Error: ${error.response.status} ${error.response.statusText}`,
          success: false,
          alertVariant: "warning",
        });
        console.log("error: " + error);
        this.clearInputs();
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    const {
      record_id,
      first_name,
      last_name,
      gpa,
      enrolled,
      response,
      alertVariant,
    } = this.state;

    return (
      <Container className="rounded-5 shadow-lg p-5 w-100 custom-form">
        <h1 className="text-center mb-5">Update Student</h1>
        <Form onSubmit={this.UpdateStudent}>
          <Form.Group className="mb-3" controlId="record_id">
            <Form.Label>Student Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Student Id"
              value={record_id}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={first_name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="gpa">
            <Form.Label>GPA</Form.Label>
            <Form.Control
              type="text"
              placeholder="GPA"
              value={gpa}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="enrolled">
            <Form.Label>Enrolled</Form.Label>
            <Form.Select value={enrolled} onChange={this.handleChange}>
              <option value="" disabled>
                Choose enrollment status
              </option>
              <option value="True">True</option>
              <option value="False">False</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" className="mb-3">
            Submit
          </Button>
          {/* Alert will appear if response is received, i.e post fails or succeeds */}
          {response !== "" && (
            <Alert variant={alertVariant} className="text-center">
              {response}
            </Alert>
          )}
        </Form>
      </Container>
    );
  }
}

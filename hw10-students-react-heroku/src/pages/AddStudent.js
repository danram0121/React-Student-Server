import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

export default class AddStudent extends Component {
  // initialize state
  state = {
    first_name: "",
    last_name: "",
    gpa: "",
    enrolled: "",
    response: "",
  };
  // clear states function will clear the form when called
  clearInputs = () => {
    this.setState({
      first_name: "",
      last_name: "",
      gpa: "",
      enrolled: "",
    });
  };
  // method to add student to database by sending data to backend using axios
  AddStudent = (event) => {
    // console.log("1st log inside addstudent");
    event.preventDefault();

    const { first_name, last_name, gpa, enrolled } = this.state;
    // console.log(first_name, last_name, gpa, enrolled);

    axios
      .post(`http://localhost:${process.env.PORT}/students`, {
        first_name: first_name,
        last_name: last_name,
        gpa: gpa,
        enrolled: enrolled,
      })
      // handle success
      .then((response) => {
        this.setState({
          response: response.data,
          success: true,
          alertVariant: "success",
        });
        this.clearInputs();
        console.log("response to front end: ");
        console.log(response);
        console.log("response.data: " + response.data);
      })
      // handle error
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
  // updates state for id and its value
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    const { first_name, last_name, gpa, enrolled, response, alertVariant } =
      this.state;

    return (
      <>
        <Container className="custom-form rounded-5 shadow-lg p-5">
          <h1 className="text-center mb-5">Add Student</h1>
          <Form onSubmit={this.AddStudent}>
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
              {/* Select option for True or False enrollment status */}
              <Form.Select value={enrolled} onChange={this.handleChange}>
                {/* the 1st option is not clickable although if user makes no change to selection "Choose enrollment status" will be passed*/}
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
      </>
    );
  }
}

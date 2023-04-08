import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

export default class DeleteStudent extends Component {
  state = {
    record_id: "",
    response: "",
  };

  clearInput = () => {
    this.setState({ record_id: "" });
  };

  DeleteStudent = (event) => {
    event.preventDefault();

    const record_id = this.state.record_id;
    console.log(record_id);

    axios
      .delete(`http://localhost:5678/students/${record_id}`, {})
      .then((response) => {
        this.setState({
          response: response.data,
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
  // updates state for id and its value
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    const { record_id, response, alertVariant } = this.state;

    return (
      <>
        <Container className="rounded-5 shadow-lg my-auto p-5 w-100 custom-form">
          <h1 className="text-center mb-5">Delete Student</h1>
          <Form onSubmit={this.DeleteStudent}>
            <Form.Group className="mb-3" controlId="record_id">
              <Form.Label>Student Id</Form.Label>
              <Form.Control
                type="number"
                placeholder="Student Id"
                value={record_id}
                onChange={this.handleChange}
              />
              <Form.Text>Input must be a number.</Form.Text>
            </Form.Group>
            <Button type="submit" className="mb-3" variant="danger">
              Submit
            </Button>
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

// import React Logo
import logo from "../res/logo.svg";
// import react router
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import react-bootstrap components
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import bootstrap css styling
import "bootstrap/dist/css/bootstrap.min.css";
// import pages
import Home from "./Home";
import AddStudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";
import ViewStudent from "./ViewStudent";
import DeleteStudent from "./DeleteStudent";
import ListsStudents from "./ListsStudents";
import { Component } from "react";

export default class Navigation extends Component {
  render() {
    return (
      <Router>
        <>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand>
                <img
                  alt="React Logo"
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                ></img>{" "}
                Student Server
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbar" />
              <Navbar.Collapse id="navbar">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to={"/"}>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/Add"}>
                    Add
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/Update"}>
                    Update
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/View"}>
                    View
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/Delete"}>
                    Delete
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/List"}>
                    List
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Add" element={<AddStudent />} />
          <Route path="/Update" element={<UpdateStudent />} />
          <Route path="/Delete" element={<DeleteStudent />} />
          <Route path="/View" element={<ViewStudent />} />
          <Route path="/List" element={<ListsStudents />} />
        </Routes>
      </Router>
    );
  }
}

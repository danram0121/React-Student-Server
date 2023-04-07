import React, { Component } from "react";
import ideas from "../res/ideas.svg";
import Container from "react-bootstrap/esm/Container";

export default class Home extends Component {
  render() {
    return (
      <>
        <Container>
          <h1 className="text-center mt-5 mb-4">
            Welcome to the Student Server
          </h1>
          <p className="text-center">
            Use the navigation bar to reach the function you want to use.
          </p>
          <img alt="Creative Students" src={ideas}></img>
        </Container>
      </>
    );
  }
}

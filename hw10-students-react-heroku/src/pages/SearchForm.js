import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import bootstrap css styling
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // method to handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // navigates to search page with the query as parameters
    navigate(`/search?q=${searchQuery}`);
  };

  //   handles change to Form.Control field by adding new value to searchQuery state
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //  Return React-Bootstrap Form to be called in the navbar
  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        className="me-2"
        type="search"
        placeholder="Search Students"
        value={searchQuery}
        onChange={handleChange}
      />
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
}

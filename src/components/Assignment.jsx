import React, { useState } from "react";
import "../assets/css/Assingment.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Assignment = () => {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [file, setFile] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (email === "" || name === "" || !file?.file)
      return alert("All fields are mandatory");
    const fd = new FormData();
    fd.append("name", name);
    fd.append("email", email);
    fd.append("file", file?.file);
    fetch(`${process.env.REACT_APP_BASE_URL}/data`, {
      method: "POST",
      body: fd,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === "ok") {
          alert("your assignment has been submitted successfully");
          setName("");
          setEmail("");
          setFile(null);
        } else {
          alert("Failed");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Form onSubmit={submitHandler} className="assignment">
        <h3>Assignment Submission Form</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload your assignment as PDF</Form.Label>
          <Form.Control
            required
            value={file?.path || ""}
            accept=".doc, .docx, .ppt, .pptx, .txt, .pdf"
            onChange={(e) =>
              setFile({ path: e.target.value, file: e.target.files[0] })
            }
            type="file"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Link className="link" to="/submissions">
        View all submissions
      </Link>
    </>
  );
};

export default Assignment;

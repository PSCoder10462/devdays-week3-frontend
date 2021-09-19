import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Submissions.css";
import Table from "react-bootstrap/Table";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/data`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === "ok") {
          setSubmissions(res.assignments);
        } else {
          setSubmissions([]);
          alert("Failed to fetch");
        }
      })
      .catch((err) => alert("Failed to fetch"));

    return () => {
      // unsubscribe();
      setSubmissions([]);
    };
  }, []);
  return (
    <>
      <div className="submissions">
        <h1>Total Submissions ({submissions?.length})</h1>
        <hr />
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Link to PDF</th>
            </tr>
          </thead>
          <tbody>
            {submissions?.map((submission, i) => (
              <tr key={submission._id}>
                <td>{i + 1}</td>
                <td>{submission.name}</td>
                <td>{submission.email}</td>
                <td>
                  <a
                    href={
                      process.env.REACT_APP_BASE_URL + submission.assignmentURL
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    View PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Link className="link" to="/">
        Submit assignment
      </Link>
    </>
  );
}

export default Submissions;

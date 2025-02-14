import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CURRENT } from "../../utils/queries";
import Auth from "../../utils/auth";
import Nav from "../Nav";
import Footer from "../Footer";

export default function CheckPage() {
  const { data } = useQuery(CURRENT);
  const Current = data?.current || [];
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    const formState = 
    event.preventDefault();
    try {
      localStorage.setItem("queue_Id", Current.queueId);
      localStorage.setItem("username", formState.username);
      window.location.assign("/DisplayQueue");
    } catch (e) {
      window.location.assign("/ErrorPage");
    }
  };

  return (
    <main>
      <Nav />
      <div className="text-center m-5-auto">
        <h5>Enter your details below to view the estimate waiting time</h5>
        <form onSubmit={handleFormSubmit}>
          <p>
            <label>username</label>
            <br />
            <input
              type="username"
              name="username"
              value={formState.username}
              onChange={handleChange}
              required
              placeholder="eg: John"
            />
          </p>
          <p>
            <label>Email address</label>
            <br />
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              placeholder="eg: johndoe@email.com"
            />
          </p>
          <p>
            <label>Phone number</label>
            <br />
            <input
              type="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              required
              placeholder="eg: 647-647-6476"
            />
          </p>
          <p>
            <input type="checkbox" name="checkbox" id="checkbox" required />{" "}
            <span>
              I agree all statements in{" "}
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                terms of service
              </a>
            </span>
            .
          </p>
          <p>
            <button className="btn d-block w-100" type="submit">
              Submit
            </button>
          </p>
        </form>
        <footer>{/* <p><Link to="/">Back to HomePage</Link>.</p> */}</footer>
      </div>
      <Footer />
    </main>
  );
}

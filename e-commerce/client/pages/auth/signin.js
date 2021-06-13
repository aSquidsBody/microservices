import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

// Define the component
const SignIn = () => {
  // Define some state values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });
  // Function to run when the user hits 'submit'
  const onSubmit = async (event) => {
    event.preventDefault(); // prevent the form from submitting itself to the browser;
    doRequest(); // comes from the custom hook above
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {/* Errors default to null */}
      {errors}
      <button className="btn btn-primary">Sign In</button>
    </form>
  );
};

export default SignIn;

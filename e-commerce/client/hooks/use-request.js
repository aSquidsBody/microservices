// Hooks can ONLY be used INSIDE a component

import axios from "axios";
import { useState } from "react";

// Hook which creates a function which does a particular request
const useRequest = ({ url, method, body, onSuccess }) => {
  // method must be 'GET', "PUT", "POST", etc.
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null); // remove previous errors
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors }; // hook convention returns list (see useState), but object is fine for us.
};

export default useRequest;

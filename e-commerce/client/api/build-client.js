import axios from "axios";

// Accepts an incoming request and returns a configured axios configuration
const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // we are on the server, need to specify the base url to be the ingress-nginx LoadBalanacer
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    //  we are in the browser, and can let the browser handle the url name
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;

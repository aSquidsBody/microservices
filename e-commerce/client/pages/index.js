import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

// getInitialProps is specific to Next.js
// Next.js calls this function while it attempts to render the page on the server
// This method is our chance to make changes to the page while it is rendering
LandingPage.getInitialProps = async (context) => {
  // context has context.req.headers property we need
  const client = buildClient(context); // configures axios for the proper context

  const { data } = await client.get("/api/users/currentuser");

  return data; // contains infor on the currentUser
};

export default LandingPage;

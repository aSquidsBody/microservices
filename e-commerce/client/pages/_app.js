import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client"; // create an axios config for specific context
import Header from "../components/header";

// whenever you try to navigate to a page using next.js, next will import your component from
// the correct file in pages/. Next wraps our components in their own component called '_app'.
// We are creating our own custom _app component to wrap around our Components.
// It is needed because you can only import global css into THIS APP FILE.
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

// Note, getInitialProps doesn't have a context property in _app since it is not a page.
//
AppComponent.getInitialProps = async (appContext) => {
  // config axios and get data on the current user
  // This is needed for ALL pages, so include it here in _app. (it is needed for the header.)
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  // Take the page context and pass into the individual Component getInitialProps if they need it
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    currentUser: data.currentUser, // alternatively, could have done '...data'
  };
};

export default AppComponent;

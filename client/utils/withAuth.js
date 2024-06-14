import { wrapper } from "@/app/store";
import { getMe } from "@/features/userSlice";
import cookie from "cookie";

// A higher-order function that adds authentication checks to a getServerSideProps function
const withAuth = (
  gssp, // The original getServerSideProps function
  restrictTo = [], // List of roles that are allowed to access the page
  blockAuth = false // If true, block logged-in users from accessing the page
) =>
  wrapper.getServerSideProps((store) => async (context) => {
    const { req, res } = context;
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.token; // Extract the token from cookies

    // Dispatch getMe action with the token, if available
    if (token) {
      await store.dispatch(getMe(token));
    }

    const state = store.getState();
    const { user } = state.user;

    // If blockAuthenticatedUser is true and user is logged in, redirect them away from the page
    if (blockAuth && user._id) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    // Redirect to the login page if no user is found and the page requires authentication
    if (restrictTo.length > 0 && !user._id) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    // If a requiredRole is specified and the user's role doesn't match any, redirect
    if (restrictTo.length > 0 && !restrictTo.includes(user?.role)) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    let gsspResult = { props: {} };
    if (gssp) {
      gsspResult = await gssp({ ...context, store, user });
    }

    // Return the result of the original getServerSideProps with added user prop
    return {
      ...gsspResult,
      props: {
        ...gsspResult.props,
        user,
      },
    };
  });

export default withAuth;

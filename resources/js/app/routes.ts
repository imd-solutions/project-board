// Import the module routes.
import application from "./application/routes";
import auth from "./auth/routes";
import site from "./site/routes";

// Export the routes.
export default [...application, ...auth, ...site];

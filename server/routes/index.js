import authRoutes from "./auth.js";
import membershipRoutes from "./membershipRoutes.js"

const routes = {
  auth: authRoutes,
  renew: membershipRoutes,
};

export default routes;

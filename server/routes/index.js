import authRoutes from "./auth.js";
import membershipRoutes from "./membership.js";

const routes = {
  auth: authRoutes,
  // renew: membershipRoutes,
  membership: membershipRoutes,
};

export default routes;

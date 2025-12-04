export const ROUTES = {
  PUBLIC: {
    LANDING_PAGE: '/',
    LOGIN: "/login",
    VERIFIER_REGISTER: "/verifier/register",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    VERIFIERS: "/admin/verifiers",
    REVIEW: "/admin/review/:id",
    LICENSES: "/admin/licenses",
    ADD_LICENSE: "/admin/licenses/new",
    PROFILE: "/admin/profile",
  },
  VERIFIER: {
    HOME: "/verifier/home",
    VERIFY_LICENSE: "/verifier/verify",
  },
};

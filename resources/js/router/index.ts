// Import vue and vue-router.
import Vue from "vue";
import Router from "vue-router";
import {routes} from "./../app/index";
import SecureLS from "secure-ls/dist/secure-ls.min.js";

// Init the use of vue-router.
Vue.use(Router);

// Set the router.
export const router = new Router({
    mode: "history",
    routes: routes
});

router.beforeEach((to, from, next) => {
    const ls = new SecureLS();
    let user: any = ls.get("user") ? JSON.parse(ls.get("user")) : [];

    // console.log("URL", to);
    //
    // if (to.path != '/password/reset/*') {
    //     return;
    // }

    if (!to.matched.length) {
        next("/unrecognised");
    } else {
        if (user.authorised) {
            // User is logged in and tries to go to any guest page.
            if (to.meta.authentication === false) {
                // Send them to the main dashboard page.
                next({path: "/application/dashboard"});
                return;
            }
            // Send the user to the intended page.
            next();
        } else {
            // User is not logged in and tries to go to any authorised page.
            if (to.meta.authentication) {
                // Send them to the login page.
                next({path: "/auth/signin"});
                return;
            }
            // Send the user to the intended page.
            next();
        }
    }
});

export default router;

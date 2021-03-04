// Import the auth page.
import AuthPage from "@components/Auth.vue";

// Import the components from Components index file.
import {Signin, Register, ConfirmEmail, Reset} from "./../components";

export default [
    {
        path: "/auth",
        component: AuthPage,
        children: [
            {
                path: "signin",
                component: Signin,
                name: "signin",
                props: true,
                meta: {
                    authentication: false,
                    needsAuth: false
                }
            },
            {
                path: "register",
                component: Register,
                name: "register",
                props: true,
                meta: {
                    authentication: false,
                    needsAuth: false
                }
            },
        ]
    },
    {
        path: "/password",
        component: AuthPage,
        children: [
            {
                path: "reset/:token",
                component: Reset,
                name: "reset",
                props: true,
                meta: {
                    authentication: false,
                    needsAuth: false
                }
            }
        ]
    },
    {
        path: "/confirm",
        component: AuthPage,
        children: [
            {
                path: "email/:code",
                component: ConfirmEmail,
                name: "confirm",
                props: true,
                meta: {
                    authentication: false,
                    needsAuth: false
                }
            }
        ]
    }
];

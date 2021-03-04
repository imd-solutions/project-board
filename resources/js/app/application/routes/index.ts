// Import the application page.
import ApplicationPage from "@components/Application.vue";

// Import the components from Components index file.
import { Dashboard } from "./../components";

export default [
    {
        path: "/application",
        component: ApplicationPage,
        children: [
            {
                path: "dashboard",
                component: Dashboard,
                name: "dashboard",
                props: true,
                meta: {
                    authentication: true,
                    needsAuth: false
                }
            }
        ]
    }
];

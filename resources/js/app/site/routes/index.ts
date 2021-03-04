// Import the site page.
import SitePage from "@components/Site.vue";

// Import the components from Components index file.
import {HomePage, Unrecognised} from "./../components";

export default [
    {
        path: "/",
        redirect: {name: 'signin'}
        // component: SitePage,
        // children: [
        //     {
        //         path: "/",
        //         component: HomePage,
        //         name: "homepage"
        //     }
        // ]
    },
    {
        path: "/unrecognised",
        component: Unrecognised,
        name: "unrecognised"
    }
];

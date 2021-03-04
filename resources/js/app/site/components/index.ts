// Import vue.
import Vue from "vue";

// Export the components.
export const HomePage = Vue.component(
    "homepage",
    require("./HomePage").default
);
export const Unrecognised = Vue.component(
    "unrecognised",
    require("./Unrecognised").default
);

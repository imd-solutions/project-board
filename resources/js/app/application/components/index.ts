// Import vue.
import Vue from "vue";

// Export the components.
export const Dashboard = Vue.component(
    "dashboard",
    require("./Dashboard").default
);

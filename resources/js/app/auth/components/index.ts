// Import vue.
import Vue from "vue";

// Export the components.
export const Signin = Vue.component("signin", require("./Signin").default);
export const Register = Vue.component(
    "register",
    require("./Register").default
);
export const Reset = Vue.component(
    "reset",
    require("./Reset").default
);

export const ConfirmEmail = Vue.component(
    "confirm",
    require("./ConfirmEmail").default
);

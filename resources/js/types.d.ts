declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

declare module "apollo-upload-client";
declare module "vue-bulma-datepicker";
declare module "vue-slide-up-down";
declare module "vue-carousel";
declare module "secure-ls/*";
declare module "vuelidate/lib/validators";
declare module "@queries/*";
declare module "@mutations/*";
declare module "@mixins/*";
// declare module "@fortawesome/free-solid-svg-icons";
// declare module "@fortawesome/vue-fontawesome";
// declare module "@fortawesome/fontawesome-svg-core";

declare module "*.json" {
    const value: any;
    export default value;
}

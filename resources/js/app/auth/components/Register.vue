<template>

    <section class="register">

        <div class="is-vertical-center">

            <div class="container has-text-centered">

                <NotificationAlert/>

                <img
                    class="light-logo svg"
                    :src="logo.src"
                    :alt="logo.alt"
                    height="25px"
                />

                <div class="columns is-centered">
                    <div class="column is-12 is-8-desktop">

                        <div class="field">
                            <InputText
                                name="firstname"
                                topCss="field pb-10"
                                divCss="control required required-small"
                                inputCss="input"
                                type="text"
                                :icon="{
                                    name: 'ti-user',
                                    divAlign: 'has-icons-right',
                                    align: ' is-medium is-right',
                                }"
                                placeholder="Your Firstname *"
                                :inputData="
                                    $v.registerForm.firstname.$model
                                "
                                :error="
                                    (returnRegisterError &&
                                        $v.registerForm.firstname
                                            .$invalid) ||
                                    (returnRegisterError &&
                                        $v.registerForm.firstname
                                            .$required)
                                        ? true
                                        : false
                                "
                                :errorMessage="
                                    $v.registerForm.firstname
                                "
                                v-model="
                                    $v.registerForm.firstname.$model
                                "
                            />
                        </div>

                        <div class="field">
                            <InputText
                                name="surname"
                                topCss="field pb-10"
                                divCss="control required required-small"
                                inputCss="input"
                                type="text"
                                :icon="{
                                    name: 'ti-user',
                                    divAlign: 'has-icons-right',
                                    align: ' is-medium is-right',
                                }"
                                placeholder="Your Surname *"
                                :inputData="
                                    $v.registerForm.lastname.$model
                                "
                                :error="
                                    (returnRegisterError &&
                                        $v.registerForm.lastname
                                            .$invalid) ||
                                    (returnRegisterError &&
                                        $v.registerForm.lastname
                                            .$required)
                                        ? true
                                        : false
                                "
                                :errorMessage="
                                    $v.registerForm.lastname
                                "
                                v-model="
                                    $v.registerForm.lastname.$model
                                "
                            />
                        </div>

                        <div class="field">
                            <InputText
                                name="email"
                                topCss="field pb-10"
                                divCss="control required required-small"
                                inputCss="input"
                                type="email"
                                :icon="{
                                    name: 'ti-email',
                                    divAlign: 'has-icons-right',
                                    align: ' is-medium is-right',
                                }"
                                placeholder="Email Address *"
                                :inputData="
                                    $v.registerForm.email.$model
                                "
                                :error="
                                    (returnRegisterError &&
                                        $v.registerForm.email
                                            .$invalid) ||
                                    (returnRegisterError &&
                                        $v.registerForm.email
                                            .$required)
                                        ? true
                                        : false
                                "
                                :errorMessage="
                                    $v.registerForm.email
                                "
                                errorDisplay="That is not a valid email!"
                                v-model="
                                    $v.registerForm.email.$model
                                "
                            />
                        </div>

                        <div class="field">
                            <InputText
                                name="password"
                                topCss="field pb-10"
                                divCss="control required required-small"
                                inputCss="input"
                                type="password"
                                :icon="{
                                    name: 'ti-lock',
                                    divAlign: 'has-icons-right',
                                    align: ' is-medium is-right',
                                }"
                                placeholder="Password *"
                                :inputData="
                                    $v.registerForm.password.$model
                                "
                                :error="
                                    (returnRegisterError &&
                                        $v.registerForm.password
                                            .$invalid) ||
                                    (returnRegisterError &&
                                        $v.registerForm.password
                                            .$required)
                                        ? true
                                        : false
                                "
                                :errorMessage="
                                    $v.registerForm.password
                                "
                                v-model="
                                    $v.registerForm.password.$model
                                "
                            />
                        </div>

                        <div class="field">
                            <InputText
                                name="confirm_password"
                                topCss="field pb-10"
                                divCss="control required required-small"
                                inputCss="input"
                                type="password"
                                :icon="{
                                    name: 'ti-lock',
                                    divAlign: 'has-icons-right',
                                    align: ' is-medium is-right',
                                }"
                                placeholder="Confirm Password *"
                                :inputData="
                                    $v.registerForm.confirmPassword.$model
                                "
                                :error="
                                    (returnRegisterError &&
                                        $v.registerForm.confirmPassword
                                            .$invalid) ||
                                    (returnRegisterError &&
                                        $v.registerForm.confirmPassword
                                            .$required)
                                        ? true
                                        : false
                                "
                                :errorMessage="
                                    $v.registerForm.confirmPassword
                                "
                                v-model="
                                    $v.registerForm.confirmPassword.$model
                                "
                            />
                        </div>

                        <div class="field">
                            <EventButtons
                                :buttons="registerFormBtns"
                                :data="registerForm"
                                :valid="$v.registerForm.$invalid"
                                @processBtn="processRegisterAction"
                            />
                        </div>
                        <p>By signing in you agree with the <a href="#">Terms and Conditions</a> and <a href="#">Privacy
                            Policy</a>.</p>
                        <p class="has-text-centered">
                            <router-link
                                id="signinPage"
                                to="/auth/signin"
                            >
                                <i class="ti-help-alt pr-5"></i>
                                Back to sign in page.
                            </router-link>
                        </p>

                    </div>
                </div>
            </div>

        </div>

    </section>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import Hero from "@templates/application/Hero.vue";
import InputText from "@includes/input/Text.vue";
import EventButtons from "@includes/events/Buttons.vue";
import {Validations} from "vuelidate-property-decorators";
import {email, required, sameAs} from "vuelidate/lib/validators";
import {getModule} from "vuex-module-decorators";
import SystemsModule from "@store/system";
import AlertsModule from "@store/alerts";
import UsersModule from "@store/users";
import ButtonsModule from "@store/button";
import NotificationAlert from "@includes/notifications/Alerts.vue"

let SystemsStore = getModule(SystemsModule);
let AlertsStore = getModule(AlertsModule);
let UsersStore = getModule(UsersModule);
let ButtonsStore = getModule(ButtonsModule);

@Component({
    name: "Signup",
    components: {
        Hero,
        InputText,
        EventButtons,
        NotificationAlert
    }
})
export default class Signup extends Vue {
    // Return error message.
    public returnRegisterError: boolean = false;
    // The register button details
    public registerFormBtns: any = [
        {
            title: 'Register',
            id: "registerBtn",
            css: 'is-primary is-fullwidth',
            size: 'large-button',
            icon: 'ti-control-backward',
            method: {
                name: "submitBtn",
                action: "processForm"
            }
        }
    ]
    // Register form information.
    public registerForm: any = {
        firstname: "",
        lastname: "",
        email: "",
        mobile_number: "",
        password: "",
        confirmPassword: ""
    }
    // Validation for the forms.
    @Validations()
    validations = {
        registerForm: {
            firstname: {required},
            lastname: {required},
            email: {required, email},
            password: {required},
            confirmPassword: {required, sameAsPassword: sameAs("password")}
        }
    };
    // Access for the Validation form.
    $router: any;

    // Mount the component at the start.
    mounted() {
        // Remove any alerts that might be showing.
        AlertsStore.REMOVE_ALERT();
    }

    // Process Action for Submit Button.
    async processRegisterAction(action: string, data: any) {

        // Clear any messages.
        this.returnRegisterError = true;

        if (this.$v.$invalid == false) {
            UsersStore.userRegister(data).then(result => {
                if (result.name) {
                    this.$router.push({
                        name: "signin",
                        params: {success: "You have been register successfully. Please check your emails for further instructions."}
                    });
                }

                ButtonsStore.ACTIVATE_PROCESSING();
                ButtonsStore.ACTIVATE_DISABLE();
            });
        }
        // Notify the users that form has not been validated.
        else {
            this.returnRegisterError = true;
        }
    }

    // Get the site logo.
    get logo() {
        return SystemsStore.getLogo;
    }
}
</script>

<style lang="scss">
.register {
    .is-vertical-center {
        height: 100vh;
        padding: 0;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
    }

    .svg {
        width: 150px;
        height: auto;
        margin-bottom: 15px;
    }
}
</style>

<template>

    <section class="signin">

        <div class="is-vertical-center">

            <div class="container has-text-centered">

                <NotificationAlert/>

                <img
                    class="light-logo svg"
                    :src="logo.src"
                    :alt="logo.alt"
                    height="25px"
                />

                <div class="columns is-centered is-multiline">

                    <div id="signin-form" class="column is-8 is-5-desktop login-form animated preFadeInLeft fadeInLeft">

                        <div class="field">
                            <InputText
                                id="loginEmail"
                                name="email"
                                topCss="field pb-10"
                                divCss="control required required-small"
                                inputCss="input is-large"
                                type="email"
                                :icon="{
                                    name: 'ti-email',
                                    divAlign: 'has-icons-right',
                                    align: ' is-medium is-right',
                                }"
                                placeholder="Email *"
                                :inputData="
                                    $v.loginForm.username.$model
                                "
                                :error="
                                    (returnLoginError &&
                                        $v.loginForm.username
                                            .$invalid) ||
                                    (returnLoginError &&
                                        $v.loginForm.username
                                            .$required)
                                        ? true
                                        : false
                                "
                                :errorMessage="
                                    $v.loginForm.username
                                "
                                errorDisplay="That is not a valid email!"
                                v-model="
                                    $v.loginForm.username.$model
                                "
                            />
                        </div>
                        <div class="field">
                            <InputText
                                id="loginPassword"
                                name="password"
                                topCss="field pb-10"
                                divCss="control required required-small"
                                inputCss="input is-large"
                                type="password"
                                :icon="{
                                    name: 'ti-lock',
                                    divAlign: 'has-icons-right',
                                    align: ' is-medium is-right',
                                }"
                                placeholder="Password *"
                                :inputData="
                                    $v.loginForm.password.$model
                                "
                                :error="
                                    (returnLoginError &&
                                        $v.loginForm.password
                                            .$invalid) ||
                                    (returnLoginError &&
                                        $v.loginForm.password
                                            .$required)
                                        ? true
                                        : false
                                "
                                :errorMessage="
                                    $v.loginForm.password
                                "
                                v-model="
                                    $v.loginForm.password.$model
                                "
                            />
                        </div>
                        <div class="field">
                            <EventButtons
                                :buttons="loginFormBtns"
                                :valid="$v.loginForm.$invalid"
                                :data="loginForm"
                                @processBtn="processLoginAction"
                            />
                        </div>

                    </div>

                    <div id="recover-form"
                         class="column is-8 is-5-desktop login-form animated preFadeInLeft fadeInLeft is-hidden">

                        <div class="field">
                            <InputText
                                name="email_address"
                                topCss="field pb-10"
                                divCss="control required required-small"
                                inputCss="input is-large"
                                type="text"
                                :icon="{
                                name: 'ti-email',
                                divAlign: 'has-icons-right',
                                align: ' is-medium is-right',
                            }"
                                placeholder="Email Address"
                                :inputData="
                                $v.resetForm.email
                                    .$model
                            "
                                :error="
                                (returnResetError &&
                                    $v.resetForm.email
                                        .$invalid) ||
                                (returnResetError &&
                                    $v.resetForm.email
                                        .$required)
                                    ? true
                                    : false
                            "
                                :errorMessage="
                                $v.resetForm.email
                            "
                                v-model="
                                $v.resetForm.email
                                    .$model
                            "
                            />
                        </div>
                        <div class="field">
                            <EventButtons
                                :buttons="resetFormBtns"
                                :data="resetForm"
                                :valid="$v.resetForm.$invalid"
                                @processBtn="processResetAction"
                            />
                        </div>

                    </div>

                    <div id="resend-form"
                         class="column is-8 is-5-desktop login-form animated preFadeInLeft fadeInLeft is-hidden">

                        <div class="field">
                            <InputText
                                name="email_address"
                                topCss="field pb-10"
                                divCss="control required required-small"
                                inputCss="input is-large"
                                type="text"
                                :icon="{
                                    name: 'sl sl-icon-paper-plane',
                                    divAlign: 'has-icons-right',
                                    align: ' is-medium is-right',
                                }"
                                placeholder="Email Address"
                                :inputData="
                                    $v.resendEmailConfirmationForm.email
                                        .$model
                                "
                                :error="
                                    (returnResetError &&
                                        $v.resendEmailConfirmationForm.email
                                            .$invalid) ||
                                    (returnResetError &&
                                        $v.resendEmailConfirmationForm.email
                                            .$required)
                                        ? true
                                        : false
                                "
                                :errorMessage="
                                    $v.resendEmailConfirmationForm.email
                                "
                                v-model="
                                    $v.resendEmailConfirmationForm.email
                                        .$model
                                "
                            />
                        </div>
                        <div class="field">
                            <EventButtons
                                :buttons="resendConfirmationBtns"
                                :data="resendEmailConfirmationForm"
                                :valid="$v.resendEmailConfirmationForm.$invalid"
                                @processBtn="processResendEmailAction"
                            />
                        </div>

                    </div>

                </div>

                <div class="columns is-centered">

                    <!-- Toggles -->
                    <div v-show="resendConfirmation"
                         class="section forgot-password animated preFadeInLeft fadeInLeft">
                        <p class="has-text-centered">
                            <a
                                id="resendConfirmation"
                                @click="closeAlert">
                                Resend Email Confirmation
                            </a>
                        </p>
                    </div>

                    <!-- Toggles -->
                    <div id="recover" class="section forgot-password animated preFadeInLeft fadeInLeft">
                        <p class="has-text-centered">
                            <a
                                id="forgotPassword"
                                @click="closeAlert">
                                Forgot password ?
                            </a>
                        </p>
                        <p class="has-text-centered">
                            <router-link
                                id="registerPage"
                                to="/auth/register"
                            >
                                <i class="ti-help-alt pr-5"></i>
                                Don't have an account?
                            </router-link>
                        </p>
                    </div>

                    <div id="back-to-login"
                         class="section forgot-password animated preFadeInLeft fadeInLeft is-hidden">
                        <p class="has-text-centered">
                            <a
                                id="backSigninPage"
                                @click="closeAlert"
                            >
                                <i class="ti-back-left"></i>
                                Back to Sign in
                            </a>
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
import {email, required} from "vuelidate/lib/validators";
import {getModule} from "vuex-module-decorators";
import SystemsModule from "@store/system";
import AlertsModule from "@store/alerts";
import UsersModule from "@store/users";
import ButtonsModule from "@store/button";
import NotificationAlert from "@includes/notifications/Alerts.vue"
import "jquery";

let SystemsStore = getModule(SystemsModule);
let AlertsStore = getModule(AlertsModule);
let UsersStore = getModule(UsersModule);
let ButtonsStore = getModule(ButtonsModule);

@Component({
    name: "Signin",
    components: {
        Hero,
        InputText,
        EventButtons,
        NotificationAlert
    }
})
export default class Signin extends Vue {
    // Return error message.
    public returnLoginError: boolean = false;
    // Return error message.
    public returnResetError: boolean = false;
    // Activate the reset confirmation if requested.
    public resendConfirmation: boolean = false;
    // Login form button.
    public loginFormBtns: any = [
        {
            title: 'Log In',
            id: "loginBtn",
            css: 'is-primary is-fullwidth',
            size: 'large-button',
            icon: 'ti-control-forward',
            method: {
                name: "submitBtn",
                action: "processForm"
            }
        }
    ]
    // Reset form button.
    public resetFormBtns: any = [
        {
            title: 'Reset Password',
            id: "resetBtn",
            css: 'is-primary is-fullwidth',
            size: 'large-button',
            icon: 'ti-reload',
            method: {
                name: "submitBtn",
                action: "processForm"
            }
        }
    ]
    // Resend confirmation button.
    public resendConfirmationBtns: any = [
        {
            title: 'Resend Confirmation Email',
            id: "resendBtn",
            css: 'is-primary is-fullwidth',
            size: 'large-button',
            icon: 'ti-reload',
            method: {
                name: "submitBtn",
                action: "processForm"
            }
        }
    ]
    // Login form information.
    public loginForm: any = {
        username: "",
        password: ""
    };
    // Reset password form information.
    public resetForm: any = {
        email: ""
    };
    // Resend confirmation information.
    public resendEmailConfirmationForm: any = {
        email: "test"
    };
    // Validation for the forms.
    @Validations()
    validations = {
        loginForm: {
            username: {required, email},
            password: {required}
        },
        resetForm: {
            email: {required, email}
        },
        resendEmailConfirmationForm: {
            email: {required, email}
        }
    };
    // Access for the Validation form.
    $route: any;

    // Mount the component at the start.
    mounted() {

        AlertsStore.REMOVE_ALERT();

        // Recover email component.
        $('#recover').on('click', function () {
            $(this).addClass('is-hidden');
            $('#signin-form').addClass('is-hidden');
            $('#resend-form').addClass('is-hidden');
            $('#back-to-login, #recover-form').removeClass('is-hidden');
        });

        // Recover email component.
        $('#resend').on('click', function () {
            $(this).addClass('is-hidden');
            $('#signin-form').addClass('is-hidden');
            $('#recover, #recover-form').addClass('is-hidden');
            $('#resend-form, #back-to-login').removeClass('is-hidden');
        });

        // Back to login component.
        $('#back-to-login').on('click', function () {
            $(this).addClass('is-hidden');
            $('#recover-form').addClass('is-hidden');
            $('#resend-form').addClass('is-hidden');
            $('#recover, #signin-form').removeClass('is-hidden');
        });

        if (this.$route.params.success) {

            AlertsStore.INSERT_ALERT({
                title: "Success",
                css: "is-success",
                text: this.$route.params.success
            });
        }
    }

    // Close the alert.
    closeAlert() {
        AlertsStore.REMOVE_ALERT();
    }

    // Process the login form.
    async processLoginAction(action: any, data: any) {
        // Clear any previous errors.
        this.returnLoginError = true;

        if (this.$v.loginForm.$invalid == false) {
            await UsersStore.userLogin(data).then(result => {

                if (result.message === 'VERIFY') {
                    this.resendConfirmation = true;
                    this.resendEmailConfirmationForm.email = result.data.username
                }

                if (result.access_token) {
                    this.$router.push({name: "dashboard"});
                }

                ButtonsStore.ACTIVATE_DISABLE();
                ButtonsStore.ACTIVATE_PROCESSING();
            });
        }
        // Notify the users that form has not been validated.
        else {
            this.returnLoginError = true;
        }
    }

    // Process the reset password form.
    async processResetAction(action: any, data: any) {
        // Clear any previous errors.
        this.returnResetError = false;

        if (this.$v.resetForm.$invalid == false) {
            await UsersStore.userForgottenPassword(data).then(result => {

                if (result.status === "EMAIL_SENT") {
                    AlertsStore.INSERT_ALERT({
                        title: "Success",
                        css: "is-success",
                        text: result.message
                    });
                }
                else {
                    AlertsStore.INSERT_ALERT({
                        title: result[0].message,
                        css: "is-danger",
                        text: result[0].debugMessage
                    });
                }
                ButtonsStore.ACTIVATE_DISABLE();
                ButtonsStore.ACTIVATE_PROCESSING();
            });
        }
        // Notify the users that form has not been validated.
        else {
            this.returnResetError = true;
        }
    }

    // Process the reset password form.
    async processResendEmailAction(action: any, data: any) {

        // Clear any previous errors.
        this.returnResetError = false;

        if (this.$v.resendEmailConfirmationForm.$invalid == false) {
            await UsersStore.resendEmailConfirmation(data.email).then(result => {

                AlertsStore.INSERT_ALERT({
                    title: result.title,
                    css: result.css,
                    text: result.message
                });

                ButtonsStore.ACTIVATE_DISABLE();
                ButtonsStore.ACTIVATE_PROCESSING();
            });
        }
        // Notify the users that form has not been validated.
        else {
            this.returnResetError = true;
        }
    }

    // Get the site logo.
    get logo() {
        return SystemsStore.getLogo;
    }
}
</script>

<style lang="scss">
.signin {
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

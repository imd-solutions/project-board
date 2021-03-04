<template>
    <section>
        <div v-if="processing" class="pageloader is-active">
            <span class="title">Loading...</span>
        </div>
        <div v-else class="section">
            <div class="container">
                <div class="columns is-vcentered">
                    <div class="column is-4 is-offset-4">
                        <div id="classic" class="login-form-wrapper mt-20">
                            <div
                                v-if="!showRecover"
                                id="login-form"
                                class="animated preFadeInLeft fadeInLeft"
                            >
                                <div
                                    class="flex-card auth-card is-light-raised light-bordered card-overflow"
                                >
                                    <div
                                        class="auth-card-header header-primary"
                                    >
                                        <h2>Login</h2>
                                    </div>

                                    <div class="field pb-10">
                                        <div class="control has-icons-right">
                                            <InputText
                                                name="email"
                                                placeholder="Your email address"
                                                label="Email Address"
                                                :cssClass="'is-large'"
                                                :inputData="
                                                    $v.loginForm.username.$model
                                                "
                                                :error="
                                                    (returnError &&
                                                        $v.loginForm.username
                                                            .$invalid) ||
                                                    (returnError &&
                                                        $v.loginForm.username
                                                            .$required)
                                                        ? true
                                                        : false
                                                "
                                                :errorMessage="
                                                    $v.loginForm.username
                                                "
                                                v-model="
                                                    $v.loginForm.username.$model
                                                "
                                            />
                                            <span
                                                class="icon is-medium is-right"
                                            >
                                                <i class="sl sl-icon-user"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control has-icons-right">
                                            <InputText
                                                name="password"
                                                placeholder="Your password."
                                                label="Password"
                                                :type="'password'"
                                                :cssClass="'is-large'"
                                                :inputData="
                                                    $v.loginForm.password.$model
                                                "
                                                :error="
                                                    (returnError &&
                                                        $v.loginForm.password
                                                            .$invalid) ||
                                                    (returnError &&
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
                                            <span
                                                class="icon is-medium is-right"
                                            >
                                                <i class="sl sl-icon-lock"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <p class="has-text-left pt-10 pb-10">
                                        <router-link
                                            to="/auth/register"
                                            class="no-account"
                                            >Dont have an account?</router-link
                                        >
                                    </p>
                                    <div class="pt-10 pb-10">
                                        <EventButton
                                            :buttons="submit"
                                            :data="loginForm"
                                            :valid="$v.loginForm.$invalid"
                                            @submitForm="processBtn"
                                        />
                                    </div>
                                </div>
                                <p class="has-text-centered">
                                    <a class="forgot" @click="switchForms"
                                        >Forgot password?</a
                                    >
                                </p>
                            </div>

                            <section v-if="showRecover">
                                <div
                                    id="recover-form"
                                    class="animated preFadeInLeft fadeInLeft"
                                >
                                    <div
                                        class="flex-card auth-card is-light-raised light-bordered card-overflow"
                                    >
                                        <div
                                            class="auth-card-header header-primary"
                                        >
                                            <h3>Recover Password</h3>
                                        </div>
                                        <div class="field pb-10">
                                            <div
                                                class="control has-icons-right"
                                            >
                                                <InputText
                                                    name="email"
                                                    placeholder="Your email address"
                                                    label="Email Address"
                                                    :cssClass="'is-large'"
                                                    :inputData="
                                                        $v.resetForm.email
                                                            .$model
                                                    "
                                                    :error="
                                                        (resetReturnError &&
                                                            $v.resetForm.email
                                                                .$invalid) ||
                                                        (resetReturnError &&
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
                                                <span
                                                    class="icon is-medium is-right"
                                                >
                                                    <i
                                                        class="sl sl-icon-paper-plane"
                                                    ></i>
                                                </span>
                                            </div>
                                        </div>

                                        <p class="has-text-left pt-10 pb-10">
                                            <a
                                                class="no-account"
                                                @click="switchForms"
                                                >Back to login</a
                                            >
                                        </p>

                                        <div class="pt-10 pb-10">
                                            <EventButton
                                                :buttons="reset"
                                                :data="resetForm"
                                                :valid="$v.resetForm.$invalid"
                                                @submitForm="processReset"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import InputSelect from "@includes/input/Select.vue";
import InputText from "@includes/input/Text.vue";
import EventButton from "@includes/events/Buttons.vue";
import { Validations } from "vuelidate-property-decorators";
import { required, email } from "vuelidate/lib/validators";
import { getModule } from "vuex-module-decorators";
import SecureLS from "secure-ls/dist/secure-ls.min.js";

import AlertsModule from "@store/alerts";
import ButtonsModule from "@store/button";
import UsersModule from "@store/users";

const ls = new SecureLS();

let ButtonsStore = getModule(ButtonsModule);
let UsersStore = getModule(UsersModule);
let AlertsStore = getModule(AlertsModule);

@Component({
    name: "SigninPage",
    components: {
        InputSelect,
        InputText,
        EventButton
    }
})
export default class SigninPage extends Vue {
    // Show the processing gif.
    public processing: boolean = true;

    // Show the processing gif.
    public showRecover: boolean = false;

    // Return error message.
    public returnError: boolean = false;
    // Return reset error message.
    public resetReturnError: boolean = false;

    // Submit Button.
    public submit: Array<any> = [
        {
            title: "Sign In",
            css:
                "button-cta btn-align primary-btn is-fullwidth btn-outlined is-bold rounded raised no-lh",
            method: {
                name: "submitBtn",
                action: "processForm"
            }
        }
    ];
    // Reset Button.
    public reset: Array<any> = [
        {
            title: "Reset password",
            css:
                "button-cta btn-align primary-btn is-fullwidth btn-outlined is-bold rounded raised no-lh",
            method: {
                name: "submitBtn",
                action: "processReset"
            }
        }
    ];

    // Login form information.
    public loginForm: any = {
        username: "",
        password: ""
    };

    // Reset form information.
    public resetForm: any = {
        email: ""
    };

    // Validation for the forms.
    @Validations()
    validations = {
        loginForm: {
            username: { required, email },
            password: { required }
        },
        resetForm: {
            email: { required, email }
        }
    };

    $route: any;

    mounted() {
        // Stop the processing.
        this.processing = false;

        AlertsStore.REMOVE_ALERT();

        if (this.$route.params && this.$route.params.success === "yes") {
            AlertsStore.INSERT_ALERT({
                title: "Success",
                css: "is-success",
                text:
                    "You have been registered successfully. Please check your email."
            });
        }
    }
    switchForms() {
        this.showRecover = !this.showRecover;
        this.returnError = false;
        this.resetReturnError = false;
    }

    // Process Action for Submit Button.
    async processBtn(action: string, data: any) {
        if (this.$v.loginForm.$invalid == false) {
            UsersStore.userLogin(data).then(result => {
                if (result.access_token !== null) {
                    this.$router.push({ name: "dashboard" });
                } else {
                    AlertsStore.INSERT_ALERT({
                        title: "Error",
                        css: "is-danger",
                        text: result.replace("Error: GraphQL error: ", "")
                    });
                }

                ButtonsStore.ACTIVATE_DISABLE();
                ButtonsStore.ACTIVATE_PROCESSING();
            });
        }
        // Notify the users that form has not been validated.
        else {
            this.returnError = true;
        }
    }

    // Process Action for Submit Button.
    processReset(action: string, data: any) {
        if (this.$v.resetForm.$invalid == false) {
            UsersStore.userForgottenPassword(data).then(result => {
                console.log(result);

                if (result.status === "EMAIL_NOT_SENT") {
                    AlertsStore.INSERT_ALERT({
                        title: "Warning",
                        css: "is-warning",
                        text:
                            "That email has not be recognised. Please try again."
                    });

                    ButtonsStore.ACTIVATE_DISABLE();
                    ButtonsStore.ACTIVATE_PROCESSING();

                    return;
                }

                AlertsStore.INSERT_ALERT({
                    title: "Success",
                    css: "is-success",
                    text: result.message
                });

                ButtonsStore.ACTIVATE_DISABLE();
                ButtonsStore.ACTIVATE_PROCESSING();
            });
        }
        // Notify the users that form has not been validated.
        else {
            this.resetReturnError = true;
        }
    }
}
</script>
<style lang="scss">
h2,
h3 {
    font-family: monospace;
    color: white;
    font-weight: bold;
}
h2 {
    font-size: 45px;
}
h3 {
    font-size: 30px;
}
.bg_img {
    background: #221f1f73;
    opacity: 0.8;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 10;
}

#recover {
    #recover-form {
        position: absolute;
        z-index: 20;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .fadeInLeft {
        margin-top: -150px;
        margin-left: -215px;
    }
}
</style>

<template>
    <div v-if="processing" class="pageloader is-active">
        <span class="title">Loading...</span>
    </div>
    <div v-else class="container">

        <p class="level-item has-text-centered mt-10 mb-10">
            <img
                :src="logo.src"
                :alt="logo.alt"
            >
        </p>

        <template v-if="result.status === 400">
            <div class="notification column is-half is-offset-one-quarter" :class="result.css">
                <h3 v-text="result.title"></h3>
                <p v-text="result.message"></p>
            </div>
        </template>

        <template v-else>
            <div class="column is-half is-offset-one-quarter">

                <NotificationAlert/>

                <div class="card">

                    <header class="card-header">
                        <p class="card-header-title is-default">
                            Reset Password
                        </p>
                    </header>

                    <div class="card-content">

                        <div class="field">
                            <div class="control">
                                <InputText
                                    label="E-mail Address"
                                    labelCss="col-md-4 col-form-label text-md-right"
                                    name="email"
                                    id="email"
                                    topCss="form-group row"
                                    divCss="col-md-6"
                                    inputCss="form-control"
                                    type="email"
                                    placeholder="Email *"
                                    :inputData="
                                        $v.resetPasswordForm.email.$model
                                    "
                                    :error="
                                        (returnResetPasswordError &&
                                            $v.resetPasswordForm.email
                                                .$invalid) ||
                                        (returnResetPasswordError &&
                                            $v.resetPasswordForm.email
                                                .$required)
                                            ? true
                                            : false
                                    "
                                    :errorMessage="
                                        $v.resetPasswordForm.email
                                    "
                                    errorDisplay="That is not a valid email!"
                                    v-model="
                                        $v.resetPasswordForm.email.$model
                                    "
                                />
                            </div>
                        </div>

                        <div class="field">
                            <div class="control">
                                <InputText
                                    label="Password"
                                    labelCss="col-md-4 col-form-label text-md-right"
                                    name="password"
                                    id="password"
                                    topCss="form-group row"
                                    divCss="col-md-6"
                                    inputCss="form-control"
                                    type="password"
                                    placeholder="Password *"
                                    :inputData="
                                        $v.resetPasswordForm.password.$model
                                    "
                                    :error="
                                        (returnResetPasswordError &&
                                            $v.resetPasswordForm.password
                                                .$invalid) ||
                                        (returnResetPasswordError &&
                                            $v.resetPasswordForm.password
                                                .$required)
                                            ? true
                                            : false
                                    "
                                    :errorMessage="
                                        $v.resetPasswordForm.password
                                    "
                                    v-model="
                                        $v.resetPasswordForm.password.$model
                                    "
                                />
                            </div>
                        </div>

                        <div class="field">
                            <div class="control">
                                <InputText
                                    label="Confirm Password"
                                    labelCss="col-md-4 col-form-label text-md-right"
                                    name="password_confirmation"
                                    id="password_confirmation"
                                    topCss="form-group row"
                                    divCss="col-md-6"
                                    inputCss="form-control"
                                    type="password"
                                    placeholder="Confirm Your Password*"
                                    :inputData="
                                        $v.resetPasswordForm.password_confirmation.$model
                                    "
                                    :error="
                                        (returnResetPasswordError &&
                                            $v.resetPasswordForm.password_confirmation
                                                .$invalid) ||
                                        (returnResetPasswordError &&
                                            $v.resetPasswordForm.password_confirmation
                                                .$required)
                                            ? true
                                            : false
                                    "
                                    :errorMessage="
                                        $v.resetPasswordForm.password_confirmation
                                    "
                                    v-model="
                                        $v.resetPasswordForm.password_confirmation.$model
                                    "
                                />
                            </div>
                        </div>

                        <div class="field">
                            <div class="control">
                                <EventButtons
                                    :buttons="resetPasswordFormBtns"
                                    :valid="$v.resetPasswordForm.$invalid"
                                    :data="resetPasswordForm"
                                    @processBtn="processResetPasswordAction"
                                />
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </template>

    </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import InputText from "@includes/input/Text.vue";
import EventButtons from "@includes/events/Buttons.vue";
import {getModule} from "vuex-module-decorators";
import SystemsModule from "@store/system";
import UsersModule from "@store/users";
import ButtonsModule from "@store/button";
import {Validations} from "vuelidate-property-decorators";
import {email, required, sameAs} from "vuelidate/lib/validators";
import NotificationAlert from "@includes/notifications/Alerts.vue";
import AlertsModule from "@store/alerts";
import VALID_PASSWORD_TOKEN from "@queries/user/auth/validPasswordResetToken.gql";

let SystemsStore = getModule(SystemsModule);
let UsersStore = getModule(UsersModule);
let ButtonsStore = getModule(ButtonsModule);
let AlertsStore = getModule(AlertsModule);

@Component({
    name: "Reset",
    components: {
        InputText,
        EventButtons,
        NotificationAlert
    }
})
export default class Reset extends Vue {

    public processing: boolean = true;
    public result: any = {};

    // Return error message.
    public returnResetPasswordError: boolean = false;

    public token: any = '';
    public email: any = '';

    // Login form button.
    public resetPasswordFormBtns: any = [
        {
            title: 'Reset Password',
            css: 'is-primary is-fullwidth',
            size: 'large-button',
            icon: 'ti-control-forward',
            method: {
                name: "submitBtn",
                action: "processForm"
            }
        }
    ];

    // Reset password form information.
    public resetPasswordForm: any = {
        email: "",
        token: "",
        password: "",
        password_confirmation: "",
    };

    // Validation for the forms.
    @Validations()
    validations = {
        resetPasswordForm: {
            email: {required, email},
            password: {required},
            password_confirmation: {required, sameAsPassword: sameAs("password")}
        }
    };

    $route: any;

    mounted() {

        // Query the database to see if the token is valid.
        this.$apollo.query({
            query: VALID_PASSWORD_TOKEN,
            variables: {
                input: {
                    token: this.$route.params.token,
                    email: this.$route.query.email
                }
            }
        }).then(result => {
            // Stop the processing.
            this.processing = false;
            // Set the results.
            this.result = result.data.validPasswordResetToken;
            // Set the rest form.
            this.resetPasswordForm.token = this.$route.params.token;
            this.resetPasswordForm.email = this.$route.query.email;
        })
    }

    async processResetPasswordAction(action: any, data: any) {

        // Clear any messages.
        this.returnResetPasswordError = true;

        if (this.$v.$invalid == false) {
            await UsersStore.userUpdateForgottenPassword(data).then(result => {

                if (result.status === 'PASSWORD_UPDATED') {

                    this.$router.push({
                        name: "signin",
                        params: {success: result.message + ' Please log in with the new password.'}
                    });
                }

                ButtonsStore.ACTIVATE_PROCESSING();
                ButtonsStore.ACTIVATE_DISABLE();
            });
        }
        // Notify the users that form has not been validated.
        else {
            this.returnResetPasswordError = true;
        }
    }

    // Get the site logo.
    get logo() {
        return SystemsStore.getLogo;
    }

}
</script>

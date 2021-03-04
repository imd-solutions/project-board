<template>
    <div v-if="processing" class="pageloader is-active">
        <span class="title">Loading...</span>
    </div>
    <section v-else class="section">
        <div class="container">
            <div class="columns is-vcentered">
                <div class="column is-4 is-offset-4">
                    <div id="classic" class="login-form-wrapper mt-20">
                        <div
                            id="login-form"
                            class="animated preFadeInLeft fadeInLeft"
                        >
                            <div
                                class="flex-card auth-card is-light-raised light-bordered card-overflow"
                            >
                                <div class="auth-card-header header-primary">
                                    <h2>Register</h2>
                                </div>

                                <div class="field pb-10">
                                    <div class="control has-icons-right">
                                        <InputText
                                            name="first name"
                                            placeholder="Your First Name"
                                            label="Firstname"
                                            :cssClass="'is-large'"
                                            :inputData="
                                                $v.form.firstname.$model
                                            "
                                            :error="
                                                (returnError &&
                                                    $v.form.firstname
                                                        .$invalid) ||
                                                (returnError &&
                                                    $v.form.firstname.$required)
                                                    ? true
                                                    : false
                                            "
                                            :errorMessage="$v.form.firstname"
                                            v-model="$v.form.firstname.$model"
                                        />
                                        <span class="icon is-medium is-right">
                                            <i class="sl sl-icon-user"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="field pb-10">
                                    <div class="control has-icons-right">
                                        <InputText
                                            name="surname"
                                            placeholder="Your Surname"
                                            label="Surname"
                                            :cssClass="'is-large'"
                                            :inputData="$v.form.lastname.$model"
                                            :error="
                                                (returnError &&
                                                    $v.form.lastname
                                                        .$invalid) ||
                                                (returnError &&
                                                    $v.form.lastname.$required)
                                                    ? true
                                                    : false
                                            "
                                            :errorMessage="$v.form.lastname"
                                            v-model="$v.form.lastname.$model"
                                        />
                                        <span class="icon is-medium is-right">
                                            <i class="sl sl-icon-user"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="field pb-10">
                                    <div class="control has-icons-right">
                                        <InputText
                                            name="email"
                                            placeholder="Email Address"
                                            label="Email Address"
                                            :cssClass="'is-large'"
                                            :inputData="$v.form.email.$model"
                                            :error="
                                                (returnError &&
                                                    $v.form.email.$invalid) ||
                                                (returnError &&
                                                    $v.form.email.$error)
                                                    ? true
                                                    : false
                                            "
                                            :errorMessage="{ email: true }"
                                            v-model="$v.form.email.$model"
                                        />
                                        <span class="icon is-medium is-right">
                                            <i
                                                class="sl sl-icon-envelope-open"
                                            ></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="field pb-10">
                                    <div class="control has-icons-right">
                                        <InputText
                                            name="mobile_number"
                                            placeholder="Mobile Number"
                                            label="Mobile Number"
                                            :cssClass="'is-large'"
                                            v-model="form.mobile_number"
                                        />

                                        <span class="icon is-medium is-right">
                                            <i class="sl sl-icon-phone"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="control has-icons-right">
                                        <InputText
                                            name="password"
                                            placeholder="Your password."
                                            label="Password"
                                            :cssClass="'is-large'"
                                            :type="'password'"
                                            :inputData="$v.form.password.$model"
                                            :error="
                                                (returnError &&
                                                    $v.form.password
                                                        .$invalid) ||
                                                (returnError &&
                                                    $v.form.password.$required)
                                                    ? true
                                                    : false
                                            "
                                            :errorMessage="$v.form.password"
                                            v-model="$v.form.password.$model"
                                        />
                                        <span class="icon is-medium is-right">
                                            <i class="sl sl-icon-lock"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="control has-icons-right">
                                        <InputText
                                            name="confirm password"
                                            placeholder="Please Confirm Password"
                                            label="Confirm Password"
                                            :cssClass="'is-large'"
                                            :type="'password'"
                                            :inputData="
                                                $v.form.confirmPassword.$model
                                            "
                                            :error="
                                                (returnError &&
                                                    $v.form.confirmPassword
                                                        .$invalid) ||
                                                (returnError &&
                                                    $v.form.confirmPassword
                                                        .$required)
                                                    ? true
                                                    : false
                                            "
                                            :errorMessage="
                                                $v.form.confirmPassword
                                            "
                                            v-model="
                                                $v.form.confirmPassword.$model
                                            "
                                        />
                                        <span class="icon is-medium is-right">
                                            <i class="sl sl-icon-lock"></i>
                                        </span>
                                    </div>
                                </div>

                                <p class="has-text-left pt-10 pb-10">
                                    <router-link
                                        to="/auth/signin"
                                        class="no-account"
                                    >Already have an account?
                                    </router-link
                                    >
                                </p>
                                <div class="pt-10 pb-10">
                                    <EventButton
                                        :buttons="submitBtn"
                                        :data="form"
                                        :valid="$v.$invalid"
                                        @submitForm="processBtn"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import InputSelect from "@includes/input/Select.vue";
import InputText from "@includes/input/Text.vue";
import EventButton from "@includes/events/Buttons.vue";
import {Validations} from "vuelidate-property-decorators";
import {required, sameAs, email} from "vuelidate/lib/validators";
import {getModule} from "vuex-module-decorators";

import ButtonsModule from "@store/button";
import UsersModule from "@store/users";
import AlertsModule from "@store/alerts";

let ButtonsStore = getModule(ButtonsModule);
let UsersStore = getModule(UsersModule);
let AlertsStore = getModule(AlertsModule);

@Component({
    name: "RegisterPage",
    components: {
        InputSelect,
        InputText,
        EventButton
    }
})
export default class RegisterPage extends Vue {
    // Show the processing gif.
    public processing: boolean = true;

    // Return error message.
    public returnError: boolean = false;

    // Submit Button.
    public submitBtn: Array<any> = [
        {
            title: "Sign Up",
            css:
                "button-cta btn-align primary-btn is-fullwidth btn-outlined is-bold rounded raised no-lh",
            method: {
                name: "submitBtn",
                action: "processForm"
            }
        }
    ];

    // Form information.
    public form: any = {
        firstname: "",
        lastname: "",
        email: "",
        mobile_number: "",
        password: "",
        confirmPassword: ""
    };

    // Validation for the forms.
    @Validations()
    validations = {
        form: {
            firstname: {required},
            lastname: {required},
            email: {required, email},
            password: {required},
            confirmPassword: {required, sameAsPassword: sameAs("password")}
        }
    };

    $router: any;

    mounted() {
        // Stop the processing.
        this.processing = false;

        AlertsStore.REMOVE_ALERT();
    }

    // Process Action for Submit Button.
    processBtn(action: string, data: any) {
        AlertsStore.REMOVE_ALERT();

        if (this.$v.$invalid == false) {
            UsersStore.userRegister(data).then(result => {
                if (result.name) {
                    this.$router.push({
                        name: "signup",
                        params: {success: "yes"}
                    });
                } else {
                    AlertsStore.INSERT_ALERT({
                        title: "Warning",
                        css: "is-warning",
                        text: result[0].extensions.validation["input.email"][0]
                    });
                }

                ButtonsStore.ACTIVATE_PROCESSING();
                ButtonsStore.ACTIVATE_DISABLE();
            });
        }
        // Notify the users that form has not been validated.
        else {
            this.returnError = true;
        }
    }
}
</script>

<template>
    <div v-if="processing" class="pageloader is-active">
        <span class="title">Loading...</span>
    </div>
    <section v-else class="section">
        <div class="container">
            <h1 class="title mb-20">Yourline Signups</h1>
            <div class="clearfix"></div>

            <h2 class="subtitle">
                Hello and welcome to yourline. Please sign in with the form
                below.
            </h2>

            <div class="columns is-multiline">
                <InputText
                    name="firstname"
                    placeholder="First Name"
                    label="First Name"
                    topCss="column is-12"
                    :inputData="$v.form.firstname.$model"
                    :error="
                        (returnError && $v.form.firstname.$invalid) ||
                        (returnError && $v.form.firstname.$required)
                            ? true
                            : false
                    "
                    :errorMessage="$v.form.firstname"
                    v-model="$v.form.firstname.$model"
                />
                <InputText
                    name="lastname"
                    placeholder="Surname"
                    label="Surname"
                    topCss="column is-12"
                    :inputData="$v.form.lastname.$model"
                    :error="
                        (returnError && $v.form.lastname.$invalid) ||
                        (returnError && $v.form.lastname.$required)
                            ? true
                            : false
                    "
                    :errorMessage="$v.form.lastname"
                    v-model="$v.form.lastname.$model"
                />
                <InputText
                    name="email"
                    placeholder="Email Address"
                    label="Email Address"
                    topCss="column is-6"
                    :inputData="$v.form.email.$model"
                    :error="
                        (returnError && $v.form.email.$invalid) ||
                        (returnError && $v.form.email.$error)
                            ? true
                            : false
                    "
                    :errorMessage="{ email: true }"
                    v-model="$v.form.email.$model"
                />
                <InputText
                    name="mobile_number"
                    placeholder="Mobile Number"
                    label="Mobile Number"
                    topCss="column is-6"
                    v-model="form.mobile_number"
                />
                <EventButton
                    :buttons="submitBtn"
                    :data="form"
                    :valid="$v.$invalid"
                    @submitForm="processBtn"
                />
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
import { required, sameAs, email } from "vuelidate/lib/validators";
import { getModule } from "vuex-module-decorators";

import ButtonsModule from "@store/button";

let ButtonsStore = getModule(ButtonsModule);

@Component({
    name: "SiteBody",
    components: {
        InputSelect,
        InputText,
        EventButton
    }
})
export default class SiteBody extends Vue {
    // Show the processing gif.
    public processing: boolean = true;

    // Return error message.
    public returnError: boolean = false;

    // List of titles.
    public titles: Array<any> = [
        { id: 1, name: "Mr" },
        { id: 2, name: "Mrs" },
        { id: 3, name: "Ms" },
        { id: 4, name: "Miss" }
    ];

    // Submit Button.
    public submitBtn: Array<any> = [
        {
            title: "Submit",
            css: "is-success is-pulled-right ma-10",
            method: {
                name: "submitBtn",
                action: "processForm"
            }
        }
    ];

    // Form information.
    public form: any = {
        title: "",
        firstname: "",
        lastname: "",
        email: "",
        mobile_number: ""
    };

    // Validation for the forms.
    @Validations()
    validations = {
        form: {
            firstname: { required },
            lastname: { required },
            email: { required, email }
        }
    };

    mounted() {
        // Stop the processing.
        this.processing = false;
    }

    // Process Action for Submit Button.
    processBtn(action: string, data: any) {
        // Add the additional information to the form data.
        data.company = this.$route.params.company;
        data.client = this.$route.params.client;

        // Set return error to false - Start the validation process.
        this.returnError = false;

        // Process the information if form validation has been passed.
        if (this.$v.$invalid == false) {
        }
        // Notify the users that form has not been validated.
        else {
            this.returnError = true;
        }
    }
}
</script>

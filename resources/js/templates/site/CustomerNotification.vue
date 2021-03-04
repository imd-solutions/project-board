import {email} from "vuelidate/*";import {sameAs} from "vuelidate/*";
<template>
    <section class="section">
        <div class="container">
            <h1 class="title mb-20">404 - Page Not Found.</h1>
            <div class="clearfix"></div>
            <h2 class="subtitle">
                The link you provided seems to be broken. Please try to click on
                the link again.
            </h2>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import InputText from "@includes/input/Text.vue";
import EventButton from "@includes/events/Buttons.vue";
import { Validations } from "vuelidate-property-decorators";
import { required, email } from "vuelidate/lib/validators";
import { getModule } from "vuex-module-decorators";
import SystemsModule from "@store/system";
import ButtonsModule from "@store/button";

let SystemsStore = getModule(SystemsModule);
let ButtonsStore = getModule(ButtonsModule);

@Component({
    name: "CustomerNotification",
    components: {
        InputText,
        EventButton
    }
})
export default class CustomerNotification extends Vue {
    // // Return error message.
    // public returnError: boolean = false;
    //
    // // Submit Button.
    // public submitBtn: Array<any> = [
    //     {
    //         title: "Submit",
    //         css: "is-success is-pulled-right ma-10",
    //         method: {
    //             name: "submitBtn",
    //             action: "processForm"
    //         }
    //     }
    // ];
    //
    // // Form information.
    // public form: any = {
    //     broken_link: this.brokenLink,
    //     name: "",
    //     email: "",
    // };
    //
    // // Validation for the forms.
    // @Validations()
    // validations = {
    //     form: {
    //         name: {required},
    //         email: { required, email},
    //     }
    // };
    //
    // // Process Action for Submit Button.
    // processBtn (action: string, data: any) {
    //
    //     // Set return error to false - Start the validation process.
    //     this.returnError = false;
    //
    //     // Process the information if form validation has been passed.
    //     if (this.$v.$invalid == false) {
    //
    //         SystemsStore.mutationSendBrokenLink(data).then(res => {
    //
    //             // Activate the button.
    //             ButtonsStore.ACTIVATE_DISABLE();
    //             ButtonsStore.ACTIVATE_PROCESSING();
    //
    //
    //             if(res.status === 200) {
    //                 this.$router.push({ name: 'success' });
    //                 return false;
    //             }
    //
    //             this.$router.push({ name: 'error'});
    //         });
    //     }
    //     // Notify the users that form has not been validated.
    //     else {
    //         this.returnError = true;
    //     }
    // }
    //
    // // Get the broken link info.
    // get brokenLink() {
    //     return SystemsStore.getBrokenLink;
    // }
}
</script>

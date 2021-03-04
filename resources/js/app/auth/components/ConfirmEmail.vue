<template>
    <div v-if="processing" class="pageloader is-active">
        <span class="title">Loading...</span>
    </div>
    <div v-else>
        <div class="container">
            <p class="level-item has-text-centered mt-10 mb-10">
                <img
                    :src="logo.src"
                    :alt="logo.alt"
                >
            </p>

            <div class="notification" :class="notification.css">
                <h3 v-text="notification.title"></h3>
                <p v-text="notification.message"></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import CONFIRM_EMAIL from "@mutations/user/confirmEmail.gql";
import {getModule} from "vuex-module-decorators";
import SystemsModule from "@store/system";

let SystemsStore = getModule(SystemsModule);

@Component({
    name: "ConfirmEmail",
})
export default class ConfirmEmail extends Vue {
    public processing: boolean = true;
    public notification: object = {};

    mounted() {
        // Confirm the users email process.
        this.$apollo.mutate({
            mutation: CONFIRM_EMAIL,
            variables: {
                code: this.$route.params.code
            }
        })
            .then(result => {
                // Stop the processing.
                this.processing = false;

                // Update the notification object.
                this.notification = result.data.confirmUserEmail;
            });
    }

    // Get the site logo.
    get logo() {
        return SystemsStore.getLogo;
    }
}
</script>

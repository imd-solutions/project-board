<template>
    <section>
        <SiteHeader :client="clientData" />

        <section class="section">
            <div class="container">
                <h1 class="title mb-20">Success.</h1>
                <div class="clearfix"></div>
                <h2 class="subtitle">
                    Thank you. Your form is being processed. We will be in
                    contact with you soon.
                </h2>
                <p class="mb-15">
                    <a
                        class="button is-link"
                        v-if="clientData.form && clientData.form.redirect_link"
                        :href="clientData.form.redirect_link"
                        >Click Here</a
                    >
                    <a
                        class="button is-primary"
                        v-else
                        :href="clientData.prospect_link"
                        >Go Back</a
                    >
                </p>
            </div>
        </section>

        <SiteFooter
            v-if="
                clientData &&
                    clientData.permalink !== 'dfc' &&
                        clientData.permalink !== 'harlands'
            "
            :client="clientData"
        />
    </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SiteHeader from "@partials/site/Header.vue";
import SiteFooter from "@partials/site/Footer.vue";
import { getModule } from "vuex-module-decorators";
import ClientsModule from "@store/client";

let ClientsStore = getModule(ClientsModule);

@Component({
    name: "Success",
    components: {
        SiteHeader,
        SiteFooter
    }
})
export default class Success extends Vue {
    get clientData() {
        return ClientsStore.getClient;
    }
}
</script>

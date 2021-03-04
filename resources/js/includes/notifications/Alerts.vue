<template>
    <div class="mb-15 column" v-if="alert">
        <div class="columns is-centered">
            <div :class="['notification', alert.css]">
                <button class="delete" @click.prevent="closeAlert"></button>
                <strong v-text="alert.title"></strong>
                <p v-text="alert.text"></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import AlertsModule from "@store/alerts";

let AlertsStore = getModule(AlertsModule);

@Component({
    name: "Alerts"
})
export default class Alerts extends Vue {

    // Close the opened alert message.
    closeAlert() {
        AlertsStore.REMOVE_ALERT();
    }

    // Computed: Alert
    get alert() {
        return AlertsStore.getAlert
    }
}
</script>

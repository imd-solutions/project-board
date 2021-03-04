import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import store from "@mainStore/index";
import { Alert } from "@store/alerts/types";

@Module({
    namespaced: true,
    name: "alerts",
    dynamic: true,
    store
})
export default class AlertsModule extends VuexModule {
    // State: Alert
    alert: Alert | null = null;

    // Mutation: Insert data to the alert state.
    @Mutation
    INSERT_ALERT(data: Alert) {
        this.alert = data;
    }

    // Mutation: Remove the data from the alert state.
    @Mutation
    REMOVE_ALERT() {
        this.alert = null;
    }

    // Getter: get the state data.
    get getAlert() {
        return this.alert;
    }
}

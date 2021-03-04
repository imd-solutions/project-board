import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import store from "@mainStore/index";

@Module({
    namespaced: true,
    name: "buttons",
    dynamic: true,
    store
})
export default class ButtonsModule extends VuexModule {
    // State: Processing
    loading: boolean = false;
    // State: Disable
    disable: boolean = false;

    // Mutation: Change the current processing state to opposite.
    @Mutation
    ACTIVATE_PROCESSING() {
        this.loading = !this.loading;
    }

    // Mutation: Change the current disable state to opposite.
    @Mutation
    ACTIVATE_DISABLE() {
        this.disable = !this.disable;
    }

    // Getter: get the state data.
    get getLoading() {
        return this.loading;
    }

    // Getter: get the state data.
    get getDisable() {
        return this.disable;
    }
}

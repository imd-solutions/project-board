import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "@mainStore/index";
import * as apollo from "@store/application/graphql";
import { Application } from "@store/application/types";

@Module({
    namespaced: true,
    name: "application",
    dynamic: true,
    store
})
export default class ApplicationsModule extends VuexModule {
    // State: Processing
    application: Application = null;

    // Mutation: Get the application detail.
    @Mutation
    GET_APPLICATION(data: Application) {
        this.application = data;
    }

    // Action: query the database for the application info.
    @Action
    async queryApplication(): Promise<any> {
        const response = await apollo.application();
        this.GET_APPLICATION(response);
        return response;
    }

    // Getter: get the application data.
    get getApplication() {
        return this.application;
    }
}

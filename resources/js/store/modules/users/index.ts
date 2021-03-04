import {Module, VuexModule, Mutation, Action, getModule} from "vuex-module-decorators";
import store from "@mainStore/index";
import AlertsModule from "@store/alerts";
import {Auth, User, UserSubmit} from "@store/users/types";
import * as apollo from "@store/users/graphql";
import SecureLS from "secure-ls/dist/secure-ls.min.js";

let AlertsStore = getModule(AlertsModule);
const ls = new SecureLS();

@Module({
    namespaced: true,
    name: "user",
    dynamic: true,
    store
})
export default class UsersModule extends VuexModule {
    // State
    auth: Auth | null = null;
    user: User | null = null;
    userLoginBtn: boolean = false;

    // Mutation: Get the users detail and set the users login btn state to false.
    @Mutation
    GET_USER_AUTH(data: Auth) {
        this.auth = data;
        this.userLoginBtn = false;
    }

    // Mutation: Get the users detail and set the users login btn state to false.
    @Mutation
    GET_USER(data: User) {
        this.user = data;
        this.userLoginBtn = false;
    }

    // Mutation:  Set the mutation state to true.
    @Mutation
    SET_LOGIN_BTN() {
        this.userLoginBtn = true;
    }

    // Mutation: Remove the users state, the local storage data and set the users login btn to true.
    @Mutation
    REMOVE_USER() {
        ls.removeAll();
        this.user = null;
        this.userLoginBtn = true;
    }

    // Action: Get user from the access token.
    @Action
    async me(): Promise<any> {
        const response = await apollo.me();

        this.GET_USER(response);

        return response;
    }

    // Action: Log users into the site.
    @Action
    async userLogin(input: UserSubmit): Promise<any> {
        const response = await apollo.userLogin(input);

        console.log("Response", response)

        // If there is an error.
        if (response.error) {
            AlertsStore.INSERT_ALERT({
                title: "Error",
                css: "is-danger",
                text: response.error
            });
            return {
                message: 'INVALID'
            };
        }

        // If user has not confirmed their email.
        if (response.user.email_verified_at === null) {
            AlertsStore.INSERT_ALERT({
                title: "Warning",
                css: "is-warning",
                text: 'You have not verified your email. Please click on the "Resend Email Confirmation" link below.'
            });
            return {
                message: 'VERIFY',
                data: input
            };
        }

        let userData = {
            name: response.user.name,
            email: response.user.email,
            avatar: response.user.avatar,
            authorised: true,
            access_token: response.access_token
        };

        ls.set("user", JSON.stringify(userData));

        this.GET_USER(response.user);

        return response;
    }

    // Action: Register the user to the site.
    @Action
    async userRegister(input: UserSubmit): Promise<any> {
        const response = await apollo.userRegister(input);

        if (response[0] && response[0].extensions.validation['input.email']) {
            AlertsStore.INSERT_ALERT({
                title: "Warning",
                css: "is-warning",
                text: String(response[0].extensions.validation['input.email'])
            });
            return [];
        }

        this.GET_USER(response);

        return response;
    }

    // Action: User request for password reset.
    @Action
    async userForgottenPassword(input: UserSubmit): Promise<any> {
        const response = await apollo.userForgottenPassword(input);

        // If there is an error.
        if (response.status === 'EMAIL_NOT_SENT') {
            AlertsStore.INSERT_ALERT({
                title: "Warning",
                css: "is-warning",
                text: 'That email has not be recognised. Please try again.'
            });
            return [];
        }

        return response;
    }

    // Action: Update user password.
    @Action
    async userUpdateForgottenPassword(input: UserSubmit): Promise<any> {
        const response = await apollo.userUpdateForgottenPassword(input);


        if (response[0] && response[0].extensions.validation['input.password']) {
            // Set a message variable.
            let message = String(response[0].extensions.validation['input.password']);

            // Send the alert message.
            AlertsStore.INSERT_ALERT({
                title: "Warning",
                css: "is-warning",
                text: message.replace('input.password', 'password')
            });
            return [];
        }

        let responsMessage = '';

        if (response.message === 'passwords.user') {
            responsMessage = 'That email has not be recognised. Please try again.'
        } else {
            responsMessage = response.message
        }

        // If there is an error.
        if (response.status === 'PASSWORD_NOT_UPDATED') {
            AlertsStore.INSERT_ALERT({
                title: "Warning",
                css: "is-warning",
                text: responsMessage
            });
            return [];
        }

        return response;
    }

    // Action: Update user password.
    @Action
    async resendEmailConfirmation(email: String): Promise<any> {
        const response = await apollo.resendEmailConfirmation(email);

        console.log("Res", response);
        // if (response[0] && response[0].extensions.validation['input.password']) {
        //     // Set a message variable.
        //     let message = String(response[0].extensions.validation['input.password']);
        //
        //     // Send the alert message.
        //     AlertsStore.INSERT_ALERT({
        //         title: "Warning",
        //         css: "is-warning",
        //         text: message.replace('input.password', 'password')
        //     });
        //     return [];
        // }
        //
        // let responsMessage = '';
        //
        // if (response.message === 'passwords.user') {
        //     responsMessage = 'That email has not be recognised. Please try again.'
        // } else {
        //     responsMessage = response.message
        // }
        //
        // // If there is an error.
        // if (response.status === 'PASSWORD_NOT_UPDATED') {
        //     AlertsStore.INSERT_ALERT({
        //         title: "Warning",
        //         css: "is-warning",
        //         text: responsMessage
        //     });
        //     return [];
        // }

        return response;
    }

    // Getters:  Get the users state data
    get getUser() {
        return this.user;
    }

    // Getters:  Get the users login state data
    get getLoginBtn() {
        return this.userLoginBtn;
    }
}

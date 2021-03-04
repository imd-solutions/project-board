import apollo from "@plugins/apollo";
import ME from "@queries/user/me.gql";
import USER_LOGIN from "@mutations/user/login.gql";
import USER_REGISTER from "@mutations/user/register.gql";
import USER_FORGOTTEN_PASSWORD from "@mutations/user/forgottenPassword.gql";
import USER_UPDATE_PASSWORD from "@mutations/user/updateForgottenPassword.gql";
import RESEND_EMAIL_CONFIRMATION from "@mutations/user/resendEmailConfirmation.gql";
import {Auth, Message, User, UserSubmit} from "@store/users/types";

// GraphQL mutation to log the users in.
export async function me(): Promise<User> {
    try {
        const response = await apollo.defaultClient.mutate({
            mutation: ME
        });

        return response.data.me as User;
    } catch (e) {
        return e.toString();
    }
}

// GraphQL mutation to log the users in.
export async function userLogin(data: UserSubmit): Promise<any> {
    try {
        const response = await apollo.defaultClient.mutate({
            mutation: USER_LOGIN,
            variables: {
                input: {
                    ...data
                }
            }
        });

        return response.data.login as Auth;
    } catch (e) {
        // Break up the return error.
        const {graphQLErrors} = e;

        // Send the error message back.
        return {
            error: graphQLErrors[0].message
        };
    }
}

// GraphQL mutation to log the users in.
export async function userRegister(data: UserSubmit): Promise<User> {
    try {
        const response = await apollo.defaultClient.mutate({
            mutation: USER_REGISTER,
            variables: {
                input: {
                    ...data
                }
            }
        });

        return response.data.userCreate as User;
    } catch (e) {
        const {graphQLErrors} = e;

        return graphQLErrors;
    }
}

// GraphQL mutation to resend email confirmation.
export async function resendEmailConfirmation(email: String): Promise<Message> {
    try {
        const response = await apollo.defaultClient.mutate({
            mutation: RESEND_EMAIL_CONFIRMATION,
            variables: {
                email: email
            }
        });

        return response.data.resendConfirmationEmail as Message;
    } catch (e) {
        const {graphQLErrors} = e;

        return graphQLErrors;
    }
}

// GraphQL mutation to send user reset password link.
export async function userForgottenPassword(
    data: UserSubmit
): Promise<Message> {
    try {
        const response = await apollo.defaultClient.mutate({
            mutation: USER_FORGOTTEN_PASSWORD,
            variables: {
                input: {
                    ...data
                }
            }
        });

        return response.data.forgotPassword as Message;
    } catch (e) {
        const {graphQLErrors} = e;

        return graphQLErrors;
    }
}

// GraphQL mutation to send user reset password link.
export async function userUpdateForgottenPassword(
    data: UserSubmit
): Promise<Message> {
    try {
        const response = await apollo.defaultClient.mutate({
            mutation: USER_UPDATE_PASSWORD,
            variables: {
                input: {
                    ...data
                }
            }
        });

        return response.data.updateForgottenPassword as Message;
    } catch (e) {
        const {graphQLErrors} = e;

        return graphQLErrors;
    }
}

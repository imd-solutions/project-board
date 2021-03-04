import apollo from "@plugins/apollo";
import GET_APPLICATION from "@queries/application.gql";
import { Application } from "@store/application/types";

// GraphQL query to get section details.
export async function application(): Promise<any> {
    try {
        const response = await apollo.defaultClient.query({
            query: GET_APPLICATION
        });

        return response.data.application as Application;
    } catch (error) {
        // Break up the return error.
        const { graphQLErrors } = error;

        // Send the error message back.
        return {
            error: graphQLErrors[0].message
        };
    }
}

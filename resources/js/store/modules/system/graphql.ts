import apollo from "@plugins/apollo";

// GraphQL mutation to send broken link with customer info to admin.
export async function sendBrokenLink(input: any): Promise<any> {
    try {

    } catch (error) {
        // Break up the return error.
        const {graphQLErrors} = error;

        // Send the error message back.
        return {
            error: graphQLErrors[0].message
        };
    }
}

import Vue from "vue";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import VueApollo from "vue-apollo";
import { fetch } from "apollo-env";
import SecureLS from "secure-ls/dist/secure-ls.min.js";

// Use VueApollo
Vue.use(VueApollo);

const ls = new SecureLS();

const httpLink = new HttpLink({
    // ToDo: use the process env variable.
    // uri: process.env.VUE_APP_GRAPHQL_ENDPOINT
    uri: "http://dev.yourline.com/graphql"
});

// Create the apollo client
export const apolloClient = new ApolloClient({
    link: ApolloLink.from([
        createUploadLink({
            ...httpLink,
            fetch(uri: string, opts: any) {
                // enforce our JSON headers
                delete opts.headers["accept"];
                delete opts.headers["content-type"];

                let user: any = ls.get("user")
                    ? JSON.parse(ls.get("user"))
                    : [];

                // set our auth headers for GraphQL
                opts.headers["Accept"] = opts.headers["Content-Type"] =
                    "application/json";
                opts.headers["Authorization"] = `Bearer ` + user.access_token;
                //opts.headerntId'] = store.geters['client/id'];

                // return our fetch
                return fetch(uri, opts);
            }
        })
    ]),
    cache: new InMemoryCache(),
    connectToDevTools: true
});

// Create the apollo client
export const apolloUploadClient = new ApolloClient({
    link: ApolloLink.from([
        createUploadLink({
            ...httpLink,
            fetch(uri: string, opts: any) {
                // enforce our JSON headers
                delete opts.headers["accept"];
                delete opts.headers["content-type"];

                let user: any = ls.get("user")
                    ? JSON.parse(ls.get("user"))
                    : [];

                // set our auth headers for GraphQL
                opts.headers["Accept"] = [
                    "application/json",
                    "text/plain",
                    "*/*"
                ];
                opts.headers["Authorization"] = `Bearer ` + user.access_token;

                // return our fetch
                return fetch(uri, opts);
            }
        })
    ]),
    cache: new InMemoryCache(),
    connectToDevTools: true
});

const apolloProvider = new VueApollo({
    clients: {
        apolloClient,
        apolloUploadClient
    },
    defaultClient: apolloClient
});

export default apolloProvider;

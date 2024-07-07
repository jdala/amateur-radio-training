import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
    pathPrefix: `/amateur-radio-training`,
    siteMetadata: {
        title: `amateur-radio-training`,
        siteUrl: `https://jdala.github.io/amateur-radio-training`,
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    plugins: [],
};

export default config;

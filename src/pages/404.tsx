import React from "react";
import { Link, HeadFC, PageProps } from "gatsby";

import Layout, { MyHead } from "../components/Layout";

const NotFoundPage: React.FC<PageProps> = () => {
    return (
        <Layout mainStyle={{ color: "var(--text-light)", maxWidth: 800, margin: "30px auto 10px" }}>
            <h1 style={{ marginBottom: 10 }}>
                Oops that's wrong!
            </h1>
            <Link to="/">Go somewhere safe</Link>
        </Layout>
    );
};

export default NotFoundPage;

export const Head: HeadFC = () => <MyHead page="/404" title="Oops" noIndex={true} />;

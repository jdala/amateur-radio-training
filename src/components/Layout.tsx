import React, { FC, CSSProperties, ReactNode } from "react";

import "../styles.css";

type MyHeadProps = {
    page: string;
    title: string;
    // description: string;
    titleSfx?: boolean;
    noIndex?: boolean;
};
export const MyHead: FC<MyHeadProps> = ({ page, title, /* description, */ noIndex }) => {
    const baseUrl = "";
    const _title = title + " | Ραδιοερασιτεχνία";

    return <>
        <html lang="el" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>{_title}</title>
        <link rel="canonical" href={`${baseUrl}${page}`} />
        {/* <meta name="description" content={description} /> */}

        <link rel="icon" href="/images/favicon.ico" sizes="any" /> {/* <!-- 32×32 --> */}
        <link rel="icon" href="/images/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" /> {/*<!-- 180×180 -->*/}

        {noIndex && <meta name="robots" content="noindex" />}

        <meta property="og:title" content={_title} />
        {/* <meta property="og:description" content={description} /> */}
        {/* <meta property="og:image" content={`${baseUrl}/images/og_image_IMG_3289.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" /> */}
        <meta property="og:url" content={`${baseUrl}${page}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="el_GR" />
    </>;
}

type LayoutProps = {
    mainClassName?: string;
    mainStyle?: CSSProperties;
    children: ReactNode;
};
const Layout: FC<LayoutProps> = ({
    mainClassName,
    mainStyle,
    children,
}) => {
    return (
        <main className={mainClassName} style={mainStyle}>
            {children}
        </main>
    );
};

export default React.memo(Layout);

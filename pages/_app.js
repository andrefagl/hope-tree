import "../css/tailwind.css";
import "../css/base.css";
import "../css/nprogress.css";
import styles from "../css/page.module.css";
import Nav from "../components/Nav";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/pro-light-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import cx from "classnames";
import { useRouter } from "next/router";
import { isFullScreenPage } from "../utils";

config.autoAddCss = false;
library.add(faUser);

export default function App({ Component, pageProps }) {
    const { pathname } = useRouter();

    return (
        <>
            <Nav />
            <div
                className={cx(styles.wrapper, {
                    [styles.isFullScreen]: isFullScreenPage(pathname)
                })}
            >
                <Component {...pageProps} />
            </div>
        </>
    );
}

import styles from "./Nav.module.css";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isFullScreenPage } from "../../utils";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Nav = () => {
    const { pathname } = useRouter();

    return (
        <nav
            className={cx(
                styles.nav,
                { [styles.isFullScreen]: isFullScreenPage(pathname) },
                "flex w-full bg-white h-12 fixed top-0 pl-4 pr-4 items-center"
            )}
        >
            <div className={cx(styles.account, "w-1/3")}>
                <Link href="/signin">
                    <a className={styles.signin}>
                        <FontAwesomeIcon icon={["fal", "user"]} size="lg" />
                    </a>
                </Link>
            </div>
            <div
                className={cx(styles.logoWrapper, "w-1/3 flex justify-center")}
            >
                <Link href="/">
                    <a
                        className={cx(styles.logo, "block")}
                        aria-label="COVID tree logo"
                    ></a>
                </Link>
            </div>
            <div className={cx(styles.menu, "w-1/3")}></div>
        </nav>
    );
};

export default Nav;

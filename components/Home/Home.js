import styles from "./Home.module.css";

const Home = ({ children }) => (
    <main className={styles.main}>
        <div className={styles.bg}></div>
        {children}
    </main>
);

export default Home;

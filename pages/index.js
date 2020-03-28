import Link from "next/link";
import Home from "../components/Home";

const AppHome = () => {
    return (
        <Home>
            <div>
                <Link href="add-contact">
                    <a>Add contact</a>
                </Link>
            </div>
        </Home>
    );
};

export default AppHome;

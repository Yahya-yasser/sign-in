import { Link } from "react-router-dom";

const TopBar = () => {
    return (
        <div>
            <h1>Store</h1>
            <Link to="/">
                Go To Web Site
            </Link>
        </div>
    );
};

export default TopBar;
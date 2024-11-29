import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div>
            <Link to="/dashboard/users">Users</Link>
        </div>
    );
};

export default SideBar;
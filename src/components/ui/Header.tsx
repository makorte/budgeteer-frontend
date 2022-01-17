import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div>
            <Link to={"/dashboard"}><b>Budgeteer</b></Link>
            <Link to={"/selectProject"}>Switch Project</Link>
            <Link to={"/logout"}>Sign Out</Link>
        </div>
    )
}

export default Header
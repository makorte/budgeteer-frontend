import {Link} from "react-router-dom";

const HeaderComponent = () => {
    return (
        <div>
            <Link to={"/dashboard"}><b>Budgeteer</b></Link>
            <Link to={"/selectProject"}>Switch Project</Link>
            <Link to={"/login"}>Sign Out</Link>
        </div>
    )
}

export default HeaderComponent
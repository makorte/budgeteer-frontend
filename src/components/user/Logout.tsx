import React, {useEffect} from "react";

const Logout = () => {
    useEffect(() => localStorage.removeItem("token"), [])

    return (
        <div className={"Logout"}>
            <p>Du wurdest ausgeloggt</p>
        </div>
    )
}

export default Logout
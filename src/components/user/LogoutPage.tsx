import React, {useEffect} from "react";

const LogoutPage = () => {
    useEffect(() => localStorage.removeItem("token"), [])

    return (
        <div>
            <p>Du wurdest ausgeloggt</p>
        </div>
    )
}

export default LogoutPage
import HeaderComponent from "./HeaderComponent";

const ErrorPage = () => {
    return (
        <div className={"text-center"}>
            <HeaderComponent/>
            <p className={"mx-2 my-5 fs-3"}>Error! Page not found.</p>
        </div>
    )
}

export default ErrorPage